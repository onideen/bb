export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-og-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};
