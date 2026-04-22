# AIAIAI Website

Next.js static site + WordPress headless CMS — deployable in one command with Docker.

---

## Quick Start (Docker)

```bash
git clone https://github.com/Decorear-Media-House/web-aiaiai.git
cd web-aiaiai
./bootstrap.sh
```

แค่นั้น — `bootstrap.sh` จะ provision ทั้ง stack (Frontend + WordPress + MySQL), gen random secrets, seed content, แล้ว print admin URL + password ให้เสร็จ

**Requirements**

| รายการ | รายละเอียด |
|---|---|
| Docker Engine + Compose plugin | `sudo apt install docker.io docker-compose-v2` (Ubuntu) |
| openssl | ส่วนใหญ่ติดตั้งมาอยู่แล้ว (Linux / macOS) |
| RAM | 2GB+ (สำหรับ Next.js build) |
| Ports | 3000 และ 8080 ว่าง (เปลี่ยนได้ใน `.env.prod`) |
| Internet | สำหรับ pull docker images + free plugins |

**Expected output**

```
════════════════════════════════════════════════════════
  ✓ Deployment ready
════════════════════════════════════════════════════════
  Frontend:     http://<host>:3000
  WordPress:    http://<host>:8080/wp-admin
  Admin user:   admin
  Admin pass:   <32-char hex — saved in .env.prod>
════════════════════════════════════════════════════════
```

เรียก `./bootstrap.sh` ซ้ำได้ (idempotent) — ถ้า `.env.prod` อยู่แล้วจะใช้ค่าเดิม, init container จะข้าม (เจอ flag file)

---

## สำหรับลูกค้า (Content Editor)

### แก้ไข Content

1. เข้า WordPress Admin: `https://<your-cms-domain>/wp-admin/`
2. ไปที่ **Pages** → เลือกหน้าที่ต้องการ → แก้ไขข้อความ, รูป, สี ใน Meta Boxes
3. กด **Update** บันทึก
4. กด **Deploy Site** (ปุ่มสีน้ำเงินด้านบน) → รอ ~1 นาที → เว็บอัพเดทอัตโนมัติ

### หน้าที่แก้ไขได้

| หน้า | ไปที่ |
|------|-------|
| หน้าแรก | Pages → Home |
| เกี่ยวกับเรา | Pages → About Us |
| บริการ | Pages → Services |
| AI Security | Pages → AI Security Guard Solution |
| Humanoid Robotics | Pages → AI-Enhanced Humanoid Robotics |
| AI Solution Partner | Pages → AI Solution Partner |
| บล็อก | Posts → Add New / Edit |
| SEO | ในหน้า Edit → Rank Math SEO |
| Email/SMTP | Decorear Tools → Email Settings |
| Tracking Tags | Decorear Tools → Tracking Tags |

### ข้อควรรู้

- แก้ content แล้ว **ต้องกด Deploy** ถึงจะเห็นบนเว็บจริง
- ระหว่าง Deploy เว็บยังใช้งานได้ปกติ
- แก้กี่ครั้งก็ได้ แล้วค่อย Deploy ทีเดียว
- ถ้า Deploy ผิดพลาด เว็บเก่ายังอยู่ ไม่พัง
- รูปภาพรองรับ JPG, PNG, WebP, SVG (แนะนำ WebP)

---

## Stack

- **Frontend**: Next.js 16 (standalone build), React, Tailwind CSS, Framer Motion
- **CMS**: WordPress 6 + JetEngine Pro + RankMath
- **Database**: MySQL 8
- **Orchestration**: Docker Compose (prod), ecosystem tools (Caddy/Nginx optional for SSL)

> **Headless split:** ผู้ใช้ปลายทางเห็นแค่ Next.js ที่ `:3000` เท่านั้น ส่วน `:8080` เป็น wp-admin + REST API สำหรับให้ admin แก้ content — theme ที่ render บน `:8080` เป็น preview ภายใน ไม่ใช่หน้าเว็บจริง ขึ้นโปรดักชันจริงควรซ่อน port นี้หลัง reverse proxy/VPN

```
┌──────────────────────────────────────────────────────────┐
│  EC2 instance                                            │
│                                                          │
│  ┌──────────────┐          ┌──────────────┐              │
│  │ aiaiai-      │ SSR/ISR  │ aiaiai-      │              │
│  │ frontend     │◄─────────┤ wordpress    │              │
│  │ (Next.js)    │  wp-json │ (REST API)   │              │
│  │ :3000        │          │ :8080        │              │
│  └──────┬───────┘          └──────┬───────┘              │
│         │                         ▼                      │
│         │                  ┌──────────────┐              │
│         │                  │ aiaiai-mysql │              │
│         │                  │ (internal)   │              │
│         │                  └──────────────┘              │
│         │                                                │
│         └── /api/revalidate ◄── "Deploy Site" in wp-admin│
│             (ISR tag invalidation, shared secret)        │
│                                                          │
│  [once]  aiaiai-wp-init  (seeds DB + media on first run) │
└──────────────────────────────────────────────────────────┘
```

### Docker services (`docker-compose.prod.yml`)

```
aiaiai-mysql      ← internal only, healthchecked
aiaiai-wordpress  ← :${WP_HTTP_PORT}→:80 (Apache, no WP-CLI in this image)
aiaiai-wp-init    ← one-shot installer (wordpress:cli image); exits when seeded
aiaiai-frontend   ← :${FRONTEND_HTTP_PORT}→:3000 (Next.js standalone)
```

WP-CLI lives only in `aiaiai-wp-init`. Ad-hoc commands go through `./wp.sh <args>` (see "WP-CLI access" below) — running `docker exec aiaiai-wordpress wp …` will fail.

- Server-side frontend fetches ผ่าน Docker network (`http://aiaiai-wordpress:80`) — ไม่ออก internet
- Browser fetches (รูป, form submit) ไปที่ public `WP_DOMAIN`
- Init container idempotent — flag file `/var/www/html/wp-content/.wp-init-installed` กัน re-seed
- Volumes `aiaiai-prod_wp-html` + `aiaiai-prod_wp-db-data` persist ข้ามการรีสตาร์ต

### Project structure

```
Frontend/                  # Next.js standalone app
bootstrap.sh               # One-command deploy entry point
docker-compose.prod.yml    # Full-stack prod compose (Frontend + WP + MySQL)
docker-compose.yml         # Legacy dev compose (hot reload workflow)
.env.prod.example          # Config template (copy → edit)
wordpress/
├── docker/
│   └── init.sh            # Zero-touch installer (runs in wp-cli container)
├── mu-plugins/            # Auto-loaded custom WP plugins
├── uploads/               # 74MB production media (73 files, tracked in git)
├── premium-plugins/       # Drop licensed .zip here (gitignored *.zip)
├── seed-content.sh        # Seed 6 pages via WP-CLI
├── seed-all-jetengine.php # Register JetEngine meta boxes
├── upload-images.php      # Import uploads/ into WP Media Library
├── fix-urls.php           # Rewrite baked-in URLs to target domain
└── ...
```

---

## Customize the Deploy

### ใช้ domain จริงแทน EC2 IP (production)

```bash
# หลัง bootstrap run ครั้งแรก
nano .env.prod
# ← เปลี่ยน WP_DOMAIN=cms.example.com, WP_PROTOCOL=https, WP_HTTP_PORT=80
docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod down
./bootstrap.sh    # จะใช้ .env.prod เดิม แต่ rebuild frontend ด้วย domain ใหม่
```

`NEXT_PUBLIC_WORDPRESS_URL` ถูก bake เข้า Next.js bundle ตอน build — เปลี่ยน domain ต้อง rebuild

Frontend แยก WP URL เป็น 3 ตัวตาม stage:

| Env | Stage | ค่าที่ใช้จริง |
|-----|-------|---------------|
| `NEXT_PUBLIC_WORDPRESS_URL` | build-time bake + client-side | `${WP_PROTOCOL}://${WP_DOMAIN}` |
| `WORDPRESS_BUILD_API_URL` | `docker compose build` (SSG fetches) | default = public URL `/wp-json` — override ถ้า domain ยังไม่ live ตอน build |
| `WORDPRESS_API_URL` | runtime SSR ใน container | `http://aiaiai-wordpress:80/wp-json` |

### เพิ่ม premium plugin (JetEngine Pro, RankMath Pro)

```bash
# วาง .zip ใน wordpress/premium-plugins/
cp ~/Downloads/jet-engine.zip wordpress/premium-plugins/
# ลบ flag แล้วให้ init container รันซ้ำ
docker exec aiaiai-wordpress rm -f /var/www/html/wp-content/.wp-init-installed
docker compose -p aiaiai-prod -f docker-compose.prod.yml up -d --force-recreate aiaiai-wp-init
```

Init จะ loop `wordpress/premium-plugins/*.zip` และ install + activate ทุกตัว

### Update frontend อย่างเดียว (WP data ไม่ถูกแตะ)

```bash
git pull
docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod up -d --build aiaiai-frontend
```

### Reset ทุกอย่าง (DB + media + config)

```bash
docker compose -p aiaiai-prod -f docker-compose.prod.yml down -v
rm .env.prod
./bootstrap.sh
```

---

## Production / EC2 Notes

### Deterministic fresh-install checklist

รันจาก fresh EC2 ในลำดับนี้ — ไม่มี manual step ซ่อน:

1. **Drop premium plugin zips** — ใส่ `jet-engine.zip`, `jet-elements.zip` ฯลฯ ลง `wordpress/premium-plugins/` ก่อน bootstrap; init loop `*.zip` install + activate ทุกตัว
2. **`./bootstrap.sh`** — gen `.env.prod`, detect host IP, `docker compose up -d --build`
3. **รอ `aiaiai-wp-init` exit 0** — bootstrap.sh block จนกว่าจะเสร็จ และจะ fail loud ถ้า init container exit ไม่เป็น 0
4. **ตรวจ init log missing media** — init step 10b รัน `verify-media.php` เป็น non-fatal report ว่ามีรูปไหน export-data.json อ้างแต่ไม่มีใน `wordpress/uploads/` — ถ้ามี ให้เติมรูปแล้ว reset ตามข้อถัดไป
5. **Smoke test** —
   ```bash
   curl -fsS http://$WP_DOMAIN/wp-json/wp/v2/pages?per_page=1 | jq '.[0].slug'  # "home"
   curl -fsS http://$WP_DOMAIN/wp-json/wp/v2/posts?per_page=1 | jq '.[0].title'
   curl -fsSI http://$FE_HOST:$FRONTEND_HTTP_PORT/ | head -1                     # 200 OK
   ```
6. **Reset ถ้าต้องการเริ่มใหม่** — `docker compose -p aiaiai-prod -f docker-compose.prod.yml down -v && rm .env.prod && ./bootstrap.sh`

### Host auto-detection

`bootstrap.sh` อ่าน EC2 public IPv4 ผ่าน IMDSv2 ใช้เป็น `WP_DOMAIN` ถ้าไม่ใช่ EC2 จะ fallback เป็น `localhost` ทั้ง 2 กรณี append port (`:8080`) ให้อัตโนมัติเพื่อให้ wp-admin redirect ทำงานถูก

### WP-CLI access

`wordpress:6-apache` image ไม่มี `wp` binary — ใช้ `./wp.sh` wrapper ที่ run throwaway `wordpress:cli` container แทน:

```bash
./wp.sh post list
./wp.sh plugin status
./wp.sh eval-file /seed/verify-media.php
./wp.sh option get permalink_structure
```

wrapper share volume `wp-html` และ network ของ `aiaiai-wordpress` → แก้ DB ตัวเดียวกับ stack ที่รันอยู่ ต้องมี `.env.prod` + stack ขึ้นก่อนถึงจะ run ได้

### Security Group / Firewall

เปิด inbound TCP:
- `FRONTEND_HTTP_PORT` (default 3000)
- `WP_HTTP_PORT` (default 8080) — ต้องเปิดเพราะ browser ใช้สำหรับ wp-admin + REST API + image requests

ถ้ามี reverse proxy (Caddy/Nginx/ALB) → เปิดแค่ 80/443 ที่ reverse proxy, services ภายในยังอยู่ที่ 3000/8080

### SSL (Caddy example — auto HTTPS)

```caddyfile
cms.example.com    { reverse_proxy localhost:8080 }
aiaiai.example.com { reverse_proxy localhost:3000 }
```

Caddy ขอ Let's Encrypt cert ให้อัตโนมัติ

---

## Local Dev Workflow

### Full-stack (Docker, เหมือน production)

```bash
./bootstrap.sh    # ใช้ compose prod บน localhost:3000 + localhost:8080
```

ข้อดี: เหมือน production, reproducible  
ข้อเสีย: Frontend เป็น standalone build ไม่มี hot reload — แก้ code ต้อง rebuild

### Frontend hot reload (legacy compose)

```bash
docker compose up -d                    # WP + MySQL เท่านั้น
cd Frontend && npm install && npm run dev
```

- WordPress install + plugins ต้อง setup manual ผ่าน wp-admin ที่ `http://localhost:8080`
- Frontend รันที่ `http://localhost:3000` พร้อม HMR

**เมื่อไหร่ใช้แบบไหน:**
- ทดสอบ feature ฝั่ง frontend → hot reload compose
- ทดสอบ deploy flow / seed / init → `./bootstrap.sh`

---

## Sync Content (Production → Git)

> **Setup**: `deploy.sh`, `wordpress/export-meta-sync.sh`, and `wordpress/fix-urls.php` read deploy targets from `.env.deploy`. Copy the example file once per environment:
>
> ```bash
> cp .env.deploy.example .env.deploy
> # edit CMS_HOST, CMS_ROOT, DEPLOY_HOST, DEPLOY_ROOT, PROD_WP_URL
> ```
>
> `.env.deploy` is gitignored (covered by `.env.*`). Required for `deploy.sh`; optional but recommended for the others.

3 JSON ไฟล์ที่ `.planning/` ไม่แตะ แต่ fresh installs อ่าน — sync ครบทั้งสามเมื่ออยาก pin content snapshot ปัจจุบัน:

**1. JetEngine fields** (`wordpress/wp-meta-sync.json`) — prefill meta box values ตอนเปิด wp-admin หลัง bootstrap. Dev-machine ก็รันได้, ดึงผ่าน REST API:

```bash
bash wordpress/export-meta-sync.sh
```

**2. Legacy `page_sections` JSON** (`wordpress/seed-content.sh`) — fallback ให้ frontend เมื่อ JetEngine fields ว่าง; ต้อง SSH เข้า prod server:

```bash
ssh decorear-aiai@<prod>
cd /home/decorear-aiai/web-aiaiai
bash wordpress/export-content.sh
```

**3. Full export** (`wordpress/export-data.json`) — pages + blog posts + categories + site options (permalink, custom_logo, Rank Math). Consumed by `import-options.php` (init) และ `import-data.php` (deploy.sh remote sync). ต้อง SSH เข้า prod server แล้วรันตรง — `/seed` mount เป็น `:ro` ใน Docker ไม่ให้เขียนทับไฟล์:

```bash
ssh decorear-aiai@<prod>
cd /home/decorear-aiai/web-aiaiai
wp --allow-root eval-file wordpress/export-data.php
# copy wordpress/export-data.json back to dev machine via scp / git
```

แล้ว commit ทั้ง 3 ไฟล์:

```bash
git add wordpress/wp-meta-sync.json wordpress/seed-content.sh wordpress/export-data.json
git commit -m "sync content from production"
git push
```

---

## Alternative Deploys

### Vercel (Frontend only, WP ใช้ที่อื่น)

1. vercel.com → New Project → Import repo นี้
2. **Root Directory**: `Frontend`, **Output Directory**: `out`
3. Environment Variables:

| Key | Value |
|-----|-------|
| `WORDPRESS_API_URL` | `https://cms.example.com/wp-json` |
| `NEXT_PUBLIC_WORDPRESS_URL` | `https://cms.example.com` |

4. Vercel → Settings → Git → **Deploy Hooks** → สร้าง hook สำหรับ `main`
5. Copy hook URL ใส่ `wp-config.php`:

```php
define('AIAIAI_WEBHOOK_URL', 'https://api.vercel.com/v1/integrations/deploy/xxx');
```

### Self-Hosted (manual, ไม่ใช้ Docker)

Deprecated in favor of `./bootstrap.sh` ถ้าจำเป็นจริงๆ ดู git history commit `1f45716` สำหรับขั้นตอนเต็มที่ต้องตั้ง Nginx + PHP-FPM + MySQL + WP-CLI + pm2 webhook เอง

---

## How the Deploy Button Works

```
wp-admin (Deploy Site)
  └─ POST /wp-admin/admin-ajax.php?action=aiaiai_deploy_trigger
     └─ mu-plugin → POST http://aiaiai-frontend:3000/api/revalidate
        with header: x-revalidate-secret: $REVALIDATE_SECRET
        └─ Next.js: revalidateTag("wordpress")
           └─ next page render hits fresh WP REST data
```

- Secret อยู่ใน `.env.prod` ชื่อ `REVALIDATE_SECRET` — shared ระหว่าง WP (`AIAIAI_REVALIDATE_SECRET`) และ Next.js (`REVALIDATE_SECRET`)
- `wpFetch()` ใน `Frontend/src/lib/wordpress.ts` ติด tag `"wordpress"` + `revalidate: 60` — โดน revalidateTag ล้างเมื่อไหร่ ได้ fresh data ทันที, ถ้าไม่กด ISR refresh ทุก 60s
- ถ้า secret ไม่ตรง → endpoint ตอบ 401; ถ้าไม่มี secret ใน WP constant → mu-plugin ไม่ส่ง header
- Health check (GET `/api/revalidate`) ไม่ต้อง secret — WP admin ใช้ show status dot

---

## Developer Landmarks

ถ้าจะแก้ของที่อยู่ลึกกว่า content editing:

| Path | บทบาท |
|------|-------|
| `bootstrap.sh` | One-command deploy — gen `.env.prod`, detect EC2 IP, `docker compose up` |
| `docker-compose.prod.yml` | Stack 4 services + WP constants (`WP_HOME`, `AIAIAI_WEBHOOK_URL`, `AIAIAI_REVALIDATE_SECRET`) ผ่าน `apache_config:` |
| `wordpress/docker/init.sh` | ลำดับ install — wait WP healthy → core install → install free plugin (`seo-by-rank-math`) → loop `premium-plugins/*.zip` → upload-images → seed-content → seed-blog → seed-all-jetengine → import-meta-sync → import-options → fix-urls → verify-media → touch flag |
| `wordpress/seed-helpers.php` | Shared helpers: `aiaiai_attachment_id_by_basename`, `aiaiai_rankmath_meta_keys`, `aiaiai_find_seed_file` |
| `wordpress/seed-blog.php` | Seed blog page + sample posts (featured image via filename lookup, Rank Math meta) |
| `wordpress/import-options.php` | Apply site options (permalink, custom_logo, theme mods, Rank Math) from `export-data.json` |
| `wordpress/verify-media.php` | Report image basenames referenced by export/sync JSON that aren't in `uploads/` (non-fatal in init) |
| `wordpress/seed-content.sh` | JSON blob ของ 6 หน้า (hero/outcomes/cta ฯลฯ) — แก้ default content ที่นี่ |
| `wordpress/seed-all-jetengine.php` | Register JetEngine meta boxes (idempotent) |
| `wordpress/upload-images.php` | Import `wordpress/uploads/*` → WP Media Library |
| `wordpress/fix-urls.php` | Rewrite seeded vendor URLs → `WP_HOME` (or `PROD_URL` env) ใน DB (idempotent) |
| `wp.sh` | WP-CLI wrapper — spawns `wordpress:cli` against the live `aiaiai-wordpress` stack |
| `wordpress/mu-plugins/aiaiai-content-api.php` | Content REST endpoints + Deploy button AJAX handler |
| `Frontend/src/lib/wordpress.ts` | `wpFetch` (tagged ISR), `getPageMeta` (JetEngine → `page_sections` legacy fallback), `wpImageUrl` (rewrite internal hostname) |
| `Frontend/src/app/api/revalidate/route.ts` | Receives Deploy button POST, calls `revalidateTag("wordpress")` |

Files ใน `wordpress/mu-plugins/` mount read-only เข้า container — แก้ไฟล์ใน git แล้ว restart WP เห็นผลทันที ไม่ต้อง rebuild image

---

## Daily Deploy Flow

| ใคร | ทำอะไร | วิธี |
|-----|--------|------|
| ลูกค้า | แก้ content ใน WP | กด **Deploy Site** ใน WP Admin |
| Developer | แก้ code | `git push` → กด **Deploy Site** |
| Developer | ติดตั้ง stack ใหม่บน EC2 | `./bootstrap.sh` |
| Developer | sync content จาก production | `bash wordpress/export-content.sh` → commit → push |
