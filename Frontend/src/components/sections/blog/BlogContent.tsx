"use client";

import { useState } from "react";
import BlogHeroSection from "./BlogHeroSection";
import BlogArticlesSection from "./BlogArticlesSection";
import type { BlogPost } from "@/lib/wordpress";

interface BlogContentProps {
  posts: BlogPost[];
  featured: BlogPost | null;
  categories: string[];
}

export default function BlogContent({ posts, featured, categories }: BlogContentProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <BlogHeroSection search={search} onSearchChange={setSearch} />
      <BlogArticlesSection
        search={search}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        posts={posts}
        featured={featured}
        categories={categories}
      />
    </>
  );
}
