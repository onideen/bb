import { Event, Article, PersonWithRole } from "../types/content-types";
import { ContentItem } from "../types/content-types";
import { formatDate } from "./date";

export function mapEventToCardItem(event: Event): ContentItem {
  return {
    id: event.id,
    title: event.short_title || event.title,
    url: `/arrangementer/${event.documentId}`,
    image: event.cover ?? undefined,
    time: formatDate(event.start_time),
    location: event.location,
    tags: event.categories ? event.categories : [],
    organizers: event.organizers,
  };
}

export function mapArticleToCardItem(article: Article): ContentItem {
  return {
    id: article.id,
    title: article.title,
    url: `/artikler/${article.documentId}`,
    image: article.cover ?? undefined,
    shortText: article.description,
    tags: article.categories,
  };
}

export function mapPersonWithRoleToCardProps(p: PersonWithRole) {
  return { person: p };
}
