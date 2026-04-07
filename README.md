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

ไม่ว่าจะแก้ code, content, หรือทั้ง 2 — รันคำสั่งเดียว:

```bash
bash deploy.sh
```

สิ่งที่ script ทำ:
1. Push code → GitHub
2. อัพเดท mu-plugins → WordPress CMS
3. Build static site (ดึง content ล่าสุดจาก WordPress)
4. Upload → aiaiai.decorear.com

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
│   └── aiaiai-security.php         # Security + file uploads
├── seed-all-jetengine.php          # Seed all JetEngine data
webhook.js                          # Webhook listener (:9000)
rebuild.sh                          # Static site rebuild
deploy.sh                           # Initial deploy script
```

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
