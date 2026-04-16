import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { client } from "@/lib/sanity/client";
import { legalPageQuery } from "@/lib/sanity/queries";
import type { LegalPage } from "@/lib/sanity/types";
import { FadeUp } from "@/components/motion-wrapper";

interface StaticPageProps {
  params: Promise<{ slug: string }>;
}

async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return client.fetch(legalPageQuery, { slug }, { next: { revalidate: 300 } });
}

export async function generateMetadata({
  params,
}: StaticPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) return {};

  return { title: page.title };
}

export default async function StaticPage({ params }: StaticPageProps) {
  const { slug } = await params;
  const page = await getLegalPage(slug);

  if (!page) notFound();

  return (
    <div className="mx-auto max-w-[var(--width-article)] px-4 py-10 sm:py-16">
      <FadeUp>
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">{page.title}</h1>
      </FadeUp>

      {page.updatedAt && (
        <FadeUp delay={0.1}>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Last updated:{" "}
            {new Date(page.updatedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </FadeUp>
      )}

      <FadeUp delay={0.15}>
        <div className="prose-article">
          {page.body && <PortableText value={page.body} />}
        </div>
      </FadeUp>
    </div>
  );
}
