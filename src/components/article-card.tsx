"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor, hasImageAsset, fallbackImage } from "@/lib/sanity/client";
import type { Post } from "@/lib/sanity/types";

interface ArticleCardProps {
  post: Post;
  priority?: boolean;
  size?: "small" | "medium" | "large";
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCard({
  post,
  priority = false,
  size = "medium",
}: ArticleCardProps) {
  const imageHeight =
    size === "large"
      ? "aspect-[16/9]"
      : size === "medium"
        ? "aspect-[4/3]"
        : "aspect-[3/2]";

  return (
    <Link href={`/article/${post.slug.current}`} className="group block">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]
                   overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
      >
        {/* Thumbnail */}
        <div className={`${imageHeight} relative overflow-hidden`}>
          <Image
            src={
              post.mainImage && hasImageAsset(post.mainImage)
                ? urlFor(post.mainImage).width(800).height(600).url()
                : fallbackImage(post.slug.current, 800, 600)
            }
            alt={post.mainImage?.alt || post.title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={
              size === "large"
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            unoptimized
          />

          {/* Category Badge */}
          {post.category && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide bg-brand text-white rounded-full">
              {post.category.title}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3
            className={`font-bold leading-snug line-clamp-2 group-hover:text-brand transition-colors ${
              size === "large" ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            {post.title}
          </h3>

          {post.excerpt && size !== "small" && (
            <p className="mt-2 text-sm text-[var(--text-muted)] line-clamp-2">
              {post.excerpt}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">
              {formatDate(post.publishedAt)}
            </span>
            {post.readTime && (
              <span className="text-xs text-[var(--text-muted)]">
                {post.readTime} min read
              </span>
            )}
          </div>

          {/* Read More Arrow — reveals on hover (CSS-only to avoid SSR/CSR style mismatch) */}
          <div
            className="mt-3 flex items-center gap-1 text-sm font-medium text-brand
                       opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Read more
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
