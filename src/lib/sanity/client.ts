import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

export function hasImageAsset(image: any): boolean {
  return image?.asset?._ref != null || image?.asset?._id != null;
}

// Deterministic fallback image from Picsum when Sanity has no asset uploaded.
// Uses the post title as seed so each article gets a unique but consistent image.
export function fallbackImage(seed: string, width: number, height: number): string {
  const safeSeed = encodeURIComponent(seed.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40));
  return `https://picsum.photos/seed/${safeSeed}/${width}/${height}`;
}

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-12-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const client = createClient(sanityConfig);

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
