"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { urlFor, hasImageAsset, fallbackImage } from "@/lib/sanity/client";
import type { Post } from "@/lib/sanity/types";

interface HeroBentoProps {
  posts: Post[];
}

function HeroImage({
  image,
  alt,
  seed,
  width,
  height,
  priority = false,
  sizes,
}: {
  image: Post["mainImage"];
  alt: string;
  seed: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes: string;
}) {
  const src =
    image && hasImageAsset(image)
      ? urlFor(image).width(width).height(height).url()
      : fallbackImage(seed, width, height);

  return (
    <Image
      src={src}
      alt={image?.alt || alt}
      fill
      priority={priority}
      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      sizes={sizes}
      unoptimized
    />
  );
}

export function HeroBento({ posts }: HeroBentoProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 aspect-[16/9] bg-[var(--skeleton)] rounded-2xl flex items-center justify-center">
          <p className="text-[var(--text-muted)]">No featured posts yet</p>
        </div>
      </div>
    );
  }

  const [main, ...rest] = posts;
  const side = rest.slice(0, 2);
  const bottom = rest.slice(2, 4);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Row: Main feature + 2 side cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-2"
        >
          <Link
            href={`/article/${main.slug.current}`}
            className="group relative block aspect-[16/9] rounded-2xl overflow-hidden"
          >
            <HeroImage
              image={main.mainImage}
              alt={main.title}
              seed={main.slug.current}
              width={1200}
              height={675}
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              {main.category && (
                <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand text-white rounded-full">
                  {main.category.title}
                </span>
              )}
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight line-clamp-3">
                {main.title}
              </h1>
              {main.excerpt && (
                <p className="mt-2 text-sm sm:text-base text-zinc-300 line-clamp-2 max-w-xl">
                  {main.excerpt}
                </p>
              )}
            </div>
          </Link>
        </motion.div>

        {/* Side Cards */}
        <div className="flex flex-col gap-4">
          {side.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 * (i + 1),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/article/${post.slug.current}`}
                className="group relative block aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <HeroImage
                  image={post.mainImage}
                  alt={post.title}
                  seed={post.slug.current}
                  width={600}
                  height={450}
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {post.category && (
                    <span className="inline-block mb-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide bg-brand text-white rounded-full">
                      {post.category.title}
                    </span>
                  )}
                  <h2 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-2">
                    {post.title}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      {bottom.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {bottom.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.15 * (i + 3),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/article/${post.slug.current}`}
                className="group relative block aspect-[16/9] rounded-2xl overflow-hidden"
              >
                <HeroImage
                  image={post.mainImage}
                  alt={post.title}
                  seed={post.slug.current}
                  width={600}
                  height={338}
                  sizes="(max-width: 768px) 50vw, 50vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h2 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-2">
                    {post.title}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
