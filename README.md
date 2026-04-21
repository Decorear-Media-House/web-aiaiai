# AIAIAI Website

เว็บไซต์ AI-AI-AI Co., Ltd. — Static site + WordPress headless CMS

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

## สำหรับ Developer

### Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion
- **CMS**: WordPress 6 + JetEngine Pro + RankMath
- **Hosting**: CloudPanel (AWS Lightsail) — static site + WordPress headless CMS

### Project Structure

```
Frontend/             # Next.js static site
wordpress/
├── mu-plugins/       # Auto-loaded WP plugins (content API, fields, security, tools)
├── uploads/          # Production media assets (73 files) — committed to git
├── seed-content.sh   # Seed all page content via WP-CLI
├── seed-blog.php     # Seed blog posts
├── seed-all-jetengine.php  # Create JetEngine meta boxes + seed data
├── upload-images.php # Import images from wordpress/uploads/ into WP Media Library
└── export-content.sh # Export current WP content back to seed-content.sh
docker-compose.yml    # Local dev: MySQL + WordPress + Frontend
rebuild.sh            # Server-side rebuild (triggered by Deploy button)
```

---

## Local Dev Setup (Environment ใหม่)

### Prerequisites

- Docker Desktop
- Node.js 20+
- Git

### ขั้นตอน

**1. Clone repo**

```bash
git clone https://github.com/Decorear-Media-House/web-aiaiai.git
cd web-aiaiai
```

**2. Start containers**

```bash
docker compose up -d
```

รอประมาณ 30–60 วินาทีจนกว่า WordPress จะพร้อม ตรวจสอบได้ด้วย:

```bash
docker exec aiaiai-wordpress curl -sf http://localhost/wp-login.php > /dev/null && echo "WordPress ready"
```

**3. ติดตั้ง WordPress**

เข้า `http://localhost:8080` แล้วทำ WordPress install ตามปกติ (ตั้ง admin user/password)

**4. Activate plugins**

เข้า `http://localhost:8080/wp-admin/` → Plugins → Activate ทุกตัวที่มี

> **หมายเหตุ**: JetEngine Pro และ RankMath ต้องติดตั้งแยก (premium plugins) — upload .zip ผ่าน Plugins → Add New → Upload Plugin

**5. สร้าง JetEngine meta boxes**

```bash
docker exec aiaiai-wordpress wp --allow-root eval-file /var/www/html/wp-content/mu-plugins/../seed-all-jetengine.php
```

**6. Upload รูปภาพเข้า WordPress Media Library**

```bash
docker exec aiaiai-wordpress wp --allow-root eval-file /var/www/html/wp-content/mu-plugins/../upload-images.php
```

รูปภาพทั้งหมดอยู่ใน `wordpress/uploads/` ใน repo (73 ไฟล์, ตรงกับ production)

**7. Seed page content**

```bash
docker exec aiaiai-wordpress bash /var/www/html/wp-content/mu-plugins/../seed-content.sh
```

Seed 6 หน้า: Home, About, Services, Partner, Humanoid, Security พร้อม image URLs ครบ

**8. Seed blog posts** (ถ้าต้องการ)

```bash
docker exec aiaiai-wordpress wp --allow-root eval-file /var/www/html/wp-content/mu-plugins/../seed-blog.php
```

**9. Start frontend**

```bash
cd Frontend && npm install && npm run dev
```

เปิด `http://localhost:3000`

---

## ตาราง URLs (Local Dev)

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| WordPress Admin | http://localhost:8080/wp-admin/ |
| WordPress REST API | http://localhost:8080/wp-json/wp/v2/ |

---

## Sync Content จาก Production → Git

เมื่อมีการแก้ content บน production แล้วต้องการ export กลับเข้า repo:

```bash
# รันบน production server (SSH เข้าก่อน)
cd /home/decorear-aiai/web-aiaiai
bash wordpress/export-content.sh

# จากนั้น commit และ push
git add wordpress/seed-content.sh
git commit -m "sync content from production"
git push
```

---

## Deploy: AWS EC2 (Docker — Full Stack, Zero-Touch)

วิธีนี้ใช้ `docker-compose.prod.yml` รัน **ทั้ง stack (Frontend + WordPress + MySQL)** บน EC2 เครื่องเดียว พร้อม init container ที่ติดตั้ง WordPress, activate plugins, upload รูป, และ seed content ให้อัตโนมัติ **ในครั้งเดียว** (no manual WP installer UI).

### สิ่งที่ต้องเตรียม

| รายการ | รายละเอียด |
|--------|-----------|
| **EC2** | Ubuntu 22+, RAM 2GB+ (แนะนำ 4GB สำหรับ build frontend), Storage 20GB+ |
| **Software** | Docker Engine + Docker Compose plugin (`sudo apt install docker.io docker-compose-v2`) |
| **Domain** | 1 domain สำหรับ CMS (เช่น `cms.example.com`) ชี้ A-record ไปที่ EC2 elastic IP — ใช้ทั้งกับ WordPress และ client-side ของ frontend |
| **Premium plugins** (optional) | `jet-engine.zip` (ต้องใช้สำหรับ meta boxes); `seo-by-rank-math-pro.zip` (free version ติดตั้งให้อัตโนมัติ) |

### Architecture

```
EC2
├── aiaiai-mysql      (internal only)
├── aiaiai-wordpress  (:${WP_HTTP_PORT}, default 8080)
├── aiaiai-wp-init    (one-shot; exits when seeded)
└── aiaiai-frontend   (:${FRONTEND_HTTP_PORT}, default 3000)
```

- Frontend เรียก WordPress REST API ผ่าน Docker network (`http://aiaiai-wordpress:80` — ไม่ออก internet)
- Client-side browser เรียก WordPress ผ่าน public domain (ที่ตั้งใน `WP_DOMAIN`) สำหรับรูปและ contact form
- **Reverse proxy (SSL) = BYO** — แนะนำใส่ Nginx/Caddy หน้า compose แล้ว proxy:
  - `aiaiai.example.com` → `localhost:3000` (frontend)
  - `cms.example.com` → `localhost:8080` (WordPress)

### ขั้นตอน (One Command)

```bash
git clone https://github.com/Decorear-Media-House/web-aiaiai.git
cd web-aiaiai
./bootstrap.sh
```

แค่นั้น `bootstrap.sh` จะจัดการให้ทุกอย่าง:

1. เช็ค Docker + compose plugin (ถ้าไม่มี → แจ้งคำสั่งติดตั้ง)
2. สร้าง `.env.prod` ให้อัตโนมัติ (random 32-char passwords) ถ้ายังไม่มี
3. Auto-detect EC2 public IPv4 (ผ่าน IMDSv2) → ใช้เป็น `WP_DOMAIN` (fallback = `localhost`)
4. Build + start ทั้ง 4 services รอจน `aiaiai-wp-init` exit 0
5. Print admin URL + credentials ให้ save ไว้

เรียกซ้ำได้ (idempotent) — ถ้า `.env.prod` มีอยู่แล้วจะใช้ค่าเดิม ไม่ gen ใหม่

### Customize

**ใช้ domain จริงแทน EC2 IP** (แนะนำสำหรับ production):

```bash
# หลัง bootstrap run ครั้งแรก
nano .env.prod           # เปลี่ยน WP_DOMAIN=cms.example.com, WP_PROTOCOL=https
docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod down
docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

หมายเหตุ: `NEXT_PUBLIC_WORDPRESS_URL` ถูก bake เข้า Next.js bundle ตอน build — เปลี่ยน domain ต้อง `--build` ซ้ำ

**(Optional) เพิ่ม premium plugin zips ก่อน bootstrap**:

```bash
scp jet-engine.zip ubuntu@EC2_IP:~/web-aiaiai/wordpress/premium-plugins/
```

**EC2 Security Group** — เปิด inbound TCP:
- `$FRONTEND_HTTP_PORT` (default 3000) — หรือ 80/443 ถ้ามี reverse proxy
- `$WP_HTTP_PORT` (default 8080) — สำหรับ wp-admin + REST API

SSL: แนะนำใส่ Caddy/Nginx หน้า compose แล้ว proxy ไปที่ ports ภายใน (auto-HTTPS จาก Let's Encrypt)

### เปลี่ยน Frontend อย่างเดียว

เมื่อ push code frontend ใหม่:

```bash
git pull
docker compose -p aiaiai-prod -f docker-compose.prod.yml --env-file .env.prod up -d --build aiaiai-frontend
```

WP + DB จะไม่ถูกแตะ init container จะข้าม (เจอ flag file เดิม)

### Re-seed / Reset

```bash
# ลบทุกอย่าง (DB + wp-content) แล้ว seed ใหม่หมด
docker compose -p aiaiai-prod -f docker-compose.prod.yml down -v
./bootstrap.sh    # หรือ docker compose ... up -d --build

# รัน init ซ้ำโดยไม่ลบข้อมูล — ต้องลบ flag ก่อน
docker exec aiaiai-wordpress rm -f /var/www/html/wp-content/.wp-init-installed
docker compose -p aiaiai-prod -f docker-compose.prod.yml up -d --force-recreate aiaiai-wp-init
```

---

## Deploy: Self-Hosted (Server เอง)

### สิ่งที่ต้องเตรียม

| รายการ | รายละเอียด |
|--------|-----------|
| **Server** | Ubuntu 22+, RAM 2GB+, Storage 20GB+ |
| **Domain 2 อัน** | 1 static site (เช่น `aiaiai.example.com`) + 1 CMS (เช่น `cms.example.com`) |
| **Software** | Nginx, PHP 8+, MySQL 8+, Node.js 20+, WP-CLI, Git |

### ขั้นตอนที่ 1: ติดตั้ง WordPress CMS

```bash
# สร้าง database
sudo mysql -e "
  CREATE DATABASE aiaiai_wp CHARACTER SET utf8mb4;
  CREATE USER 'aiaiai'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD';
  GRANT ALL ON aiaiai_wp.* TO 'aiaiai'@'localhost';
  FLUSH PRIVILEGES;
"

# ติดตั้ง WordPress
cd /var/www/cms.example.com
wp core download
wp config create --dbname=aiaiai_wp --dbuser=aiaiai --dbpass=YOUR_PASSWORD
wp core install --url=https://cms.example.com --title="AIAIAI CMS" \
  --admin_user=admin --admin_password=ADMIN_PASS --admin_email=admin@example.com
wp rewrite structure '/%postname%/'

# ติดตั้ง plugins
wp plugin install seo-by-rank-math --activate
# JetEngine Pro → upload .zip ผ่าน WP Admin (premium plugin)
```

### ขั้นตอนที่ 2: Copy mu-plugins + Seed Content

```bash
# Clone repo
git clone https://github.com/Decorear-Media-House/web-aiaiai.git
cd web-aiaiai

# Copy mu-plugins
cp wordpress/mu-plugins/*.php /var/www/cms.example.com/wp-content/mu-plugins/

# Upload images
cd /var/www/cms.example.com
wp --allow-root eval-file /path/to/web-aiaiai/wordpress/upload-images.php

# Seed JetEngine meta boxes
wp --allow-root eval-file /path/to/web-aiaiai/wordpress/seed-all-jetengine.php

# Seed page content
bash /path/to/web-aiaiai/wordpress/seed-content.sh

# Fix URLs (localhost → production)
PROD_URL=https://cms.example.com wp --allow-root eval-file /path/to/web-aiaiai/wordpress/fix-urls.php
```

### ขั้นตอนที่ 3: ตั้ง Nginx

**WordPress CMS** (`cms.example.com`):
```nginx
server {
    listen 80;
    server_name cms.example.com;
    root /var/www/cms.example.com;
    index index.php;
    client_max_body_size 100M;

    location / { try_files $uri $uri/ /index.php?$args; }
    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

**Static Site** (`aiaiai.example.com`):
```nginx
server {
    listen 80;
    server_name aiaiai.example.com;
    root /var/www/aiaiai.example.com;
    location / { try_files $uri $uri/ $uri.html =404; }
    error_page 404 /404.html;
}
```

```bash
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d cms.example.com -d aiaiai.example.com
```

### ขั้นตอนที่ 4: Build และ Deploy Frontend

```bash
cd web-aiaiai/Frontend
WORDPRESS_API_URL=https://cms.example.com/wp-json \
NEXT_PUBLIC_WORDPRESS_URL=https://cms.example.com \
npm run build

rsync -az --delete out/ user@server:/var/www/aiaiai.example.com/
```

### ขั้นตอนที่ 5: ตั้ง Auto-Deploy (Webhook)

```bash
# ติดตั้ง pm2
npm install -g pm2

# Start webhook listener (port 9001)
cd web-aiaiai
WEBHOOK_PORT=9001 pm2 start webhook.js --name aiaiai-webhook
pm2 save
```

แก้ `rebuild.sh` ให้ตรงกับ path ของ server:

```bash
DEPLOY_HOST="your-deploy-ssh-host"
STATIC_SITE_ROOT="/var/www/aiaiai.example.com"
```

### Setup Checklist

- [ ] WordPress + MySQL ติดตั้งแล้ว
- [ ] JetEngine Pro + RankMath activate แล้ว
- [ ] mu-plugins copy แล้ว (6 ไฟล์)
- [ ] Images upload แล้ว (`upload-images.php`)
- [ ] JetEngine meta boxes สร้างแล้ว (`seed-all-jetengine.php`)
- [ ] Page content seed แล้ว (`seed-content.sh`)
- [ ] URLs แก้แล้ว (`fix-urls.php`)
- [ ] Nginx + SSL ทั้ง 2 domains
- [ ] Webhook (pm2) รันอยู่ port 9001
- [ ] Frontend build และ deploy แล้ว
- [ ] Deploy button ใน WP Admin ทำงาน

---

## Deploy: Vercel (แนะนำ — ง่ายที่สุด)

ใช้ Vercel สำหรับ frontend แทน self-hosted ไม่ต้องจัดการ server, webhook, pm2

### ขั้นตอน

1. เข้า [vercel.com](https://vercel.com) → New Project → Import repo นี้
2. ตั้งค่า: **Root Directory**: `Frontend`, **Output Directory**: `out`
3. ตั้ง Environment Variables:

| Key | Value |
|-----|-------|
| `WORDPRESS_API_URL` | `https://cms.example.com/wp-json` |
| `NEXT_PUBLIC_WORDPRESS_URL` | `https://cms.example.com` |

4. Vercel Dashboard → Settings → Git → **Deploy Hooks** → สร้าง hook สำหรับ branch `main`
5. Copy hook URL ใส่ใน `wp-config.php`:

```php
define('AIAIAI_WEBHOOK_URL', 'https://api.vercel.com/v1/integrations/deploy/xxx');
```

**ผลลัพธ์**: แก้ code → `git push` → auto deploy / แก้ content ใน WP → กด Deploy Site → Vercel rebuild

---

## Deploy ประจำวัน

| ใคร | ทำอะไร | วิธี |
|-----|--------|------|
| ลูกค้า | แก้ content ใน WP | กด **Deploy Site** ใน WP Admin |
| Developer | แก้ code | `git push` → กด **Deploy Site** |
| Developer | sync content จาก production | `bash wordpress/export-content.sh` → commit → push |
