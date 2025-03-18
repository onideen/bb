import axios, { AxiosResponse } from "axios";
import { Article, Page } from "../types/content-types";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


/**
 * Henter en side basert på path.
 */
export const fetchPageData = async (path: string): Promise<Page | null> => {
  try {
    const res: AxiosResponse<{ data: Page[] }> = await api.get("/pages", {
      params: {
        filters: { path: { $eq: "/" + path } },
        populate: {
          cover: { populate: "*" },
          blocks: { populate: "*" },
          sections: { populate: "*" },
        },
      },
    });

    return res.data.data[0] || null;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Ukjent feil oppstod.");
  }
};


/**
 * Henter artikler for alle seksjoner av type "page.article-list".
 */
export const fetchArticlesForSections = async (sections: { id: number; category?: string }[]): Promise<Record<number, Article[]>> => {
  if (!sections || sections.length === 0) return {};

  try {
    const requests: Promise<AxiosResponse<{ data: Article[] }>>[] = sections
      //.filter(section => section.category) // Filtrerer bort seksjoner uten kategori
      .map(section =>
        api.get<{ data: Article[] }>("/articles", {
          params: {
            filters: {
              category: { $eq: section.category },
            },
            populate: {
              cover: { populate: "*" },
              blocks: { populate: "*" },
            },
          },
        })
      );

    const responses = await axios.all(requests);

    return responses.reduce<Record<number, Article[]>>((acc, response, index) => {
      acc[sections[index].id] = response.data.data;
      return acc;
    }, {});
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Ukjent feil oppstod.");
  }
};