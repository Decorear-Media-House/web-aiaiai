# AIAIAI Website

เว็บไซต์ AI-AI-AI Co., Ltd. — Static site + WordPress headless CMS

## สถาปัตยกรรม

```
ลูกค้าแก้ content  →  WordPress CMS (aiaiai-cms.decorear.com)
                              ↓ กด Deploy Site
                     Webhook (:9000) → rebuild.sh
                              ↓
                     1. git pull
                     2. npm run build (ดึง content จาก WP)
                     3. rsync → nginx
                              ↓
                     Static Site (aiaiai.decorear.com)
                              ↓
                     Cloudflare CDN → ผู้เข้าชม
```

## วิธีแก้ไข Content

### 1. เข้า WordPress Admin
- URL: `https://aiaiai-cms.decorear.com/wp-admin/`
- Login ด้วย username/password ที่ได้รับ

### 2. แก้ไขเนื้อหา
- ไปที่ **Pages** → เลือกหน้าที่ต้องการแก้ (Home, About, Services, etc.)
- เลื่อนลง จะเห็น **Meta Boxes** สำหรับแต่ละ section
- แก้ไขข้อความ, อัพโหลดรูป, เปลี่ยนสี
- กด **Update** เพื่อบันทึก

### 3. Deploy ขึ้นเว็บ
- กดปุ่ม **🚀 Deploy Site** (แถบสีน้ำเงินด้านบนของ WP Admin)
- รอ 1-2 นาที ระบบจะ build และอัพเดทเว็บอัตโนมัติ
- เข้า `https://aiaiai.decorear.com` เพื่อตรวจสอบ

### 4. แก้ไข SEO
- ในหน้า Edit Page → เลื่อนลงไปที่ **Rank Math SEO**
- ตั้งค่า SEO Title, Meta Description, Open Graph Image
- กด Update แล้ว Deploy อีกครั้ง

## หน้าที่แก้ไขได้

| หน้า | ไปที่ | Meta Boxes |
|------|-------|-----------|
| หน้าแรก | Pages → Home | Hero, About, Problems, Services, Outcomes, Process, CTA, Contact |
| เกี่ยวกับเรา | Pages → About Us | Hero, Mission, Philosophy, Edge, Leadership, Team |
| บริการ | Pages → Services | Hero, Outcomes, Overview, Robotics, Security, AI Solution, Initiatives, Guidance |
| AI Security | Pages → AI Security Guard Solution | Hero, Outcomes, Included, Phases, CTA |
| Humanoid Robotics | Pages → AI-Enhanced Humanoid Robotics | Hero, Use Cases, Outcomes, Deliverables, CTA |
| AI Solution Partner | Pages → AI Solution Partner | Hero, Statement, Meaning, Outcomes, Phases, Deliverables, Engagement, Process, FAQ, CTA |
| บล็อก | Posts → Add New / Edit | เขียนบทความได้ตามปกติ |

## ประเภท Field ที่ใช้

| ประเภท | วิธีใช้ |
|--------|---------|
| **Text** | พิมพ์ข้อความบรรทัดเดียว |
| **Textarea** | พิมพ์ข้อความหลายบรรทัด |
| **Media** | กด Choose Media → เลือกรูปจาก Media Library หรืออัพโหลดใหม่ |
| **Color** | คลิกเลือกสีจาก color picker |
| **Repeater** | กด + เพื่อเพิ่มรายการ, ลากเพื่อเรียงลำดับ |

## สำหรับ Content ที่เป็นรายการ (Repeater)

เช่น Accordion items, Cards, Stats — ใช้ Repeater field:
- กด **+ Add Item** เพื่อเพิ่มรายการใหม่
- กด **×** เพื่อลบรายการ
- ลากเพื่อเรียงลำดับ

สำหรับ field ที่เป็น **Textarea แบบ 1 บรรทัด = 1 รายการ** เช่น Check items, Chips:
```
รายการที่ 1
รายการที่ 2
รายการที่ 3
```

## รูปภาพ

- **รองรับ**: JPG, PNG, WebP, SVG
- **แนะนำ**: WebP สำหรับรูปภาพทั่วไป (ขนาดเล็ก โหลดเร็ว)
- **Desktop/Mobile**: บาง field มีรูปแยกสำหรับ mobile — อัพโหลดทั้ง 2 ขนาด
- **ขนาดแนะนำ**: Desktop 1440px wide, Mobile 375px wide

## ข้อควรรู้

- ⚠️ แก้ content แล้ว **ต้องกด Deploy** ถึงจะเห็นบนเว็บจริง
- ⚠️ ระหว่าง Deploy (1-2 นาที) เว็บยังใช้งานได้ปกติ — จะอัพเดทเมื่อ build เสร็จ
- ✅ แก้ content กี่ครั้งก็ได้ แล้วค่อย Deploy ทีเดียว
- ✅ ถ้า Deploy ผิดพลาด เว็บเก่ายังอยู่ — ไม่พัง

---

## สำหรับ Developer

### Stack
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **CMS**: WordPress 6 + JetEngine Pro + RankMath
- **Hosting**: CloudPanel (AWS Lightsail Singapore)
- **CDN**: Cloudflare

### Development

```bash
# Start local WordPress
docker compose up -d
# WP Admin: http://localhost:8080/wp-admin

# Start frontend dev server
cd Frontend && npm run dev
# Frontend: http://localhost:3000
```

### Environment Variables

| File | ใช้เมื่อ |
|------|---------|
| `.env` | `npm run dev` (local) — ชี้ไป localhost:8080 |
| `.env.production` | `npm run build` (server) — ชี้ไป aiaiai-cms.decorear.com |

### Build Static Site (local test)

```bash
cd Frontend
NEXT_OUTPUT=export npm run build
# Output: Frontend/out/
```

### Deploy to Production

| แก้อะไร | สั่งอะไร | ใช้เวลา |
|---------|---------|---------|
| แก้ code frontend อย่างเดียว | `bash deploy.sh` | ~1 นาที |
| แก้ content ใน WP Admin อย่างเดียว | `bash deploy.sh` หรือกด Deploy ใน WP Admin (ถ้ามี webhook) | ~1 นาที |
| แก้ code + content + เพิ่มรูปใหม่ | `bash deploy-full.sh` | ~3-5 นาที |

#### `deploy.sh` — Quick Deploy (ใช้บ่อยสุด)

**macOS / Linux:**
```bash
bash deploy.sh
```

**Windows (PowerShell):**
```powershell
& "C:\Program Files\Git\bin\bash.exe" -c "cd 'C:/Users/DECR/Desktop/Git/DECR/web-aiaiai' && bash deploy.sh"
```

**Windows (Git Bash):** เปิด Git Bash จาก Start Menu แล้วรัน:
```bash
cd /c/Users/DECR/Desktop/Git/DECR/web-aiaiai
bash deploy.sh
```

> **หมายเหตุ Windows**: ห้ามใช้ `wsl` เพราะจะเข้า Docker Desktop WSL ซึ่งไม่มี bash — ต้องใช้ Git Bash เท่านั้น

สิ่งที่ script ทำ:
1. Push code → GitHub
2. อัพเดท mu-plugins → WordPress CMS
3. Build static site (ดึง content + tracking tags ล่าสุดจาก WordPress)
4. Upload → aiaiai.decorear.com

#### `deploy-full.sh` — Full Deploy (ครั้งแรก / เพิ่มรูป)

**macOS / Linux:**
```bash
bash deploy-full.sh
```

**Windows (PowerShell):**
```powershell
& "C:\Program Files\Git\bin\bash.exe" -c "cd 'C:/Users/DECR/Desktop/Git/DECR/web-aiaiai' && bash deploy-full.sh"
```
1. Push code → GitHub
2. อัพเดท mu-plugins → WordPress CMS
3. Upload รูปภาพ → WP Media Library
4. Export local WP data → JSON
5. Import content → production WP (แปลง URL อัตโนมัติ)
6. Seed JetEngine meta boxes
7. Fix URLs (localhost → production)
8. Build static site + deploy

### SSH Access

```bash
# Frontend server
ssh aiaiai-deploy

# WordPress server
ssh aiaiai-cms
```

SSH config อยู่ที่ `~/.ssh/config` (key: `~/.ssh/id_aiaiai`)

### Project Structure

```
Frontend/src/
├── app/                    # Pages
├── components/sections/    # Page sections (per page)
├── components/layouts/     # Navbar, Footer, Container
└── lib/wordpress.ts        # WP API, getPageMeta(), helpers

wordpress/
├── mu-plugins/
│   ├── aiaiai-content-api.php      # Deploy button + page creation
│   ├── aiaiai-jetengine-fields.php # REST API meta registration
│   ├── aiaiai-security.php         # Security + file uploads
│   └── aiaiai-decorear-tools.php   # Tracking Tags + Backup
├── seed-all-jetengine.php          # Seed all JetEngine data
├── export-data.php                 # Export WP content → JSON
├── import-data.php                 # Import JSON → WP (with URL fix)
├── upload-images.php               # Import images → WP Media Library
├── fix-urls.php                    # Replace localhost URLs → production
├── export-data.json                # Exported WP content data
webhook.js                          # Webhook listener (:9000)
rebuild.sh                          # Static site rebuild
deploy.sh                           # Quick deploy (code only)
deploy-full.sh                      # Full deploy (code + WP + images)
```

### Decorear Tools (Tracking Tags + Backup)

mu-plugin `aiaiai-decorear-tools.php` เพิ่ม 2 เมนูใน WP Admin → **Decorear Tools**:

#### Tracking Tags
- **WP Admin** → Decorear Tools → Tracking Tags
- ใส่แค่ ID ระบบจะสร้าง script ให้อัตโนมัติ:
  - Google Tag Manager (GTM-XXXXXXX)
  - Google Analytics 4 (G-XXXXXXXXXX)
  - Google Ads (AW-XXXXXXXXXX)
  - Meta/Facebook Pixel (123456789012345)
  - LINE Tag (UUID)
- Custom Scripts: วาง code จากทีมโฆษณาได้ (head, body open, body close)
- REST API: `GET /wp-json/aiaiai/v1/tracking-tags` → คืน scripts พร้อมใช้

#### Backup
- **WP Admin** → Decorear Tools → Backup
- กดปุ่ม **"สร้างแบ็คอัพใหม่"** → สำรอง Database + wp-content/uploads เป็น `.tar.gz`
- เก็บบน server สูงสุด 5 ไฟล์ (ไฟล์เก่าลบอัตโนมัติ)
- กู้คืน / ดาวน์โหลด / ลบ ได้จากหน้า Backup
- Backup directory: `/home/decorear-aiaiai-cms/backups/`

### JetEngine Meta Field Naming

```
{page_prefix}_{section}_{field}

Prefixes:
  home_    → Home page
  about_   → About page
  svc_     → Services page
  sec_     → Security page
  hum_     → Humanoid page
  ptr_     → Partner page
```

---

## Deploy ไปยัง Server ใหม่ (ละเอียด)

คู่มือสำหรับ deploy ทั้งระบบ (Frontend + WordPress CMS + รูปภาพ) ไปยัง server ใหม่ตั้งแต่ศูนย์

### สิ่งที่ต้องเตรียม

| รายการ | รายละเอียด |
|--------|-----------|
| **Server** | VPS/Cloud server (Ubuntu 22+), RAM 2GB+, Storage 20GB+ |
| **Domain 2 อัน** | 1 สำหรับ static site (เช่น `aiaiai.example.com`), 1 สำหรับ CMS (เช่น `cms.example.com`) |
| **SSH access** | สามารถ SSH เข้า server ได้ |
| **Local machine** | มี Node.js 20+, Docker, Git, SSH client |

### ขั้นตอนที่ 1: ตั้งค่า Server

#### 1.1 ติดตั้ง Software บน Server

```bash
# SSH เข้า server
ssh user@your-server-ip

# ติดตั้ง Nginx, PHP, MySQL, Node.js
sudo apt update && sudo apt install -y nginx mysql-server php php-fpm php-mysql php-xml php-mbstring php-curl php-zip php-gd php-intl unzip curl

# ติดตั้ง Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# ติดตั้ง WP-CLI
curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
chmod +x wp-cli.phar && sudo mv wp-cli.phar /usr/bin/wp
```

#### 1.2 สร้าง Database สำหรับ WordPress

```bash
sudo mysql -e "
  CREATE DATABASE aiaiai_wp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  CREATE USER 'aiaiai'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
  GRANT ALL PRIVILEGES ON aiaiai_wp.* TO 'aiaiai'@'localhost';
  FLUSH PRIVILEGES;
"
```

#### 1.3 สร้าง Directory Structure

```bash
# สำหรับ WordPress CMS
sudo mkdir -p /var/www/cms.example.com
sudo chown $USER:$USER /var/www/cms.example.com

# สำหรับ Static Site
sudo mkdir -p /var/www/aiaiai.example.com
sudo chown $USER:$USER /var/www/aiaiai.example.com
```

### ขั้นตอนที่ 2: ติดตั้ง WordPress CMS

#### 2.1 Download + Install WordPress

```bash
cd /var/www/cms.example.com
wp core download --allow-root
wp config create \
  --dbname=aiaiai_wp \
  --dbuser=aiaiai \
  --dbpass=YOUR_STRONG_PASSWORD \
  --dbhost=localhost \
  --allow-root

wp core install \
  --url=https://cms.example.com \
  --title="AIAIAI CMS" \
  --admin_user=admin \
  --admin_password=YOUR_ADMIN_PASSWORD \
  --admin_email=admin@example.com \
  --allow-root

# ตั้ง Permalink
wp rewrite structure '/%postname%/' --allow-root
```

#### 2.2 ติดตั้ง Plugins

```bash
# JetEngine Pro — ต้อง upload .zip ผ่าน WP Admin (เป็น premium plugin)
# หรือ copy จาก local:
# scp -r wordpress/plugins/jet-engine/ user@server:/var/www/cms.example.com/wp-content/plugins/

# RankMath (free)
wp plugin install seo-by-rank-math --activate --allow-root
```

#### 2.3 Deploy mu-plugins

จาก local machine:
```bash
# copy mu-plugins ไป server
scp wordpress/mu-plugins/*.php user@server:/var/www/cms.example.com/wp-content/mu-plugins/
```

mu-plugins จะ auto-load ไม่ต้อง activate:
- `aiaiai-content-api.php` — Deploy button + สร้างหน้าอัตโนมัติ + REST API
- `aiaiai-jetengine-fields.php` — Register JetEngine fields สำหรับ REST API
- `aiaiai-security.php` — Security hardening + อนุญาต SVG/WebP upload

### ขั้นตอนที่ 3: Import Content + รูปภาพ

#### 3.1 Upload รูปภาพจาก Docker volume

```bash
# [บน local machine] ดึงรูปจาก Docker volume
mkdir -p tmp-wp-uploads
docker run --rm \
  -v web-aiaiai_wp-content:/wp \
  -v $(pwd)/tmp-wp-uploads:/out \
  alpine sh -c "cp -r /wp/uploads/2026 /out/"

# Upload ไป server
scp -r tmp-wp-uploads/2026/ user@server:/var/www/cms.example.com/wp-content/uploads/

# ลบ temp
rm -rf tmp-wp-uploads
```

#### 3.2 Upload รูปจาก Frontend (fallback images)

```bash
# Upload รูปจาก Frontend/public/images/ ไป server
ssh user@server "mkdir -p /tmp/aiaiai-images"
scp -r Frontend/public/images/* user@server:/tmp/aiaiai-images/

# Import เข้า WP Media Library
scp wordpress/upload-images.php user@server:/tmp/upload-images.php
ssh user@server "cd /var/www/cms.example.com && wp --allow-root eval-file /tmp/upload-images.php"
```

#### 3.3 Import Content (Pages + JetEngine fields + Blog posts)

**สำคัญ:** แก้ URL ใน `wordpress/import-data.php` ให้ตรงกับ domain ใหม่ก่อน:
```php
// บรรทัด: $prod_url = 'https://aiaiai-cms.decorear.com';
// เปลี่ยนเป็น:
$prod_url = 'https://cms.example.com';
```

แล้ว run:
```bash
# Copy files ไป server
scp wordpress/export-data.json user@server:/tmp/export-data.json
scp wordpress/import-data.php user@server:/tmp/import-data.php

# สร้าง directory และ copy file
ssh user@server "mkdir -p /tmp/import-data-dir && \
  cp /tmp/export-data.json /tmp/import-data-dir/export-data.json && \
  cp /tmp/import-data.php /tmp/import-data-dir/import-data.php"

# Run import
ssh user@server "cd /var/www/cms.example.com && wp --allow-root eval-file /tmp/import-data-dir/import-data.php"
```

#### 3.4 สร้าง JetEngine Meta Boxes

```bash
scp wordpress/seed-all-jetengine.php user@server:/tmp/seed-all-jetengine.php
ssh user@server "cd /var/www/cms.example.com && wp --allow-root eval-file /tmp/seed-all-jetengine.php"
```

#### 3.5 Fix URLs (localhost → production domain)

**สำคัญ:** แก้ URL ใน `wordpress/fix-urls.php` ให้ตรงกับ domain ใหม่ก่อน:
```php
// บรรทัด: $replace = 'https://aiaiai-cms.decorear.com';
// เปลี่ยนเป็น:
$replace = 'https://cms.example.com';
```

แล้ว run:
```bash
scp wordpress/fix-urls.php user@server:/tmp/fix-urls.php
ssh user@server "cd /var/www/cms.example.com && wp --allow-root eval-file /tmp/fix-urls.php"
```

### ขั้นตอนที่ 4: ตั้งค่า Nginx

#### 4.1 WordPress CMS (cms.example.com)

```nginx
# /etc/nginx/sites-available/cms.example.com
server {
    listen 80;
    server_name cms.example.com;
    root /var/www/cms.example.com;
    index index.php;

    client_max_body_size 100M;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

#### 4.2 Static Frontend (aiaiai.example.com)

```nginx
# /etc/nginx/sites-available/aiaiai.example.com
server {
    listen 80;
    server_name aiaiai.example.com;
    root /var/www/aiaiai.example.com;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    location ~* \.(jpg|jpeg|png|gif|webp|svg|ico|css|js|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    error_page 404 /404.html;
}
```

#### 4.3 Enable Sites + SSL

```bash
sudo ln -s /etc/nginx/sites-available/cms.example.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/aiaiai.example.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL ด้วย Let's Encrypt
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d cms.example.com -d aiaiai.example.com
```

### ขั้นตอนที่ 5: ตั้งค่า Frontend Environment

#### 5.1 แก้ Environment Variables

สร้างไฟล์ `Frontend/.env.production` ใหม่:
```env
WORDPRESS_API_URL=https://cms.example.com/wp-json
NEXT_PUBLIC_WORDPRESS_URL=https://cms.example.com
NEXT_OUTPUT=export
```

### ขั้นตอนที่ 6: Build + Deploy Static Site

```bash
cd Frontend

# Build static site (ดึง content จาก production WP)
rm -rf .next out
NEXT_OUTPUT=export \
WORDPRESS_API_URL=https://cms.example.com/wp-json \
NEXT_PUBLIC_WORDPRESS_URL=https://cms.example.com \
npx next build

# Upload ไป server
scp -r out/* user@server:/var/www/aiaiai.example.com/
```

### ขั้นตอนที่ 7: ตั้งค่า Webhook (Auto-deploy เมื่อกด Deploy ใน WP)

#### 7.1 Deploy webhook + rebuild script

```bash
# Copy files ไป server
scp webhook.js user@server:~/webhook.js
scp rebuild.sh user@server:~/rebuild.sh

# SSH เข้า server แก้ path ใน rebuild.sh
ssh user@server
nano ~/rebuild.sh
# แก้ STATIC_SITE_ROOT="/var/www/aiaiai.example.com"
# แก้ SCRIPT_DIR ให้ตรงกับ path ของ repo บน server
```

#### 7.2 Clone repo บน server + ตั้ง pm2

```bash
# บน server
cd ~ && git clone https://github.com/YOUR_USER/web-aiaiai.git
cd web-aiaiai/Frontend && npm install

# ติดตั้ง pm2 + start webhook
sudo npm install -g pm2
pm2 start ~/webhook.js --name aiaiai-webhook
pm2 save && pm2 startup
```

#### 7.3 ตั้ง Webhook URL ใน WordPress

แก้ `wp-config.php` บน server:
```php
define('AIAIAI_WEBHOOK_URL', 'http://127.0.0.1:9000/rebuild');
```

หรือ mu-plugin จะใช้ `http://127.0.0.1:9000/rebuild` เป็น default

### ขั้นตอนที่ 8: ตั้งค่า SSH (สำหรับ deploy จาก local)

เพิ่มใน `~/.ssh/config` บน local machine:
```
Host my-aiaiai-deploy
  HostName YOUR_SERVER_IP
  User YOUR_USER
  IdentityFile ~/.ssh/YOUR_KEY
  IdentitiesOnly yes

Host my-aiaiai-cms
  HostName YOUR_SERVER_IP
  User YOUR_CMS_USER
  IdentityFile ~/.ssh/YOUR_KEY
  IdentitiesOnly yes
```

แก้ `deploy.sh` ให้ใช้ host ใหม่:
```bash
# เปลี่ยน aiaiai-deploy → my-aiaiai-deploy
# เปลี่ยน aiaiai-cms → my-aiaiai-cms
# เปลี่ยน URL ให้ตรงกับ domain ใหม่
```

### ขั้นตอนที่ 9: ตรวจสอบ

```bash
# ✅ WordPress CMS ทำงาน
curl -s https://cms.example.com/wp-json/wp/v2/pages?slug=home | head -c 100

# ✅ รูปภาพเข้าถึงได้
curl -s -o /dev/null -w "%{http_code}" https://cms.example.com/wp-content/uploads/2026/04/about-hero-bg.png

# ✅ Static site ทำงาน
curl -s -o /dev/null -w "%{http_code}" https://aiaiai.example.com/

# ✅ Webhook ทำงาน
curl -s http://YOUR_SERVER_IP:9000/health
```

### สรุป Checklist

- [ ] Server พร้อม (Nginx, PHP, MySQL, Node.js)
- [ ] WordPress ติดตั้ง + สร้าง DB
- [ ] JetEngine Pro plugin ติดตั้ง + activate
- [ ] RankMath plugin ติดตั้ง + activate
- [ ] mu-plugins 3 ไฟล์ copy ไปแล้ว
- [ ] รูปภาพ upload ไปแล้ว (Docker volume + Frontend/public/images)
- [ ] Content import แล้ว (export-data.json → import-data.php)
- [ ] JetEngine meta boxes สร้างแล้ว (seed-all-jetengine.php)
- [ ] URLs fix แล้ว (localhost → production domain)
- [ ] Nginx config ทั้ง 2 domains
- [ ] SSL certificates (Let's Encrypt)
- [ ] .env.production ชี้ไป CMS domain ใหม่
- [ ] Static site build + deploy แล้ว
- [ ] Webhook + rebuild.sh ทำงาน
- [ ] WP Admin เข้าได้ + กด Deploy ได้
