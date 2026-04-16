import type { PortableTextBlock } from "@portabletext/react";

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: SanitySlug;
  description?: string;
}

export interface Author {
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  readTime?: number;
  body?: PortableTextBlock[];
  category?: Category;
  author?: Author;
}

export interface LegalPage {
  _id: string;
  title: string;
  slug: SanitySlug;
  body?: PortableTextBlock[];
  updatedAt?: string;
}

export interface HomePageData {
  hero: Post[];
  trending: Post[];
}

export interface CategoryPageData {
  category: Category;
  posts: Post[];
}
