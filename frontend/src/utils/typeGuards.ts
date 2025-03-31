import {
  ComponentDataMap,
  FetchableSection,
  //FetchableSections,
  Section,
} from "../types/content-types";

type FetchableComponent = keyof ComponentDataMap;

export function isFetchableSection(
  section: Section
): section is Section & { __component: FetchableComponent } {
  return ["page.article-list", "page.event-list"].includes(section.__component);
}
/*
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

*/
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
