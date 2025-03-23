import axios, { AxiosResponse } from "axios";
import { FetchableSection, Page } from "../types/content-types";
import { componentToApiType } from "./sectionApiMap";
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
export const fetchItemsForSections = async <T>(
  sections: FetchableSection<unknown>[]
): Promise<Record<number, T[]>> => {
  if (!sections || sections.length === 0) return {};
  console.log(sections);
  try {
    const requests = sections.map((section) => {
      const params: {
        filters: {
          category?: { $eq: string };
          eventDate?: { $gte?: string; $lt?: string };
        };
        sort: string[];
        pagination: { limit: number };
        populate: {
          cover: { populate: string };
          location?: { populate: string };
        };
      } = {
        filters: {},
        sort: ["publishedAt:desc"],
        pagination: { limit: section.limit ?? 5 },
        populate: { cover: { populate: "*" } },
      };

      if (section.category) {
        params.filters.category = { $eq: section.category };
      }

      const apiType = componentToApiType[section.__component];
      if (apiType === "events") {
        params.populate.location = { populate: "*" };
        if (section.filter_type === "upcoming") {
          params.filters.eventDate = { $gte: new Date().toISOString() };
        } else if (section.filter_type === "past") {
          params.filters.eventDate = { $lt: new Date().toISOString() };
        }
      }

      return api.get<{ data: T[] }>(`/${apiType}`, { params });
    });

    const responses = await axios.all(requests);

    return responses.reduce((acc, response, index) => {
      acc[sections[index].id] = response.data.data;
      return acc;
    }, {} as Record<number, T[]>);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    throw new Error("Ukjent feil oppstod.");
  }
};
