"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import Link from "next/link";
import type { BlogPost } from "@/lib/wordpress";

const font = "var(--font-faculty-glyphic), sans-serif";

const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#fff" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M5.334 1.333V4" stroke="#8099BE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.666 1.333V4" stroke="#8099BE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.667 2.667H3.333A1.333 1.333 0 002 4v9.333a1.333 1.333 0 001.333 1.334h9.334A1.333 1.333 0 0014 13.333V4a1.333 1.333 0 00-1.333-1.333z" stroke="#8099BE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 6.667h12" stroke="#8099BE" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function AiAvatar({ size = 20 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full shrink-0"
      style={{ width: size, height: size, backgroundImage: ROYAL_SHINE }}
    >
      <span style={{ fontFamily: font, fontSize: size * 0.4, color: "#fff", fontWeight: 400 }}>ai</span>
    </div>
  );
}

function CategoryPill({ label, active, onClick }: { label: string; active: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 rounded-full px-[17px] py-[9px] transition-colors"
      style={{
        fontFamily: font,
        fontSize: 14,
        lineHeight: 1.5,
        color: active ? "#4A99F5" : "#8099BE",
        background: active ? "rgba(21,93,252,0.2)" : "rgba(255,255,255,0.04)",
        border: active ? "1px solid rgba(43,127,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {label}
    </button>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span
      className="rounded px-2 py-1"
      style={{
        fontFamily: font,
        fontSize: 12,
        lineHeight: 1.5,
        color: "#4A6080",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {label}
    </span>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
    <article
      className="flex flex-col overflow-hidden rounded-2xl h-full"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1920/1080" }}>
        <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <div
            className="flex items-center gap-2 rounded-lg px-4 py-2"
            style={{
              background: "rgba(0,0,0,0.2)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontFamily: font, fontSize: 12, color: "#fff", lineHeight: 1.5 }}>{post.category}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">
        <h3 style={{ fontFamily: font, fontSize: 16, color: "#fff", lineHeight: 1.5, fontWeight: 400 }}>
          {post.title}
        </h3>
        <p
          className="overflow-hidden"
          style={{
            fontFamily: font,
            fontSize: 14,
            color: "#8099BE",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.excerpt}
        </p>
        <div className="flex items-center gap-1 mt-auto">
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex items-center gap-3 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <AiAvatar size={20} />
            <span style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5 }}>
              {post.author}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CalendarIcon />
            <span style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5, whiteSpace: "nowrap" }}>
              {post.date}
            </span>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

interface BlogArticlesSectionProps {
  search: string;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  posts: BlogPost[];
  featured: BlogPost | null;
  categories: string[];
}

export default function BlogArticlesSection({
  search,
  activeCategory,
  onCategoryChange,
  posts,
  featured,
  categories,
}: BlogArticlesSectionProps) {
  const query = search.toLowerCase().trim();

  const matchesSearch = (post: BlogPost) => {
    if (!query) return true;
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query))
    );
  };

  const matchesCategory = (post: BlogPost) => {
    if (activeCategory === "All") return true;
    return post.category === activeCategory;
  };

  const filteredPosts = posts.filter((p) => matchesSearch(p) && matchesCategory(p));
  const showFeatured = featured && matchesSearch(featured) && matchesCategory(featured);

  return (
    <section style={{ background: "#070E24" }}>
      <Container className="flex flex-col gap-10 pb-20">
        {/* Category filters */}
        <FadeUp>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                active={cat === activeCategory}
                onClick={() => onCategoryChange(cat)}
              />
            ))}
          </div>
        </FadeUp>

        <div className="flex flex-col gap-[60px]">
          {/* Featured article */}
          {showFeatured && featured && (
          <FadeUp>
            <Link href={`/blog/${featured.slug}`} className="block">
            <div
              className="flex flex-wrap items-stretch overflow-hidden rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Thumbnail */}
              <div className="relative w-[608px] min-w-[300px] self-stretch overflow-hidden max-lg:w-full max-lg:h-[280px]">
                <img src={featured.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <div
                    className="flex items-center gap-2 rounded-lg px-4 py-2"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <SparkleIcon />
                    <span style={{ fontFamily: font, fontSize: 12, color: "#fff", lineHeight: 1.5 }}>Featured News</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-8 flex-1 min-w-[300px] p-10">
                <div className="flex flex-col gap-4">
                  {/* Category label */}
                  <div>
                    <div
                      className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
                      style={{
                        background: "rgba(0,0,0,0.2)",
                        backdropFilter: "blur(16px)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <span style={{ fontFamily: font, fontSize: 12, color: "#fff", lineHeight: 1.5 }}>
                        {featured.category}
                      </span>
                    </div>
                  </div>

                  <h2 style={{ fontFamily: font, fontSize: 32, color: "#fff", lineHeight: 1.3, fontWeight: 400 }}>
                    {featured.title}
                  </h2>

                  <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                    {featured.excerpt}
                  </p>

                  {/* Author & date */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                      <AiAvatar size={32} />
                      <div className="flex items-center gap-2">
                        <span style={{ fontFamily: font, fontSize: 12, color: "#4A6080", lineHeight: 1.5 }}>
                          Written by:
                        </span>
                        <span style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5 }}>
                          {featured.author}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <CalendarIcon />
                      <span style={{ fontFamily: font, fontSize: 12, color: "#8099BE", lineHeight: 1.5 }}>
                        {featured.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Read article link */}
                <span
                  className="inline-flex items-center gap-1"
                  style={{ fontFamily: font, fontSize: 16, color: "#4A99F5", lineHeight: 1.5 }}
                >
                  Read article
                  <ChevronRightIcon />
                </span>
              </div>
            </div>
            </Link>
          </FadeUp>
          )}

          {/* Blog cards grid */}
          {filteredPosts.length > 0 ? (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
          >
            {filteredPosts.map((post, i) => (
              <FadeUp key={post.slug} delay={i * 0.05}>
                <BlogCard post={post} />
              </FadeUp>
            ))}
          </div>
          ) : !showFeatured ? (
            <div className="flex items-center justify-center py-20">
              <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE" }}>
                No articles found.
              </p>
            </div>
          ) : null}

          {/* Newsletter CTA */}
          <FadeUp>
            <div
              className="relative overflow-hidden rounded-3xl p-10"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {/* Video background */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              >
                <source src="/videos/CTA-Loop.mp4" type="video/mp4" />
              </video>

              <div className="relative flex flex-wrap items-center justify-between gap-y-10 w-full max-w-[1200px] mx-auto">
                <div className="flex flex-col gap-5 flex-1 min-w-[300px] max-w-[672px]">
                  <h2 style={{ fontFamily: font, fontSize: 48, color: "#fff", lineHeight: 1.2, fontWeight: 400 }}>
                    Stay up to date
                  </h2>
                  <p style={{ fontFamily: font, fontSize: 16, color: "#C0CEEA", lineHeight: 1.5 }}>
                    Practical AI insights delivered when we publish — no noise, no spam.
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 rounded-lg px-6 py-3"
                    style={{
                      fontFamily: font,
                      fontSize: 16,
                      color: "#fff",
                      backgroundImage: "linear-gradient(164deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                      border: "1px solid #4A99F5",
                      boxShadow: "0px 2px 12px rgba(0,119,255,0.8)",
                    }}
                  >
                    Get in touch
                    <ChevronRightIcon />
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
