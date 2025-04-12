const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-og-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const generateUniqueSlug = async (
  uid: string,
  value: string,
  excludeId?: number
): Promise<string> => {
  const base = slugify(value);
  let slug = base;
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

    slug = `${base}-${++counter}`;
  }

  return slug;
};

export const createSlugIfNeeded = async (
  event: any,
  sourceField: string,
  uid: string
) => {
  const { data, where } = event.params;
  if (data[sourceField] && !data.slug) {
    const id = where?.id ?? undefined;
    data.slug = await generateUniqueSlug(uid, data[sourceField], id);
  }
};
