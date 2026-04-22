# สรุปการแก้ feedback จาก `comments.md`

Branch: `main` · Commit range: `0b9cc67..2a554aa` (6 commits ในรอบนี้) + 2 commits ก่อนหน้า (CRLF + JetEngine bootstrap)

## Status ต่อทั้ง 13 ข้อ

| # | Feedback | สถานะ | ที่ไหน |
|---|---|---|---|
| 1 | README ไม่ตรงกับ code จริง | แก้แล้ว | `2a554aa` — Headless split callout, Deterministic fresh-install checklist, WP-CLI access section, Sync Content section ปรับให้ชี้ SSH-on-prod (mount `/seed` เป็น `:ro`) |
| 2 | `.sh` CRLF line ending | แก้แล้ว | `6ff3095` ก่อนหน้า (`.gitattributes`) |
| 3 | Docker image ไม่มี WP-CLI | แก้แล้ว | `2a554aa` — `wp.sh` wrapper รัน WP-CLI ใน throwaway `wordpress:cli` container + README ระบุชัดว่า `docker exec aiaiai-wordpress wp …` ใช้ไม่ได้ |
| 4 | Content ยัง hardcode มากเกิน | **Deferred** | Scope ใหญ่ (`seed-content.sh` JSON-driven = milestone-sized). Sync mechanism ที่ลูกค้าขอ (`wp-meta-sync.json` / `export-data.json`) มีครบแล้ว ส่วน `seed-content.sh` เป็น hardcoded fallback |
| 5 | JetEngine setup ไม่ครบ | แก้แล้ว | `626f93b` / `22046b4` / `9a63acd` ก่อนหน้า |
| 6 | Media assets ไม่ครบ | แก้แล้ว (diagnostic + root cause) | **Root cause จริง**: `wp_upload_bits()` → `wp_unique_filename()` auto-rename `*-scaled.webp` เป็น `*-scaled-1.webp` ทำให้ 5 ไฟล์ 404 ทั้งชุด — แก้ด้วย direct `copy()` + `wp_insert_attachment` (`effe92f`) / `verify-media.php` scan report missing refs เป็น init step 10b แบบ non-fatal (`c558505`) / rename 2 ไฟล์ + เพิ่ม 6 SVG ใน `wordpress/uploads/` ให้ filenames ตรง metadata |
| 7 | Featured images ไม่ผูก `_thumbnail_id` | แก้แล้ว | `741d0da` — `seed-blog.php` + `import-data.php` match basename เข้า Media Library แล้ว `set_post_thumbnail()`; 4/4 sample posts มี thumbnail หลัง fresh install |
| 8 | WP options ไม่ export ครบ | แก้แล้ว | `741d0da` — `export-data.php` `_options` block (permalink, `custom_logo` portable via basename, `theme_mods` remap stylesheet, `rank-math-options-*`) + `import-options.php`; license keys ใน denylist ไม่ไหลเข้า git |
| 9 | Rank Math config ไม่ส่งมา | แก้แล้ว | `741d0da` — per-post meta (`rank_math_title/description/…`) ทั้ง pages (ผ่าน `build-wp-meta-sync.php`) และ posts (`export-data.php` + `seed-blog.php`); site options `rank-math-options-*` ผ่าน `import-options.php` |
| 10 | White Label CMS | Skipped | ตามคำสั่ง |
| 11 | Local WP vs Headless ไม่ชัด | แก้แล้ว | `2a554aa` — README Headless split callout |
| 12 | Frontend build-time CMS URL | แก้แล้ว | `4ca2cff` — `WORDPRESS_BUILD_API_URL` ARG แยกจาก `NEXT_PUBLIC_WORDPRESS_URL`; `docker-compose.yml` ชี้ internal hostname, prod fallback = public `/wp-json` |
| 13 | Production/EC2 deterministic | แก้แล้ว | `2a554aa` — Deterministic fresh-install checklist 6 ขั้น พร้อม smoke-test curl |

## Refactor + bonus finding จาก deep-dive

- `wordpress/seed-helpers.php` (`0b9cc67`) — 3 shared helpers (`aiaiai_attachment_id_by_basename`, `aiaiai_rankmath_meta_keys`, `aiaiai_find_seed_file`) ลบ duplication ข้าม 5 scripts
- **Bug**: `rank-math-options-*` เก็บใน DB ด้วยยัติภังค์ ไม่ใช่ขีดล่าง — code เดิมของเรา (`rank_math_options_general` ฯลฯ) ทำให้ `get_option()` คืน `false` ตัวกรอง drop ทิ้งทุก key → settings ของ Rank Math ไม่เคยถูก export เลย (แก้ใน `741d0da`)
- **Security**: `rank_math_license_code` / `rank_math_license_data` / `rank-math-pro-registration` อยู่ในรายการ skip ของ `import-options.php` ป้องกัน license keys ของลูกค้าไหลเข้า JSON → git

## Validation (fresh Docker state, wipe + `./bootstrap.sh`)

- Init flow: 13 steps ผ่านครบรวม step ใหม่ 7b (seed-blog), 9b (import-options), 10b (verify-media)
- REST API: 6 AIAIAI pages + 4 blog posts มี thumbnail + `rank_math_title` ครบ
- WP options restored: `permalink_structure` = `/%postname%/`, `rank_math_modules` array ครบ 12 modules
- Frontend 404 audit 7 pages (`/`, `/about`, `/services`, `/services/security`, `/services/humanoid`, `/services/partner`, `/blog`) หลัง ISR warm: **0 broken images**
- `verify-media`: 20 → 12 missing (12 ที่เหลือเป็น `problem-card-*`, `blog-card-*`, `blog-featured`, `WeWork` — ไม่กระทบ frontend เพราะมี `/images/` fallback ใน Next.js เอง)

## Known limits / รอ prod sync

- 12 image basenames ที่ `verify-media` ยังแฟลก — ต้องได้ไฟล์จริงจาก prod (blog cards, problem cards, WeWork logo)
- `import-options.php` จะ exercise round-trip เต็มก็ต่อเมื่อ prod sync ครั้งถัดไปนำ `_options` block กลับมาใน `export-data.json` — ปัจจุบัน graceful-skip เพราะ JSON ที่ commit ไว้ถูก generate ด้วย `export-data.php` เวอร์ชันเก่าก่อน schema `_options`
- ข้อ 4 (hardcoded `seed-content.sh`) รอ milestone ถัดไป

## Commits

```
2a554aa  Add wp.sh wrapper and document WP-CLI, headless split, EC2 checklist
4ca2cff  Split Next.js build-time WordPress API URL from the public URL
c558505  Report missing media references at the tail of init.sh
effe92f  Fix wp_upload_bits rename and align uploads/ filenames with metadata
741d0da  Carry featured images, WP options, and Rank Math SEO through fresh install
0b9cc67  Add wordpress/seed-helpers.php for shared seed-script utilities
```
