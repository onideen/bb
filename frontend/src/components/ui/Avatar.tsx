import MediaRenderer, { MediaAttributes } from "../MediaRenderer";
import { User } from "lucide-react";

interface AvatarProps {
  image?: MediaAttributes;
  alt: string;
  className?: string;
}

export default function Avatar({ image, alt, className }: AvatarProps) {
  return image ? (
    <MediaRenderer file={image} alt={alt} className={className} />
  ) : (
    <div
      className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}
    >
      <User className="w-12 h-12" />
    </div>
  );
}
