# AIAIAI Website

เว็บไซต์ AI-AI-AI Co., Ltd. — Static site + WordPress headless CMS

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
- **Frontend**: Next.js 16, React 19, Tailwind CSS 4, Framer Motion
- **CMS**: WordPress 6 + JetEngine Pro + RankMath
- **Hosting**: CloudPanel (AWS Lightsail) หรือ Vercel + Cloudflare CDN

### Development

```bash
docker compose up -d                  # Start local WordPress (localhost:8080)
cd Frontend && npm run dev            # Start dev server (localhost:3000)
```

### Architecture

```
Content Editor → WordPress CMS
                      ↓ กด Deploy Site
                 AJAX → PHP → webhook (:9001) → rebuild.sh
                      ↓
                 git pull → copy mu-plugins → npm run build → rsync to nginx
                      ↓
                 Static Site → Cloudflare → Visitors
```

### Project Structure

```
Frontend/src/
├── app/                    # Pages (routes)
├── components/sections/    # Page sections (per page)
├── components/layouts/     # Navbar, Footer, Container
└── lib/wordpress.ts        # WP API helpers

wordpress/
├── mu-plugins/             # Auto-loaded WP plugins
│   ├── aiaiai-content-api.php      # Deploy button + page creation + REST API
│   ├── aiaiai-jetengine-fields.php # JetEngine meta registration
│   ├── aiaiai-security.php         # Security + SVG/WebP upload
│   ├── aiaiai-decorear-tools.php   # Tracking Tags + Backup + Email Settings
│   ├── aiaiai-contact-form.php     # Contact form REST API + SMTP
│   └── aiaiai-jetengine-fix-ids.php # Auto-fix meta box IDs per environment
├── seed-all-jetengine.php  # Create JetEngine meta boxes + seed data
├── import-data.php         # Import content to WP
├── export-data.json        # Exported WP content
├── fix-urls.php            # Fix localhost → production URLs
└── upload-images.php       # Import images to WP Media Library

deploy.sh                   # Deploy script (quick / --full / --sync)
rebuild.sh                  # Server-side rebuild (used by webhook)
webhook.js                  # Webhook listener (port 9001)
export-wp.py                # Export local WP meta to JSON
```

---

## Deploy: Vercel (แนะนำ — ง่ายที่สุด)

ใช้ Vercel แทน self-hosted server สำหรับ frontend ไม่ต้องจัดการ server, webhook, pm2

### ขั้นตอน

#### 1. Connect GitHub → Vercel

1. เข้า [vercel.com](https://vercel.com) → New Project → Import GitHub repo
2. ตั้งค่า:
   - **Framework Preset**: Next.js
   - **Root Directory**: `Frontend`
   - **Build Command**: `next build`
   - **Output Directory**: `out`

#### 2. ตั้ง Environment Variables

ใน Vercel Dashboard → Settings → Environment Variables:

| Key | Value |
|-----|-------|
| `WORDPRESS_API_URL` | `https://your-cms-domain.com/wp-json` |
| `NEXT_PUBLIC_WORDPRESS_URL` | `https://your-cms-domain.com` |

#### 3. สร้าง Deploy Hook

1. Vercel Dashboard → Settings → Git → **Deploy Hooks**
2. สร้าง hook ชื่อ "WordPress Deploy" → branch: `main`
3. Copy URL ที่ได้ (เช่น `https://api.vercel.com/v1/integrations/deploy/xxx`)

#### 4. ตั้ง Deploy Hook ใน WordPress

เพิ่มใน `wp-config.php` ของ production WordPress:
```php
define('AIAIAI_WEBHOOK_URL', 'https://api.vercel.com/v1/integrations/deploy/xxx');
```

#### 5. เสร็จ!

- **แก้ code** → `git push` → Vercel auto-deploy
- **แก้ content ใน WP** → กด Deploy Site → Vercel rebuild
- ไม่ต้องมี webhook.js, pm2, rebuild.sh

### WordPress CMS ไว้ที่ไหน?

Vercel host แค่ frontend — WordPress ยังต้อง host แยก:
- **ง่ายสุด**: [WordPress.com Business](https://wordpress.com) หรือ managed WP hosting
- **ถูกสุด**: VPS (DigitalOcean, Lightsail) + Docker หรือ CloudPanel
- **ต้องการ**: PHP 8+, MySQL 8+, JetEngine Pro plugin, RankMath plugin

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

### ขั้นตอนที่ 2: Deploy mu-plugins + Content

จาก local machine รัน:
```bash
bash deploy.sh --full
```

สิ่งที่ script ทำ:
1. Push code → GitHub
2. Copy mu-plugins → CMS server
3. Upload images → WP Media Library
4. Import content + JetEngine meta boxes
5. Fix URLs (localhost → production)
6. Build static site → deploy

**ก่อนรัน** ต้องแก้ค่าใน `deploy.sh`:
```bash
CMS_HOST="your-cms-ssh-host"        # SSH host ของ WordPress
CMS_ROOT="~/path/to/wordpress"       # WordPress root path
DEPLOY_HOST="your-deploy-ssh-host"   # SSH host ของ frontend server
DEPLOY_ROOT="~/path/to/static-site"  # Nginx root path
PROD_WP_URL="https://cms.example.com"
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
# Enable + SSL
sudo ln -s /etc/nginx/sites-available/cms.example.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/aiaiai.example.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d cms.example.com -d aiaiai.example.com
```

### ขั้นตอนที่ 4: ตั้ง Auto-Deploy (Webhook)

บน CMS server:
```bash
# Clone repo
cd ~ && git clone https://github.com/YOUR_USER/web-aiaiai.git
cd web-aiaiai/Frontend && npm install

# ติดตั้ง pm2
mkdir -p ~/.npm-global && npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g pm2

# Start webhook (port 9001)
cd ~/web-aiaiai
WEBHOOK_PORT=9001 pm2 start webhook.js --name aiaiai-webhook
pm2 save
```

แก้ `rebuild.sh` ให้ตรงกับ path ของ server:
```bash
DEPLOY_HOST="your-deploy-ssh-host"
STATIC_SITE_ROOT="/var/www/aiaiai.example.com"
```

### ขั้นตอนที่ 5: ตั้ง SSH (local → server)

เพิ่มใน `~/.ssh/config`:
```
Host your-cms-ssh-host
  HostName YOUR_SERVER_IP
  User YOUR_USER
  IdentityFile ~/.ssh/YOUR_KEY

Host your-deploy-ssh-host
  HostName YOUR_SERVER_IP
  User YOUR_USER
  IdentityFile ~/.ssh/YOUR_KEY
```

### ขั้นตอนที่ 6: ทดสอบ

```bash
# WordPress ทำงาน
curl -s https://cms.example.com/wp-json/wp/v2/pages?slug=home | head -c 100

# Static site ทำงาน
curl -s -o /dev/null -w "%{http_code}" https://aiaiai.example.com/

# Webhook ทำงาน (SSH เข้า server แล้วรัน)
curl -s http://127.0.0.1:9001/health
# ควรได้: {"ok":true,"building":false}

# ทดสอบ Deploy button
# เข้า WP Admin → กด Deploy Site → ดู modal progress
```

### Checklist

- [ ] WordPress + MySQL ติดตั้ง
- [ ] JetEngine Pro + RankMath activate
- [ ] mu-plugins copy แล้ว (6 ไฟล์)
- [ ] Content + images import แล้ว (`deploy.sh --full`)
- [ ] Nginx config + SSL ทั้ง 2 domains
- [ ] Webhook (pm2) รันอยู่ port 9001
- [ ] `.env.production` ชี้ไป CMS domain ใหม่
- [ ] Deploy button ใน WP Admin ทำงาน
- [ ] Static site เข้าได้

---

## Deploy ประจำวัน

| ใคร | ทำอะไร | วิธี |
|-----|--------|------|
| ลูกค้า | แก้ content ใน WP | กด **Deploy Site** ใน WP Admin |
| Developer | แก้ code | `git push` → กด **Deploy Site** |
| Developer | แก้ code + content ใน local WP | `python export-wp.py` → `git push` → กด **Deploy Site** |
| Developer (ครั้งแรก/sync ทุกอย่าง) | Full deploy | `bash deploy.sh --full` |

### JetEngine Meta Field Naming

```
{prefix}_{section}_{field}

home_    → Home        about_   → About
svc_     → Services    sec_     → Security
hum_     → Humanoid    ptr_     → Partner
```
