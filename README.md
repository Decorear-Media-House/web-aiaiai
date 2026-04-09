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
- **Hosting**: CloudPanel (AWS Lightsail Singapore) + Cloudflare CDN

### Development

```bash
docker compose up -d                  # Start local WordPress (localhost:8080)
cd Frontend && npm run dev            # Start dev server (localhost:3000)
```

### Deploy

```
                       ┌─────────────────────────────────────────┐
                       │  bash deploy.sh          Quick deploy   │
                       │  bash deploy.sh --full   Full deploy    │
                       │  bash deploy.sh --sync   Sync WP meta   │
                       └─────────────────────────────────────────┘
```

| Command | สิ่งที่ทำ | ใช้เมื่อ |
|---------|----------|---------|
| `bash deploy.sh` | push code + mu-plugins + build + deploy | แก้ code frontend |
| `bash deploy.sh --full` | + images + WP content + JetEngine + fix URLs | ครั้งแรก / เพิ่มรูป / sync ทุกอย่าง |
| `bash deploy.sh --sync` | export local WP meta → commit → push | แก้ content ใน local WP แล้วอยากขึ้น production |

**Windows (PowerShell):**
```powershell
& "C:\Program Files\Git\bin\bash.exe" deploy.sh
& "C:\Program Files\Git\bin\bash.exe" deploy.sh --full
```

### WP Meta Sync (Local → Production)

เมื่อแก้ content ใน local WordPress แล้วอยากให้ production อัพเดทตาม:

```bash
python export-wp.py        # Export local WP meta → wordpress/wp-meta-sync.json
git add . && git push       # Push ขึ้น GitHub
# Server จะ import wp-meta-sync.json อัตโนมัติตอน rebuild
```

### Architecture

```
Content Editor → WordPress CMS (aiaiai-cms.decorear.com)
                        ↓ กด Deploy Site
               Webhook (:9000) → rebuild.sh
                        ↓
               git pull → import meta → npm run build → rsync to nginx
                        ↓
               Static Site (aiaiai.decorear.com) → Cloudflare → Visitors
```

### Project Structure

```
Frontend/src/
├── app/                    # Pages (routes)
├── components/sections/    # Page sections (per page)
├── components/layouts/     # Navbar, Footer, Container
└── lib/wordpress.ts        # WP API helpers

wordpress/
├── mu-plugins/             # Auto-loaded WP plugins (deploy button, API, security)
├── seed-all-jetengine.php  # Create JetEngine meta boxes
├── import-data.php         # Import content to WP
├── export-data.json        # Exported WP content
├── fix-urls.php            # Fix localhost → production URLs
└── upload-images.php       # Import images to WP Media Library

deploy.sh                   # Deploy script (quick / --full / --sync)
rebuild.sh                  # Server-side rebuild (used by webhook)
webhook.js                  # Webhook listener (port 9000)
export-wp.py                # Export local WP meta to JSON
```

### SSH Access

```bash
ssh aiaiai-deploy           # Frontend server
ssh aiaiai-cms              # WordPress server
```

SSH config: `~/.ssh/config` (key: `~/.ssh/id_aiaiai`)

### Deploy ไปยัง Server ใหม่

ใช้ `bash deploy.sh --full` ซึ่งจะทำทุกขั้นตอนให้:
1. Push code → GitHub
2. Upload mu-plugins + images → CMS
3. Import content + JetEngine meta boxes
4. Fix URLs → Build → Deploy

**ก่อน deploy ครั้งแรก** ต้องเตรียม:
- Server: Ubuntu 22+, Nginx, PHP, MySQL, Node.js 20+, WP-CLI
- WordPress ติดตั้ง + JetEngine Pro + RankMath
- SSH config สำหรับ `aiaiai-cms` และ `aiaiai-deploy` hosts
- แก้ domain/path ใน `deploy.sh`, `rebuild.sh`, `.env.production`

### JetEngine Meta Field Naming

```
{prefix}_{section}_{field}

home_    → Home        about_   → About
svc_     → Services    sec_     → Security
hum_     → Humanoid    ptr_     → Partner
```
