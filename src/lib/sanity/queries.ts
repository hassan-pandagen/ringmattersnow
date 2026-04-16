import { groq } from "next-sanity";

// ── Home Page: Hero + Trending ──
export const homePageQuery = groq`{
  "hero": *[_type == "post" && featured == true] | order(publishedAt desc)[0..4] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    "category": category->{title, slug}
  },
  "trending": *[_type == "post"] | order(publishedAt desc)[0..7] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    "category": category->{title, slug}
  }
}`;

// ── Single Article ──
export const articleQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readTime,
  body,
  "category": category->{title, slug},
  "author": author->{name, image, bio}
}`;

// ── Related Articles ──
export const relatedArticlesQuery = groq`*[_type == "post" && category._ref == $categoryId && _id != $currentId] | order(publishedAt desc)[0..3] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  readTime,
  "category": category->{title, slug}
}`;

// ── Category Page ──
export const categoryQuery = groq`{
  "category": *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description
  },
  "posts": *[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    readTime,
    "category": category->{title, slug}
  }
}`;

// ── All Categories (for nav) ──
export const categoriesQuery = groq`*[_type == "category"] | order(title asc) {
  _id,
  title,
  slug
}`;

// ── Legal / Static Pages ──
export const legalPageQuery = groq`*[_type == "legalPage" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  body,
  updatedAt
}`;
