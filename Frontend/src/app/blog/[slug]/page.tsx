import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import ArticleHeroSection from "@/components/sections/blog-article/ArticleHeroSection";
import ArticleContentSection from "@/components/sections/blog-article/ArticleContentSection";
import { getPostBySlug, getRelatedPosts, getRankMathSEO } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [post, seo] = await Promise.all([
    getPostBySlug(slug),
    getRankMathSEO(slug),
  ]);

  if (!post) return { title: "Post Not Found | Ai-Ai-Ai" };

  return {
    title: seo?.title || `${post.title} | Ai-Ai-Ai`,
    description: seo?.description || post.excerpt,
    robots: seo?.robots || undefined,
    openGraph: {
      title: seo?.ogTitle || post.title,
      description: seo?.ogDescription || post.excerpt,
      type: (seo?.ogType as "article") || "article",
      images: seo?.ogImage ? [{ url: seo.ogImage }] : post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: (seo?.twitterCard as "summary_large_image") || "summary_large_image",
      title: seo?.twitterTitle || post.title,
      description: seo?.twitterDescription || post.excerpt,
      images: seo?.twitterImage ? [seo.twitterImage] : post.image ? [post.image] : [],
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(
    post.category.toLowerCase().replace(/\s+/g, "-"),
    post.slug
  );

  return (
    <>
      <Navbar />
      <main>
        <ArticleHeroSection
          category={post.category}
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
          date={post.date}
          backgroundImage="/images/blog-hero-bg.png"
        />
        <ArticleContentSection
          thumbnail={post.image}
          content={post.content}
          tags={post.tags}
          relatedPosts={relatedPosts}
        />
      </main>
    </>
  );
}
