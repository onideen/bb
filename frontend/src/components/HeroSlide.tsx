import { Link } from "react-router-dom";
import dummyImage from "../assets/hero-image.jpg";
import { MediaAttributes } from "./MediaRenderer";

export interface HeroSlideProps {
  image?: MediaAttributes;
  title: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
}

function HeroSlide({
  image,
  title,
  description,
  linkText,
  linkHref,
}: HeroSlideProps) {
  const img = image ? image : dummyImage;
  return (
    <div
      className="relative bg-cover bg-center h-full"
      style={{
        backgroundImage: `url(${img})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="container mx-auto max-w-screen-lg px-6  h-full flex items-center">
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            {title}
          </h1>
          <p className="text-lg md:text-xl mb-8">{description}</p>
          {linkText && linkHref && (
            <Link
              to={linkHref}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md"
            >
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroSlide;
