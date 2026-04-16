import { Suspense } from "react";
import { client } from "@/lib/sanity/client";
import { homePageQuery } from "@/lib/sanity/queries";
import type { HomePageData } from "@/lib/sanity/types";
import { HeroBento } from "@/components/hero-bento";
import { TrendingSection } from "@/components/trending-section";
import { AdSlot } from "@/components/ad-slot";

async function getHomeData(): Promise<HomePageData> {
  return client.fetch(homePageQuery, {}, { next: { revalidate: 60 } });
}

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <div className="mx-auto max-w-[var(--width-content)] px-4">
      {/* Hero Bento Grid */}
      <section className="py-6 sm:py-10">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
              <div className="md:col-span-2 aspect-[16/9] bg-[var(--skeleton)] rounded-2xl" />
              <div className="flex flex-col gap-4">
                <div className="aspect-[4/3] bg-[var(--skeleton)] rounded-2xl" />
                <div className="aspect-[4/3] bg-[var(--skeleton)] rounded-2xl" />
              </div>
            </div>
          }
        >
          <HeroBento posts={data.hero} />
        </Suspense>
      </section>

      {/* Ad after hero */}
      <AdSlot id="home-top" format="banner" />

      {/* Trending Section */}
      <section className="py-6 sm:py-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Trending Now</h2>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-[var(--skeleton)] rounded-2xl" />
              ))}
            </div>
          }
        >
          <TrendingSection posts={data.trending} />
        </Suspense>
      </section>

      {/* Ad after trending */}
      <AdSlot id="home-bottom" format="rectangle" />
    </div>
  );
}
