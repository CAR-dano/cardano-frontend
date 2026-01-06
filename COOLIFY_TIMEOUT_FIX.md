# Coolify Deployment Timeout Fix

## Problem

Deployment ke Coolify gagal dengan timeout setelah **~1 jam**:

```
Deployment failed: App\Jobs\ApplicationDeploymentJob has timed out.
```

### Breakdown Waktu Build:

| Stage | Duration | Status |
|-------|----------|---------|
| npm ci (dependency install) | **24 menit** | ❌ Terlalu lama |
| Copy node_modules | **6.4 menit** | ❌ Terlalu lama |
| Copy source | 23 detik | ✅ OK |
| Next.js build | **20+ menit** | ❌ Timeout sebelum selesai |
| **Total** | **>50 menit** | **Job timeout** |

## Root Cause

1. **npm ci sangat lambat** (24 menit) - download 998MB dependencies setiap build
2. **Tidak ada cache persistence** - setiap deployment install ulang dari 0
3. **Coolify job timeout** ~1 jam - tidak cukup untuk complete build

## Solution Implemented

### 1. ✅ BuildKit Cache Mount

Updated `Dockerfile` dengan cache mount untuk npm:

```dockerfile
# Before (24 minutes):
RUN npm ci

# After (2-3 minutes with warm cache):
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit
```

**Impact**: Reduce dependency install dari **24 menit → 2-3 menit**

### 2. ✅ Better Layer Caching

Reordered COPY commands:

```dockerfile
# Copy node_modules first (dari deps stage)
COPY --from=deps /app/node_modules ./node_modules

# Copy package.json (jarang berubah)
COPY package.json package-lock.json* ./

# Copy source code (sering berubah)
COPY . .
```

**Impact**: Jika hanya source code berubah, tidak perlu rebuild dependencies

### 3. ✅ npm ci Optimizations

Added flags:
- `--prefer-offline`: Use cache jika available
- `--no-audit`: Skip security audit (save ~30s-1min)

## Expected Results

### Before Optimization:
```
npm ci:          24 minutes
Copy modules:    6.4 minutes  
Build:           20+ minutes (timeout)
Total:           >50 minutes ❌ TIMEOUT
```

### After Optimization (First Build - Cold Cache):
```
npm ci:          20-24 minutes (sama, first time)
Copy modules:    6 minutes
Build:           15-20 minutes
Total:           ~45 minutes ⚠️ Might still timeout
```

### After Optimization (Subsequent Builds - Warm Cache):
```
npm ci:          2-3 minutes ✅ (cached!)
Copy modules:    6 minutes
Build:           15-20 minutes  
Total:           25-30 minutes ✅ SUCCESS
```

## Deployment Instructions

### 1. Commit Changes

```bash
cd /home/maul/Kerjaan/CAR-dano/app/cardano-frontend

git add Dockerfile
git commit -m "perf: optimize Docker build with BuildKit cache mounts to fix timeout"
git push origin feature/backblaze-integration
```

### 2. Enable BuildKit di Coolify

Di Coolify dashboard:
- Go to application settings
- Look for "Build Pack" or "Docker" settings
- **Ensure BuildKit is enabled** (biasanya sudah enabled by default di Coolify v4+)

### 3. First Deployment (Will Be Slow)

```
⚠️ First deployment setelah optimization masih akan lama (~45min)
   karena cache belum terisi.
   
   Jika timeout lagi, ada 2 options:
   
   Option A: Increase Coolify timeout
   - Contact Coolify admin untuk increase job timeout
   - Atau deploy via manual Docker build + push to registry
   
   Option B: Deploy manually first time
   - Build locally dengan BuildKit
   - Push to DockerHub
   - Coolify pull image (instant)
```

### 4. Subsequent Deployments (Fast!)

```
✅ Deployment ke-2 dan seterusnya akan JAUH lebih cepat
   (~25-30 menit) karena npm cache sudah terisi.
```

## Alternative: Manual First Build

Jika Coolify terus timeout, build manually dan push:

```bash
cd /home/maul/Kerjaan/CAR-dano/app/cardano-frontend

# Build dengan BuildKit (ini akan populate cache)
DOCKER_BUILDKIT=1 docker build -t cardano-frontend:latest .

# Tag untuk DockerHub (ganti USERNAME)
docker tag cardano-frontend:latest YOUR_USERNAME/cardano-frontend:latest

# Push
docker push YOUR_USERNAME/cardano-frontend:latest

# Di Coolify: Change deployment method ke "Docker Image"
# Point to: YOUR_USERNAME/cardano-frontend:latest
```

## Verification

After deployment sukses, verify cache working:

1. Trigger rebuild di Coolify
2. Check logs untuk npm ci duration
3. Should see: `npm ci` completes in **2-3 minutes** (bukan 24 menit)

## Additional Optimization Opportunities

Jika masih slow, consider:

1. **pnpm instead of npm** (20-30% faster)
2. **Remove unused dependencies** (reduce 998MB)
3. **Use pre-built Docker image** with dependencies included
4. **Enable Next.js Turbopack** for faster builds

---

**Status**: Optimization implemented  
**Next**: Test deployment ke Coolify  
**Expected**: First build might timeout, subsequent builds will succeed
