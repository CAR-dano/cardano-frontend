# Security Hardening Guide for Cardano Frontend

This document outlines the security measures implemented in this project and recommendations for production deployment.

## 🔒 Security Measures Implemented

### 1. Security Headers (via `middleware.ts`)

The following security headers are automatically applied to all responses:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevents clickjacking attacks |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `X-XSS-Protection` | `1; mode=block` | XSS protection for older browsers |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | Camera, mic, geolocation disabled | Restricts browser features |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Forces HTTPS |
| `Content-Security-Policy` | Strict CSP | Prevents XSS and injection attacks |
| `Cross-Origin-*` | Various policies | Additional isolation |

### 2. Next.js Configuration Hardening (`next.config.ts`)

- ✅ Disabled `x-powered-by` header
- ✅ Enabled React Strict Mode
- ✅ Disabled production source maps
- ✅ Configured secure image optimization
- ✅ Applied security headers via Next.js config
- ✅ Limited server action body size

### 3. API Client Security (`apiClient.ts`)

- ✅ Request timeout (30 seconds)
- ✅ Token format validation
- ✅ Automatic retry with exponential backoff
- ✅ Rate limit handling (429 responses)
- ✅ Network error resilience

### 4. Build Security

- ✅ Nixpacks configuration for secure builds
- ✅ Comprehensive `.dockerignore` to prevent sensitive file inclusion
- ✅ Telemetry disabled
- ✅ Source maps disabled in production

## 🚀 Coolify Deployment Recommendations

### Environment Variables

Set these in Coolify's environment variables section:

```bash
# Required
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_PDF_URL=https://your-api-domain.com

# Recommended
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Coolify Settings

1. **Build Settings:**
   - Build Pack: Nixpacks
   - Build Command: `npm run build`
   - Start Command: `node .next/standalone/server.js`

2. **Resource Limits:**
   - Set memory limits (recommended: 512MB - 1GB)
   - Set CPU limits if needed

3. **Network Settings:**
   - Enable HTTPS only
   - Use Coolify's built-in SSL/TLS (Let's Encrypt)
   - Set proper domain/subdomain

4. **Health Checks:**
   - Enable health checks
   - Path: `/`
   - Interval: 30 seconds

## 🛡️ Additional Security Recommendations

### 1. Server-Side Security (Coolify/VM)

```bash
# Keep system updated
sudo apt update && sudo apt upgrade -y

# Configure firewall (UFW)
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable

# Install fail2ban for brute-force protection
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Disable root login via SSH
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sudo systemctl restart sshd
```

### 2. Docker Security (if using Docker directly)

```bash
# Run containers as non-root
# The Dockerfile already uses a non-root user

# Limit container resources
docker run --memory="512m" --cpus="0.5" your-image

# Use read-only filesystem where possible
docker run --read-only your-image
```

### 3. Monitoring & Alerting

Consider implementing:
- **Uptime monitoring:** UptimeRobot, Pingdom, or Coolify's built-in monitoring
- **Error tracking:** Sentry (add SENTRY_DSN to env vars)
- **Log aggregation:** Coolify provides logs, but consider centralized logging

### 4. Regular Maintenance

- [ ] Run `npm audit` weekly
- [ ] Update dependencies monthly
- [ ] Review and rotate API keys/secrets quarterly
- [ ] Check for CVEs in your stack regularly
- [ ] Back up environment configurations

## ⚠️ Known Security Considerations

### 1. `dangerouslySetInnerHTML` Usage

The project uses `dangerouslySetInnerHTML` in:
- `src/app/cek-validitas/page.tsx` (line 736) - CSS styles injection
- `src/components/ui/chart.tsx` (line 81) - Chart styling

**Mitigation:** These are used for CSS injection only with controlled content. No user input is directly rendered.

### 2. LocalStorage for Tokens

The application stores JWT tokens in localStorage.

**Considerations:**
- Tokens are validated before use
- Tokens are cleared on 401 responses
- Consider implementing token refresh rotation

### 3. HTTP Image Sources

Some remote patterns allow HTTP:
- `http://31.220.81.182`
- `http://69.62.80.7`

**Recommendation:** Migrate these to HTTPS when possible.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables configured in Coolify
- [ ] HTTPS enabled and forced
- [ ] Domain properly configured
- [ ] Health checks enabled
- [ ] Resource limits set
- [ ] Firewall rules configured on VM
- [ ] fail2ban or similar installed
- [ ] SSH hardened (key-based auth, no root login)
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Error tracking configured

## 🔄 Incident Response

If you suspect a security breach:

1. **Immediate Actions:**
   - Rotate all API keys and secrets
   - Force logout all users (invalidate tokens)
   - Check Coolify/Docker logs for suspicious activity
   - Review access logs

2. **Investigation:**
   - Check for unauthorized deployments
   - Review environment variable changes
   - Audit user access

3. **Recovery:**
   - Deploy from known-good commit
   - Update all credentials
   - Patch any identified vulnerabilities

## 📞 Security Contact

For security-related issues, please contact the development team immediately.
