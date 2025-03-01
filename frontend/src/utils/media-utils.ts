import { MediaAttributes } from "../components/MediaRenderer";

export const getOptimalImage = (media?: MediaAttributes) => {

  if (!media) return ""
 
  const baseUrl = import.meta.env.STRAPI_URL || "http://localhost:1337"; // Bytt til riktig Strapi-server URL
  const width = window.innerWidth;

  if (width <= 500 && media.formats?.small)
    return baseUrl + media.formats.small.url;
  if (width <= 750 && media.formats?.medium)
    return baseUrl + media.formats.medium.url;
  if (width > 750 && media.formats?.large)
    return baseUrl + media.formats.large.url;

  return baseUrl + media.url; // Fallback til originalbildet
};