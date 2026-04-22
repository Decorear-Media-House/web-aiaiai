# Fresh-install log

## Commands

```bash
# 1. Teardown prod stack (containers + volumes + network)
docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod down -v --remove-orphans

# 2. Teardown dev compose (orphan volumes จาก workflow เก่า — ถ้ามี)
docker compose -f docker-compose.yml down -v --remove-orphans

# 3. Force cold rebuild ของ frontend image
docker rmi aiaiai-frontend:latest 2>/dev/null || true

# 4. Regenerate .env.prod
rm -f .env.prod

# 5. Bootstrap
./bootstrap.sh
```

## Output (scrubbed)

```
$ docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod down -v --remove-orphans
[+] down 7/7
 ✔ Container aiaiai-frontend     Removed
 ✔ Container aiaiai-wp-init      Removed
 ✔ Container aiaiai-wordpress    Removed
 ✔ Container aiaiai-mysql        Removed
 ✔ Volume aiaiai-prod_wp-db-data Removed
 ✔ Volume aiaiai-prod_wp-html    Removed
 ✔ Network aiaiai-prod_default   Removed

$ docker rmi aiaiai-frontend:latest
Untagged: aiaiai-frontend:latest

$ rm -f .env.prod

$ ./bootstrap.sh

[bootstrap] first run — generating .env.prod with random secrets
[bootstrap] detected domain: localhost:8080 (edit .env.prod to customize)
[bootstrap] building images and starting services (first run takes ~3–8 min)
[bootstrap] → WP init container will seed content, upload 74MB of media, activate plugins

[+] Building 10.5s (19/19) FINISHED
 => [internal] load build definition from Dockerfile
 => [internal] load metadata for docker.io/library/node:22-alpine
 => [internal] load .dockerignore
 => [deps 1/4] FROM docker.io/library/node:22-alpine
 => [internal] load build context
 => CACHED [deps 2/4] WORKDIR /app
 => CACHED [runner 3/7] RUN addgroup --system --gid 1001 nodejs
 => CACHED [runner 4/7] RUN adduser --system --uid 1001 nextjs
 => CACHED [deps 3/4] COPY package.json package-lock.json* ./
 => CACHED [deps 4/4] RUN npm ci
 => CACHED [builder 3/5] COPY --from=deps /app/node_modules ./node_modules
 => CACHED [builder 4/5] COPY . .
 => CACHED [builder 5/5] RUN npm run build
 => CACHED [runner 5/7] COPY --from=builder /app/public ./public
 => CACHED [runner 6/7] COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
 => CACHED [runner 7/7] COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
 => exporting to image
 => naming to docker.io/library/aiaiai-frontend:latest

[+] up 8/8
 ✔ Image aiaiai-frontend:latest  Built                  10.6s
 ✔ Network aiaiai-prod_default   Created                 0.1s
 ✔ Volume aiaiai-prod_wp-db-data Created                 0.0s
 ✔ Volume aiaiai-prod_wp-html    Created                 0.0s
 ✔ Container aiaiai-mysql        Healthy                11.7s
 ✔ Container aiaiai-wordpress    Healthy                17.8s
 ✔ Container aiaiai-wp-init      Exited                 61.3s
 ✔ Container aiaiai-frontend     Started                61.3s

════════════════════════════════════════════════════════
  ✓ Deployment ready
════════════════════════════════════════════════════════
  Frontend:     http://localhost:3000
  WordPress:    http://localhost:8080/wp-admin
  Admin user:   admin
  Admin pass:   <redacted — rotate หรือ reset ใน .env.prod>
════════════════════════════════════════════════════════
```

## Timing

- Cold rebuild (frontend image ถูกลบก่อน): ~10.5s (เพราะ node_modules + build output ยังอยู่ใน BuildKit cache)
- Stack startup + init seed: ~61s (MySQL healthy 11.7s → WordPress healthy 17.8s → wp-init seed & exit 61.3s → frontend start)
- Total wall clock: ~1–2 นาที บนเครื่อง dev; first-time cold (ไม่มี cache) ~3–8 นาทีตาม README

## Post-install notes

- Admin password random ต่อเครื่อง เก็บใน `.env.prod` (gitignore)
- Rotate ผ่าน wp-admin → Edit Profile หรือ `./wp.sh user update admin --user_pass=<new>`
- init.sh flow log ครบ 13 steps (wait WP → install core → plugins → upload-images → seed-content → seed-blog → JetEngine meta boxes → import-meta-sync → import-options → fix-urls → verify-media → flag)
