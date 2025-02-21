interface ImgAttributes {
  name?: string;
  hash?: string;
  ext?: string;
  mime?: string;
  path?: string;
  width?: number;
  height?: number;
  size?: number;
  sizeInBytes?: number;
  url: string;
}

export interface MediaAttributes {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string;
  mime?: string;
  formats?: {
    thumbnail?: ImgAttributes;
    small?: ImgAttributes;
    medium?: ImgAttributes;
    large?: ImgAttributes;
  };
}

const getOptimalImage = (media: MediaAttributes) => {
  const baseUrl = "http://localhost:1337"; // Bytt til riktig Strapi-server URL
  const width = window.innerWidth;

  if (width <= 500 && media.formats?.small)
    return baseUrl + media.formats.small.url;
  if (width <= 750 && media.formats?.medium)
    return baseUrl + media.formats.medium.url;
  if (width > 750 && media.formats?.large)
    return baseUrl + media.formats.large.url;

  return baseUrl + media.url; // Fallback til originalbildet
};

const MediaRenderer = ({ file }: { file: MediaAttributes }) => {
  if (!file) return null;

  const imageSrc = getOptimalImage(file);

  return (
    <img
      src={imageSrc}
      alt={file.alternativeText || "Image"}
      className="rounded-lg shadow-md w-full mb-4"
    />
  );
};

export default MediaRenderer;
