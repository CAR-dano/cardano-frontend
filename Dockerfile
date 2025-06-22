# syntax=docker.io/docker/dockerfile:1

# Stage 1: Base image with Node.js
# Using a specific version of alpine for reproducibility.
FROM node:24-alpine AS base

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
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage 3: Build the application
# This stage builds the Next.js application. It's a separate stage so that
# the build is re-run only when source files change, not on every dependency change.
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED=1

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