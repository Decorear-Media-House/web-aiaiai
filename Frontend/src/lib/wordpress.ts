const WP_API_URL =
  process.env.WORDPRESS_API_URL || "http://localhost:8080/wp-json";
const WP_BASE_URL =
  process.env.WORDPRESS_BASE_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "http://localhost:8080";

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
      next: { revalidate: 60 },
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

export async function getRankMathSEO(slug: string): Promise<RankMathSEO | null> {
  try {
    const res = await fetch(`${WP_BASE_URL}/${slug}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const html = await res.text();

    const getMeta = (attr: string, value: string): string => {
      const regex = new RegExp(
        `<meta[^>]*${attr}=["']${value}["'][^>]*content=["']([^"']*)["']`,
        "i"
      );
      const match = html.match(regex);
      if (match) return match[1];
      // Try reversed order (content before name/property)
      const regex2 = new RegExp(
        `<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${value}["']`,
        "i"
      );
      const match2 = html.match(regex2);
      return match2?.[1] ?? "";
    };

    return {
      title: getMeta("property", "og:title") || getMeta("name", "title"),
      description: getMeta("name", "description"),
      robots: getMeta("name", "robots"),
      ogTitle: getMeta("property", "og:title"),
      ogDescription: getMeta("property", "og:description"),
      ogImage: getMeta("property", "og:image"),
      ogType: getMeta("property", "og:type"),
      twitterCard: getMeta("name", "twitter:card"),
      twitterTitle: getMeta("name", "twitter:title"),
      twitterDescription: getMeta("name", "twitter:description"),
      twitterImage: getMeta("name", "twitter:image"),
    };
  } catch {
    return null;
  }
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
