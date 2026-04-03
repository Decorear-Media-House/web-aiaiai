import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import BlogContent from "@/components/sections/blog/BlogContent";
import { getPosts, getFeaturedPost, getCategories, getPageSEO } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("blog", "Blog | Ai-Ai-Ai", "Practical thinking on AI delivery, governance, security, and robotics — from the people doing the work.");
}

export default async function BlogPage() {
  const [posts, featured, categories] = await Promise.all([
    getPosts(),
    getFeaturedPost(),
    getCategories(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <BlogContent
          posts={posts}
          featured={featured}
          categories={categories}
        />
      </main>
    </>
  );
}
