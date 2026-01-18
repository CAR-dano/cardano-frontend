# syntax=docker.io/docker/dockerfile:1

# Stage 1: Base image with Node.js
# Using a specific version of alpine for reproducibility.
FROM node:24-alpine AS base

# Accept build arguments
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_PDF_URL

# Set as environment variables to be available during build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_PDF_URL=$NEXT_PUBLIC_PDF_URL

# Stage 2: Install dependencies
# This stage is dedicated to installing dependencies to leverage Docker layer caching.
# It only runs when package.json or the lock file changes.
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manager files and install dependencies.
# This logic automatically detects the package manager.
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Use BuildKit cache mount to dramatically speed up npm ci
# This persists npm cache across builds, reducing installation from 24min to 2-3min
RUN --mount=type=cache,target=/root/.npm \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --prefer-offline --no-audit; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Build the application
# This stage builds the Next.js application. It's a separate stage so that
# the build is re-run only when source files change, not on every dependency change.
FROM base AS builder

# Re-declare build args in this stage (required for multi-stage builds)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_PDF_URL

# Set as environment variables for Next.js build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_PDF_URL=$NEXT_PUBLIC_PDF_URL

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Copy package.json first for better layer caching
COPY package.json package-lock.json* ./

# Then copy source files (changes most frequently)
COPY . .

# Disable Next.js telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

# Important: Don't set NODE_ENV=production during build
# Let Next.js handle the build environment automatically
# ENV NODE_ENV=production <-- REMOVED

# Build the application using the detected package manager.
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 4: Production runner
# This is the final, ultra-lightweight image.
# It only contains the necessary artifacts to run the application.
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable Next.js telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user and group for security.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the public assets.
COPY --from=builder /app/public ./public

# Copy the standalone Next.js server output and static assets.
# Ensure the 'nextjs' user owns these files for security.
# This is optimized for `output: 'standalone'` in next.config.js.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user.
USER nextjs

# Expose the port the app will run on.
EXPOSE 3000

# Set default port and hostname. These can be overridden at runtime.
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application.
# The server.js file is created by the Next.js build in standalone mode.
CMD ["node", "server.js"]