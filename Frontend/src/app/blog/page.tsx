import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import BlogContent from "@/components/sections/blog/BlogContent";
import { getPosts, getFeaturedPost, getCategories } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Ai-Ai-Ai",
  description: "Practical thinking on AI delivery, governance, security, and robotics — from the people doing the work.",
};

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
