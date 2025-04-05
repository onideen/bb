import { MediaAttributes } from "../components/MediaRenderer";

export const getOptimalImage = (media?: MediaAttributes) => {
  if (!media) return "";
  if (!media.formats) return addBaseUrlIfNeeded(media.url); // Return original image if no formats available
  const width = window.innerWidth;

  if (width <= 500 && media.formats?.small)
    return addBaseUrlIfNeeded(media.formats.small.url);
  else if (width <= 750 && media.formats?.medium)
    return addBaseUrlIfNeeded(media.formats.medium.url);
  if (width > 750 && media.formats?.large)
    return addBaseUrlIfNeeded(media.formats.large.url);

  return addBaseUrlIfNeeded(media.url); // Fallback til originalbildet
};

function addBaseUrlIfNeeded(url: string): string {
  if (url.startsWith("http")) return url;

  const baseUrl = import.meta.env.VITE_STRAPI_URL || ""; // Bytt til riktig Strapi-server URL
  return baseUrl + url;
}
