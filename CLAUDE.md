# AIAIAI Website Project

## Overview
Next.js 16 website with WordPress as headless CMS. Clients edit all text, images, and colors via a custom WordPress admin ("AIAIAI Content Editor"). Every page must match the Figma design for desktop (1440px) and mobile (375px).

## Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Framer Motion
- **CMS**: WordPress 6 (headless, REST API only)
- **Database**: MySQL 8.0
- **Infra**: Docker Compose (3 services)

## Running Locally
```bash
docker compose up -d
# Frontend: http://localhost:3050
# WordPress Admin: http://localhost:8080/wp-admin
# Default WP credentials: set during first setup
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
    └── wordpress.ts  # WP API helpers, image URL conversion

wordpress/
├── mu-plugins/
│   ├── aiaiai-content-api.php  # Content editor admin UI + REST API
│   └── aiaiai-security.php     # Security hardening, SVG uploads
├── seed-content.sh             # Initial content seeding (run once)
└── export-content.sh           # Export WP content back to seed file
```

## Key Conventions

### WordPress Content Model
- Each page stores content in `page_sections` post meta as JSON
- Sections are keyed objects (e.g., `hero`, `mission`, `outcomes`)
- Fetch with `getPageContent(slug)` or `getPageSection(pageSlug, sectionKey)`
- All fetches use `cache: "no-store"` for immediate updates

### Image Handling
- **All images served from WordPress Media Library**, not local `/public/images/`
- Use `wpImageUrl(url)` to convert Docker internal URLs → public URLs
- Use `<picture>` element with `<source>` for desktop/mobile image variants
- WordPress fields: `*_image` for desktop, `*_mobile_image` for mobile
- Next.js `<Image>` requires `unoptimized` prop for WordPress URLs (blocks private IPs)

### Responsive Design
- Desktop: 1440px, Mobile: 375px (match Figma exactly)
- Tailwind breakpoints: `max-sm:` for mobile overrides, `max-lg:` for tablet
- Mobile images use separate WordPress fields when design differs

### Styling
- Font: `var(--font-faculty-glyphic), sans-serif`
- Background colors editable via WordPress color picker
- Gradient text: `backgroundImage` + `WebkitBackgroundClip: "text"` + `WebkitTextFillColor: "transparent"`
- Glass effect: `backdrop-filter: blur(16px)` with rgba backgrounds

### SEO (RankMath)
- **RankMath plugin** must be installed on WordPress for SEO management
- SEO data (title, description, OG image, schema) is managed per page in WordPress editor
- `getRankMathSEO(slug)` fetches via RankMath REST API (`/rankmath/v1/getHead`), falls back to HTML scraping
- `getPageSEO(wpSlug, fallbackTitle, fallbackDesc)` generates Next.js Metadata with RankMath data + fallbacks
- All pages use dynamic `generateMetadata()` — no static `export const metadata`
- Security plugin allows `/rankmath/v1/` endpoints publicly

### Content Seeding
- `seed-content.sh` uses `seed_if_empty()` — only seeds if page has no content
- `export-content.sh` exports current WP data back to seed file for git tracking
- Run seed only once for initial setup; after that, edit via WP admin

## Commands
```bash
# Start all services
docker compose up -d

# Seed initial content (first time only)
docker cp wordpress/seed-content.sh aiaiai-wordpress:/tmp/
docker exec aiaiai-wordpress bash /tmp/seed-content.sh

# Export WP content to seed file
bash wordpress/export-content.sh

# Frontend dev (outside Docker)
cd Frontend && npm run dev

# WP-CLI commands
docker exec aiaiai-wordpress wp --allow-root [command]
```

## Pages
| Page | Slug | Route |
|------|------|-------|
| Home | home | / |
| About Us | about | /about |
| Services | services | /services |
| AI Solution Partner | partner | /services/partner |
| AI Humanoid Robotics | humanoid | /services/humanoid |
| AI Security Guard | security | /services/security |
| Blog | - | /blog |
