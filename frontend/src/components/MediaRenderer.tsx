import { getOptimalImage } from "../utils/media-utils";

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
