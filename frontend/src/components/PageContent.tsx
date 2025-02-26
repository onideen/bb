import { ReactNode } from "react";
import HeroSlide from "./HeroSlide";

interface PageContentProps {
  title: string;
  children?: ReactNode;
}

const PageContent = ({ title, children }: PageContentProps) => {
  return (
    <>
      <section className="relative h-96 max-h-1/2">
        <HeroSlide title={title} />
      </section>
      <section className="mx-auto py-12 px-4">{children}</section>
    </>
  );
};

export default PageContent;
