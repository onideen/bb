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

type MediaRendererProps = {
  file?: MediaAttributes;
  className?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

const MediaRenderer = ({ file, className, ...props }: MediaRendererProps) => {
  if (!file) return null;

  const imageSrc = getOptimalImage(file);

  return (
    <img
      src={imageSrc}
      alt={file.alternativeText || "Image"}
      className={className ?? "rounded-lg shadow-md w-full mb-4"}
      {...props}
    />
  );
};

export default MediaRenderer;
