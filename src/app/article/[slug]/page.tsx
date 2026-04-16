import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client, urlFor, hasImageAsset, fallbackImage } from "@/lib/sanity/client";
import { articleQuery, relatedArticlesQuery } from "@/lib/sanity/queries";
import type { Post } from "@/lib/sanity/types";
import { ArticleBody } from "@/components/article-body";
import { ArticleCard } from "@/components/article-card";
import { AdSlot } from "@/components/ad-slot";
import { ReadingProgress } from "@/components/reading-progress";
import { FadeUp } from "@/components/motion-wrapper";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string): Promise<Post | null> {
  return client.fetch(articleQuery, { slug }, { next: { revalidate: 60 } });
}

async function getRelated(categoryId: string, currentId: string): Promise<Post[]> {
  return client.fetch(
    relatedArticlesQuery,
    { categoryId, currentId },
    { next: { revalidate: 120 } }
  );
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getArticle(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.publishedAt,
      images: post.mainImage && hasImageAsset(post.mainImage)
        ? [{ url: urlFor(post.mainImage).width(1200).height(630).url() }]
        : [],
    },
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getArticle(slug);

  if (!post) notFound();

  const related =
    post.category?._id
      ? await getRelated(post.category._id, post._id)
      : [];

  return (
    <>
      <ReadingProgress />

      <article className="mx-auto max-w-[var(--width-content)] px-4">
        {/* Hero Image */}
        <FadeUp>
          <div className="relative aspect-[2/1] sm:aspect-[21/9] rounded-2xl overflow-hidden mt-6">
            <Image
              src={
                post.mainImage && hasImageAsset(post.mainImage)
                  ? urlFor(post.mainImage).width(1400).height(600).url()
                  : fallbackImage(post.slug.current, 1400, 600)
              }
              alt={post.mainImage?.alt || post.title}
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </FadeUp>

        {/* Article Header */}
        <header className="mx-auto max-w-[var(--width-article)] mt-8 sm:mt-12">
          <FadeUp>
            {post.category && (
              <span className="inline-block mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand text-white rounded-full">
                {post.category.title}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && hasImageAsset(post.author.image) && (
                    <Image
                      src={urlFor(post.author.image).width(80).height(80).url()}
                      alt={post.author.name}
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  )}
                  <span className="font-medium text-[var(--text)]">
                    {post.author.name}
                  </span>
                </div>
              )}
              <span>&middot;</span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              {post.readTime && (
                <>
                  <span>&middot;</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>
          </FadeUp>
        </header>

        {/* Ad before article body */}
        <div className="mx-auto max-w-[var(--width-article)] mt-8">
          <AdSlot id="article-top" format="banner" />
        </div>

        {/* Article Body */}
        <div className="mx-auto max-w-[var(--width-article)] mt-6">
          <Suspense fallback={<div className="animate-pulse space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-[var(--skeleton)] rounded" />
            ))}
          </div>}>
            {post.body && <ArticleBody body={post.body} />}
          </Suspense>
        </div>

        {/* Ad after article body */}
        <div className="mx-auto max-w-[var(--width-article)] mt-8">
          <AdSlot id="article-bottom" format="rectangle" />
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[var(--width-content)] px-4 py-12 sm:py-16">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((relPost, i) => (
              <FadeUp key={relPost._id} delay={i * 0.08}>
                <ArticleCard post={relPost} size="small" />
              </FadeUp>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
