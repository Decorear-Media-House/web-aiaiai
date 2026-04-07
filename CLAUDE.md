# AIAIAI Website Project

## Overview
Next.js 16 static site with WordPress + JetEngine as headless CMS. Clients edit all text, images, and colors via JetEngine meta boxes in WordPress. Content changes go live after clicking "Deploy" button. Every page must match the Figma design for desktop (1440px) and mobile (375px).

## Stack
- **Frontend**: Next.js 16 (App Router, static export), React 19, Tailwind CSS 4, Framer Motion
- **CMS**: WordPress 6 + JetEngine Pro (headless, REST API only)
- **SEO**: RankMath plugin
- **Hosting**: CloudPanel (AWS Lightsail Singapore)
- **CDN**: Cloudflare

## Architecture
```
Content Editor → WordPress CMS (aiaiai-cms.decorear.com)
                        ↓ click Deploy
              Webhook Listener (:9000)
                        ↓
              rebuild.sh → git pull → npm run build → rsync to nginx
                        ↓
              Static Site (aiaiai.decorear.com) → Cloudflare → Visitors
```

## Running Locally
```bash
# WordPress (Docker)
docker compose up -d
# WordPress Admin: http://localhost:8080/wp-admin

# Frontend dev
cd Frontend && npm run dev
# Frontend: http://localhost:3000

# Build static export
cd Frontend && npm run build
# Output: Frontend/out/
```

## Project Structure
```
Frontend/src/
├── app/              # Pages (home, about, services/*, blog)
├── components/
│   ├── sections/     # Page sections (home/, about/, services/, etc.)
│   ├── layouts/      # Container, Footer, Navbar
│   └── animations/   # FadeUp scroll animation wrapper
└── lib/
    └── wordpress.ts  # WP API helpers, getPageMeta(), image URL conversion

wordpress/
├── mu-plugins/
│   ├── aiaiai-content-api.php    # Deploy button + page creation + REST API meta
│   ├── aiaiai-jetengine-fields.php # JetEngine meta box field definitions
│   └── aiaiai-security.php       # Security hardening, SVG/WebP uploads
webhook.js                        # Webhook listener (port 9000)
rebuild.sh                        # Static site rebuild script
deploy.sh                         # Initial deployment script
```

## Key Conventions

### WordPress Content Model (JetEngine)
- Each page has JetEngine meta boxes with fields per section
- Field naming: `{page_prefix}_{section}_{field}` (e.g., `sec_hero_heading`)
- Prefixes: home=`home_`, about=`about_`, services=`svc_`, security=`sec_`, humanoid=`hum_`, partner=`ptr_`
- Repeater fields for arrays (stats, cards, accordion items)
- Textarea with newline separation for nested lists (checks, items)
- Fetch with `getPageMeta(slug)` → returns flat meta object
- Helpers: `ensureArray()` for repeaters, `textareaToArray()` for newline-separated fields
- Legacy fallback: if `_legacy` flag is set, uses old `page_sections` JSON format

### Image Handling
- **All images served from WordPress Media Library**
- Use `wpImageUrl(url)` to convert internal URLs → public URLs
- Desktop/mobile image switching via CSS `hidden`/`max-sm:block`
- WordPress supports SVG and WebP uploads

### Responsive Design
- Desktop: 1440px, Mobile: 375px (match Figma exactly)
- Tailwind breakpoints: `max-sm:` for mobile overrides
- Use `!important` variants (`max-sm:!h-[200px]`) to override inline styles

### SEO (RankMath)
- RankMath plugin manages SEO per page in WordPress editor
- `getRankMathSEO(slug)` fetches via REST API page meta
- `getPageSEO()` generates Next.js Metadata with RankMath + fallbacks
- All pages use `generateMetadata()` for SEO

### Static Export
- `output: "export"` in next.config.ts
- `trailingSlash: true` for static hosting
- `images.unoptimized: true` (no image optimization server)
- Blog posts use `generateStaticParams()` for static generation
- Rebuild triggered by WordPress Deploy button → webhook → rebuild.sh

## Commands
```bash
# Local development
docker compose up -d          # Start WordPress
cd Frontend && npm run dev    # Start dev server

# Production deploy (first time)
bash deploy.sh

# Manual rebuild on server
bash rebuild.sh
```

## Pages
| Page | Slug | Route | Meta Prefix |
|------|------|-------|-------------|
| Home | home | / | home_ |
| About Us | about | /about | about_ |
| Services | services | /services | svc_ |
| AI Solution Partner | partner | /services/partner | ptr_ |
| AI Humanoid Robotics | humanoid | /services/humanoid | hum_ |
| AI Security Guard | security | /services/security | sec_ |
| Blog | - | /blog | - |
