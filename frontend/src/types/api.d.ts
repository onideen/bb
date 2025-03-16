import { ApiArticleArticle } from "@strapi-types/contentTypes";

// Forbedret type-ekstraksjon for å unngå 'unknown' problematikken
type StrapiAttributes<T> = T extends { attributes: infer A } ? A : never;

// Henter kun de nødvendige feltene fra Strapi-typen
export type Article = Pick<
  StrapiAttributes<ApiArticleArticle> extends infer Attrs
    ? Attrs extends Record<string, unknown>
      ? Attrs
      : never
    : never,
  "id" | "title" | "description" | "slug" | "createdAt" | "updatedAt" | "publishedAt" | "cover"
> & { documentId: string };


// Henter kun de nødvendige feltene fra Strapi-typen
export type Page = Pick<
  StrapiAttributes<ApiPagePage> extends infer Attrs
    ? Attrs extends Record<string, unknown>
      ? Attrs
      : never
    : never,
  "id" | 
  "title" | 
  "documentId" | 
  "description" | 
  "slug" | 
  "createdAt" | 
  "updatedAt" | 
  "publishedAt" | 
  "cover" | 
  "blocks" |
  "sections"
> & { documentId: string };
