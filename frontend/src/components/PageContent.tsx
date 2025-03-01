import { ReactNode } from "react";
import HeroSlide from "./HeroSlide";
import { MediaAttributes } from "./MediaRenderer";

interface PageContentProps {
  title: string;
  children?: ReactNode;
  image?: MediaAttributes
}

const PageContent = ({ title, children, image }: PageContentProps) => {
    
  return (
    <>
      <section className="relative h-96 max-h-1/2">
        <HeroSlide title={title} image={image}/>
      </section>
      <section className="max-w-screen-xl mx-auto py-12 justify-center">{children}</section>
    </>
  );
};

export default PageContent;
