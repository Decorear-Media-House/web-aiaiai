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

1. เข้า WordPress Admin: `https://aiaiai-cms.decorear.com/wp-admin/`
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

### Docker services (`docker-compose.prod.yml`)

```
aiaiai-mysql      ← internal only, healthchecked
aiaiai-wordpress  ← :${WP_HTTP_PORT}→:80 (Apache)
aiaiai-wp-init    ← one-shot installer (wp-cli); exits when seeded
aiaiai-frontend   ← :${FRONTEND_HTTP_PORT}→:3000 (Next.js standalone)
```

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

### Host auto-detection

`bootstrap.sh` อ่าน EC2 public IPv4 ผ่าน IMDSv2 ใช้เป็น `WP_DOMAIN` ถ้าไม่ใช่ EC2 จะ fallback เป็น `localhost` ทั้ง 2 กรณี append port (`:8080`) ให้อัตโนมัติเพื่อให้ wp-admin redirect ทำงานถูก

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

เมื่อมีการแก้ content บน production แล้วต้องการ export กลับเข้า repo:

```bash
# รันบน production server (SSH เข้าก่อน)
cd /home/decorear-aiai/web-aiaiai
bash wordpress/export-content.sh

# commit และ push
git add wordpress/seed-content.sh
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

## Daily Deploy Flow

| ใคร | ทำอะไร | วิธี |
|-----|--------|------|
| ลูกค้า | แก้ content ใน WP | กด **Deploy Site** ใน WP Admin |
| Developer | แก้ code | `git push` → กด **Deploy Site** |
| Developer | ติดตั้ง stack ใหม่บน EC2 | `./bootstrap.sh` |
| Developer | sync content จาก production | `bash wordpress/export-content.sh` → commit → push |
