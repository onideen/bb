import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import image1 from "../assets/hero-image.jpg";
import image2 from "../assets/hero-honey.webp";
import image3 from "../assets/bier-bitømmebrett.jpg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HeroSlide from "./HeroSlide";

function HeroSection() {
  console.log(image1);
  const slides = [
    {
      image: image3,
      title: "Velkommen til BIEngen Honning",
      description: "Utforsk en verden av honning",
      linkText: "Lær mer",
      linkHref: "/om-oss",
    },
    {
      image: image2,
      title: "Produkter",
      description: "Se hva vi har å tilby",
      linkText: "Butikk",
      linkHref: "#",
    },
    {
      image: image1,
    },
  ];

  return (
    <section className="relative h-96 max-h-1/2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000 }}
        className="swiper-container h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {console.log(slide)}
            <HeroSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default HeroSection;
