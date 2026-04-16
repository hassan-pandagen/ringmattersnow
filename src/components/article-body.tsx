"use client";

import { PortableText } from "@portabletext/react";
import type { PortableTextBlock, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor, hasImageAsset } from "@/lib/sanity/client";
import { AdSlot } from "./ad-slot";
import { FadeUp } from "./motion-wrapper";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <FadeUp>
        <p>{children}</p>
      </FadeUp>
    ),
    h2: ({ children }) => (
      <FadeUp>
        <h2>{children}</h2>
      </FadeUp>
    ),
    h3: ({ children }) => (
      <FadeUp>
        <h3>{children}</h3>
      </FadeUp>
    ),
    blockquote: ({ children }) => (
      <FadeUp>
        <blockquote>{children}</blockquote>
      </FadeUp>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!hasImageAsset(value)) return null;
      return (
        <FadeUp>
          <figure className="my-8">
            <Image
              src={urlFor(value).width(720).url()}
              alt={value.alt || "Article image"}
              width={720}
              height={480}
              className="rounded-xl w-full h-auto"
              sizes="(max-width: 720px) 100vw, 720px"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm text-[var(--text-muted)]">
                {value.caption}
              </figcaption>
            )}
          </figure>
        </FadeUp>
      );
    },
    adSlot: ({ value }) => {
      return (
        <AdSlot
          id={value?.slotId || "inline-ad"}
          format={value?.format || "inline"}
        />
      );
    },
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <FadeUp>
        <ul>{children}</ul>
      </FadeUp>
    ),
    number: ({ children }) => (
      <FadeUp>
        <ol>{children}</ol>
      </FadeUp>
    ),
  },
};

interface ArticleBodyProps {
  body: PortableTextBlock[];
}

export function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="prose-article">
      <PortableText value={body} components={portableTextComponents} />
    </div>
  );
}
