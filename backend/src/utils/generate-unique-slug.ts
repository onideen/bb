import { slugify } from "./slugify";

/**
 * Lager en unik slug basert på en gitt tekst, og sikrer at den ikke kolliderer i databasen.
 *
 * @param uid - f.eks. "api::event.event"
 * @param title - Tittel eller annen tekst som brukes som grunnlag
 * @param excludeId - ID som skal ekskluderes fra søket (f.eks. ved oppdatering)
 */
export const generateUniqueSlug = async (
  uid: any,
  title: string,
  excludeId?: number
): Promise<string> => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await strapi.entityService.findMany(uid, {
      filters: {
        slug,
        ...(excludeId && { id: { $ne: excludeId } }),
      },
      limit: 1,
    });

    if (existing.length === 0) break;

    slug = `${baseSlug}-${++counter}`;
  }

  return slug;
};
