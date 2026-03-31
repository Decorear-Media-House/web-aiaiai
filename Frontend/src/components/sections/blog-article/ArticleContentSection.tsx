"use client";

import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/layouts/Container";
import Link from "next/link";
import "@/styles/wordpress.css";

const font = "var(--font-faculty-glyphic), sans-serif";
const ROYAL_SHINE = "linear-gradient(135deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)";

import type { BlogPost } from "@/lib/wordpress";

interface ArticleContentProps {
  thumbnail: string;
  content: string;
  tags: string[];
  relatedPosts: BlogPost[];
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function ChevronRightIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

function TagIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10.5 7.005L7.01 10.495a.75.75 0 01-1.06 0L1.5 6.045V1.5h4.545l4.455 4.445a.75.75 0 010 1.06z" stroke="#4A6080" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="0.75" fill="#4A6080" />
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

export default function ArticleContentSection({
  thumbnail,
  content,
  tags,
  relatedPosts,
}: ArticleContentProps) {
  return (
    <section style={{ background: "#070E24" }}>
      <Container className="flex flex-col gap-20 pb-20">
        {/* Main content area */}
        <div className="flex flex-wrap gap-10 items-start">
          {/* Article body */}
          <div className="flex flex-col gap-6 flex-1 min-w-[300px]">
            {/* Featured thumbnail */}
            <FadeUp>
              <div className="relative w-full overflow-hidden min-w-[300px]" style={{ height: 448 }}>
                <img
                  src={thumbnail}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div
                    className="flex items-center gap-2 rounded-lg px-4 py-2"
                    style={{
                      background: "rgba(0,0,0,0.2)",
                      backdropFilter: "blur(16px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#fff" />
                    </svg>
                    <span style={{ fontFamily: font, fontSize: 12, color: "#fff", lineHeight: 1.5 }}>
                      Featured News
                    </span>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Article content */}
            <FadeUp>
              <div
                className="wp-content flex flex-col gap-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </FadeUp>

            {/* Tags footer */}
            <FadeUp>
              <div
                className="flex items-center gap-2 flex-wrap pt-6"
                style={{ borderTop: "1px solid #1E2E48" }}
              >
                <div className="flex items-center gap-1 shrink-0">
                  <TagIcon />
                  <span style={{ fontFamily: font, fontSize: 12, color: "#4A6080", lineHeight: 1.5 }}>
                    Tags:
                  </span>
                </div>
                <div className="flex items-center gap-1 flex-wrap flex-1 min-w-[300px]">
                  {tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Sidebar - CTA card */}
          <div className="w-full max-w-[389px] min-w-[300px] max-lg:max-w-full">
            <FadeUp>
              <div
                className="flex flex-col gap-4 p-6 rounded-2xl"
                style={{
                  backgroundImage: "linear-gradient(153deg, #070E24 0%, #102050 50%, #1A4494 100%)",
                  border: "1px solid #1A4494",
                }}
              >
                <div className="flex flex-col gap-2">
                  <h3 style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4, fontWeight: 400 }}>
                    Want to discuss this?
                  </h3>
                  <p style={{ fontFamily: font, fontSize: 16, color: "#8099BE", lineHeight: 1.5 }}>
                    Share your objectives and constraints. We&apos;ll propose a practical first step.
                  </p>
                </div>
                <a
                  href="#"
                  className="flex items-center justify-center gap-1 rounded-lg px-4 py-2 w-full"
                  style={{
                    fontFamily: font,
                    fontSize: 16,
                    color: "#fff",
                    backgroundImage: "linear-gradient(173deg, #1A4494 0%, #2D7AE8 50%, #4A99F5 100%)",
                    border: "1px solid #4A99F5",
                    boxShadow: "0px 2px 12px rgba(0,119,255,0.8)",
                  }}
                >
                  Contact Us
                  <ChevronRightIcon />
                </a>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* More articles section */}
        <div
          className="flex flex-col gap-8 pt-10"
          style={{ borderTop: "1px solid #1E2E48" }}
        >
          <FadeUp>
            <div className="flex flex-wrap items-center gap-6">
              <h3 className="flex-1 min-w-[300px]" style={{ fontFamily: font, fontSize: 24, color: "#fff", lineHeight: 1.4, fontWeight: 400 }}>
                More articles
              </h3>
              <Link
                href="/blog"
                className="flex items-center gap-1 rounded-lg px-6 py-3"
                style={{
                  fontFamily: font,
                  fontSize: 16,
                  color: "#fff",
                  background: "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                More Blogs
                <ChevronRightIcon />
              </Link>
            </div>
          </FadeUp>

          {/* Related blog cards */}
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
          >
            {relatedPosts.map((post, i) => (
              <FadeUp key={post.title} delay={i * 0.05}>
                <BlogCard post={post} />
              </FadeUp>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
