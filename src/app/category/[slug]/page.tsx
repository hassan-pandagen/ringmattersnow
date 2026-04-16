import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { client } from "@/lib/sanity/client";
import { categoryQuery } from "@/lib/sanity/queries";
import type { CategoryPageData } from "@/lib/sanity/types";
import { ArticleCard } from "@/components/article-card";
import { AdSlot } from "@/components/ad-slot";
import { FadeUp } from "@/components/motion-wrapper";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryData(slug: string): Promise<CategoryPageData | null> {
  const data = await client.fetch(
    categoryQuery,
    { slug },
    { next: { revalidate: 60 } }
  );
  if (!data?.category) return null;
  return data;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getCategoryData(slug);
  if (!data) return {};

  return {
    title: data.category.title,
    description: data.category.description || `Browse ${data.category.title} articles`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await getCategoryData(slug);

  if (!data) notFound();

  const { category, posts } = data;

  return (
    <div className="mx-auto max-w-[var(--width-content)] px-4 py-8 sm:py-12">
      {/* Category Header */}
      <FadeUp>
        <header className="mb-8 sm:mb-12">
          <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand text-white rounded-full">
            Category
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold">{category.title}</h1>
          {category.description && (
            <p className="mt-3 text-lg text-[var(--text-muted)] max-w-2xl">
              {category.description}
            </p>
          )}
        </header>
      </FadeUp>

      {/* Ad top */}
      <AdSlot id="category-top" format="banner" />

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {posts.map((post, i) => (
            <FadeUp key={post._id} delay={i * 0.06}>
              <ArticleCard post={post} size="medium" />
            </FadeUp>
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--text-muted)] py-16">
          No articles in this category yet.
        </p>
      )}

      {/* Ad bottom */}
      <div className="mt-12">
        <AdSlot id="category-bottom" format="rectangle" />
      </div>
    </div>
  );
}
