const WP_API_URL =
  process.env.WORDPRESS_API_URL || "http://localhost:8080/wp-json";
const WP_BASE_URL =
  process.env.WORDPRESS_BASE_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "http://localhost:8080";

const WP_PUBLIC_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8080";

/**
 * Check if an image URL is external (from WordPress uploads).
 * Used to set `unoptimized` on Next.js Image component.
 */
export function isExternalImage(url: string): boolean {
  return url.startsWith("http");
}

/**
 * Convert a WordPress media URL to a public-facing URL.
 * Inside Docker, WP returns URLs like http://aiaiai-wordpress:80/...
 * The browser needs http://localhost:8080/... instead.
 */
export function wpImageUrl(url: string): string {
  if (!url) return url;
  // Already a relative path like /images/foo.png — return as-is
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  // Replace internal Docker hostname with public URL
  return url
    .replace(/https?:\/\/aiaiai-wordpress(?::\d+)?/i, WP_PUBLIC_URL)
    .replace(/https?:\/\/localhost:8080/i, WP_PUBLIC_URL);
}

/* ------------------------------------------------------------------ */
/*  WordPress REST API types                                           */
/* ------------------------------------------------------------------ */

interface WPRendered {
  rendered: string;
}

interface WPMedia {
  source_url: string;
}

interface WPTerm {
  name: string;
  slug: string;
  taxonomy: string;
}

interface WPAuthor {
  name: string;
}

interface WPPost {
  id: number;
  slug: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  date: string;
  sticky: boolean;
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
    author?: WPAuthor[];
  };
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
}

/* ------------------------------------------------------------------ */
/*  WordPress Page types                                               */
/* ------------------------------------------------------------------ */

interface WPPage {
  id: number;
  slug: string;
  title: WPRendered;
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  meta: {
    page_sections?: string;
    page_hero_image?: string;
    page_og_image?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
  };
}

export interface PageContent {
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  sections: Record<string, unknown>;
}

/* ------------------------------------------------------------------ */
/*  Public BlogPost interface                                          */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  date: string;
  content: string;
  isFeatured: boolean;
}

export interface RankMathSEO {
  title: string;
  description: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

/* ------------------------------------------------------------------ */
/*  Mapper                                                             */
/* ------------------------------------------------------------------ */

function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function mapWPPostToBlogPost(post: WPPost): BlogPost {
  const allTerms = (post._embedded?.["wp:term"] ?? []).flat();
  const categories = allTerms.filter((t) => t.taxonomy === "category");
  const tags = allTerms.filter((t) => t.taxonomy === "post_tag");
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const author = post._embedded?.author?.[0];

  return {
    slug: post.slug,
    title: stripHTML(post.title.rendered),
    excerpt: stripHTML(post.excerpt.rendered),
    category: categories[0]?.name ?? "Uncategorized",
    tags: tags.map((t) => t.name),
    image: media?.source_url ?? "/images/blog/placeholder.jpg",
    author: author?.name ?? "AIAIAI Admin",
    date: formatDate(post.date),
    content: post.content.rendered,
    isFeatured: post.sticky,
  };
}

/* ------------------------------------------------------------------ */
/*  API functions                                                      */
/* ------------------------------------------------------------------ */

async function wpFetch<T>(endpoint: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${WP_API_URL}${endpoint}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`WP API error: ${res.status} ${endpoint}`);
    return res.json();
  } catch (error) {
    console.warn(`Failed to fetch WordPress endpoint: ${endpoint}`, error);
    return fallback;
  }
}

export async function getPosts(): Promise<BlogPost[]> {
  const posts = await wpFetch<WPPost[]>(
    "/wp/v2/posts?_embed&per_page=100&orderby=date&order=desc",
    []
  );
  return posts.map(mapWPPostToBlogPost);
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const posts = await wpFetch<WPPost[]>(
    "/wp/v2/posts?_embed&sticky=true&per_page=1",
    []
  );
  if (posts.length === 0) return null;
  return mapWPPostToBlogPost(posts[0]);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await wpFetch<WPPost[]>(
    `/wp/v2/posts?_embed&slug=${encodeURIComponent(slug)}`,
    []
  );
  if (posts.length === 0) return null;
  return mapWPPostToBlogPost(posts[0]);
}

export async function getCategories(): Promise<string[]> {
  const categories = await wpFetch<WPCategory[]>(
    "/wp/v2/categories?per_page=100",
    []
  );
  return ["All", ...categories.map((c) => c.name).filter((n) => n !== "Uncategorized")];
}

/**
 * Fetch SEO data from RankMath via WordPress REST API page/post meta.
 * RankMath stores SEO fields as post meta (rank_math_title, etc.)
 * which are exposed via REST API through registered meta fields.
 *
 * @param slug - WordPress page/post slug
 * @param type - "page" or "post" (default: "page")
 */
export async function getRankMathSEO(
  slug: string,
  type: "page" | "post" = "page"
): Promise<RankMathSEO | null> {
  try {
    const endpoint = type === "post" ? "/wp/v2/posts" : "/wp/v2/pages";
    const items = await wpFetch<Array<{ meta?: Record<string, string> }>>(
      `${endpoint}?slug=${encodeURIComponent(slug)}&_fields=meta`,
      []
    );
    if (items.length === 0) return null;

    const meta = items[0].meta ?? {};
    const hasData = meta.rank_math_title || meta.rank_math_description;
    if (!hasData) return null;

    return {
      title: meta.rank_math_title || "",
      description: meta.rank_math_description || "",
      robots: meta.rank_math_robots || "",
      ogTitle: meta.rank_math_facebook_title || meta.rank_math_title || "",
      ogDescription: meta.rank_math_facebook_description || meta.rank_math_description || "",
      ogImage: meta.rank_math_facebook_image || "",
      ogType: "website",
      twitterCard: meta.rank_math_twitter_card_type || "summary_large_image",
      twitterTitle: meta.rank_math_twitter_title || meta.rank_math_title || "",
      twitterDescription: meta.rank_math_twitter_description || meta.rank_math_description || "",
      twitterImage: "",
    };
  } catch {
    return null;
  }
}

/**
 * Generate Next.js Metadata for a WordPress page using RankMath SEO.
 * Use in generateMetadata() for each page.
 */
export async function getPageSEO(
  wpSlug: string,
  fallbackTitle: string,
  fallbackDescription: string
): Promise<import("next").Metadata> {
  const seo = await getRankMathSEO(wpSlug === "home" ? "" : wpSlug);

  return {
    title: seo?.title || fallbackTitle,
    description: seo?.description || fallbackDescription,
    robots: seo?.robots || undefined,
    openGraph: {
      title: seo?.ogTitle || fallbackTitle,
      description: seo?.ogDescription || fallbackDescription,
      type: (seo?.ogType as "website") || "website",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : [],
    },
    twitter: {
      card: (seo?.twitterCard as "summary_large_image") || "summary_large_image",
      title: seo?.twitterTitle || fallbackTitle,
      description: seo?.twitterDescription || fallbackDescription,
      images: seo?.twitterImage ? [seo.twitterImage] : [],
    },
  };
}

export async function getRelatedPosts(
  categorySlug: string,
  excludeSlug: string,
  limit = 3
): Promise<BlogPost[]> {
  const categories = await wpFetch<WPCategory[]>(
    `/wp/v2/categories?slug=${encodeURIComponent(categorySlug)}`,
    []
  );
  if (categories.length === 0) return [];

  const posts = await wpFetch<WPPost[]>(
    `/wp/v2/posts?_embed&categories=${categories[0].id}&per_page=${limit + 1}`,
    []
  );
  return posts
    .map(mapWPPostToBlogPost)
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, limit);
}

/* ------------------------------------------------------------------ */
/*  Page content (for editable pages via WordPress)                    */
/* ------------------------------------------------------------------ */

function mapWPPageToContent(page: WPPage): PageContent {
  const media = page._embedded?.["wp:featuredmedia"]?.[0];
  let sections: Record<string, unknown> = {};

  try {
    const raw = page.meta?.page_sections;
    if (raw) sections = JSON.parse(raw);
  } catch {
    // ignore parse errors
  }

  return {
    title: stripHTML(page.title.rendered),
    content: page.content.rendered,
    excerpt: stripHTML(page.excerpt.rendered),
    featuredImage: media?.source_url ?? page.meta?.page_hero_image ?? "",
    sections,
  };
}

export async function getPageContent(slug: string): Promise<PageContent | null> {
  const pages = await wpFetch<WPPage[]>(
    `/wp/v2/pages?_embed&slug=${encodeURIComponent(slug)}`,
    []
  );
  if (pages.length === 0) return null;
  return mapWPPageToContent(pages[0]);
}

/**
 * Get a specific section from a WordPress page.
 * Returns the section data or null if not found.
 */
export async function getPageSection<T = Record<string, unknown>>(
  pageSlug: string,
  sectionKey: string
): Promise<T | null> {
  const page = await getPageContent(pageSlug);
  if (!page) return null;
  const section = page.sections[sectionKey];
  return (section as T) ?? null;
}
