"use client";

import type { Post } from "@/lib/sanity/types";
import { ArticleCard } from "./article-card";
import { FadeUp } from "./motion-wrapper";

interface TrendingSectionProps {
  posts: Post[];
}

export function TrendingSection({ posts }: TrendingSectionProps) {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-[var(--text-muted)] text-center py-12">
        No trending posts yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post, i) => (
        <FadeUp key={post._id} delay={i * 0.08}>
          <ArticleCard post={post} size="small" />
        </FadeUp>
      ))}
    </div>
  );
}
