import {
  FetchableSection,
  FetchableSections,
  Section,
} from "../types/content-types";

export function isFetchableSection(
  section: Section
): section is FetchableSections {
  const fetchableComponents = ["page.article-list", "page.event-list"]; // 🎯 Alle `FetchableSections`

  if (
    typeof section === "object" &&
    section !== null &&
    fetchableComponents.includes(section.__component)
  ) {
    return true;
  }

  return false;
}

export function getTypedSectionContent<T>(
  section: FetchableSection<T>,
  sectionContent?: Record<number, unknown[]>
): T[] {
  const data = sectionContent?.[section.id];

  if (Array.isArray(data)) {
    return data as T[]; // 🎯 Nå vet TypeScript at `dataType` matcher `T`
  }

  return [];
}
