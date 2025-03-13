import { ApiArticleArticle } from "@/types/strapi";

type StrapiAttributes<T> = T extends { attributes: infer A } ? A : never;

export type Article = Pick<
  StrapiAttributes<ApiArticleArticle>,
  "id" | "title" | "description" | "slug" | "createdAt" | "updatedAt" | "publishedAt"
> & { documentId: string };