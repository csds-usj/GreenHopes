import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoplayDelay?: number;
  slideShadows?: boolean;
}

export const CardSwipe: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  slideShadows = false,
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <Swiper
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect={"cards"}
        grabCursor={true}
        loop={true}
        slidesPerView={"auto"}
        rewind={true}
        cardsEffect={{
          slideShadows: slideShadows,
        }}
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="size-full border-8 border-neutral-100 rounded-[6px] shadow-2xl shadow-black/30">
              <img
                src={image.src}
                width={500}
                height={500}
                className="size-full rounded"
                alt={image.alt}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
