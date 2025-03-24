import { ReactNode } from "react";
import HeroSlide from "./HeroSlide";
import { MediaAttributes } from "./MediaRenderer";

interface PageContentProps {
  title: string;
  children?: ReactNode;
  image?: MediaAttributes;
}

const PageContent = ({ title, children, image }: PageContentProps) => {
  return (
    <>
      <section className="relative h-96 max-h-1/2">
        <HeroSlide title={title} image={image} />
      </section>
      <section className="container mx-auto px-4 py-8 space-y-12">
        {children}
      </section>
    </>
  );
};

export default PageContent;
