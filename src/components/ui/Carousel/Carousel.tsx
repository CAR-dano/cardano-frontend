"use client";

import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./CarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./CarouselArrowButton";
import useEmblaCarousel from "embla-carousel-react";
import { Card, CardContent } from "../card";
import Image from "next/image";

import "./embla.css";
import { useRouter } from "next/navigation";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    isMounted ? emblaApi : undefined
  );
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(isMounted ? emblaApi : undefined);

  const imagesData = [
    {
      plat: "AB 1234 CD",
      image:
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Mitsubishi",
      model: "Expander 1.5 Ultimate",
    },
    {
      plat: "AB 1345 CF",
      image:
        "https://images.unsplash.com/photo-1459603677915-a62079ffd002?q=80&w=2134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "BMW",
      model: "7 Series",
    },

    {
      plat: "AB 1234 ABC",
      image:
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Audy",
      model: "A5",
    },
    {
      plat: "AB 1234 XYZ",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Tesla",
      model: "Model X",
    },
    {
      plat: "AB 7890 CD",
      image:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      brand: "Volkswagen",
      model: "Polo",
    },
  ];

  if (!isMounted) return null; // Hindari perbedaan antara server dan client

  const handleClick = (index: number) => () => {
    const platNomor = imagesData[index].plat.trim().replace(/\s/g, "");
    router.push(`/result?platNomor=${platNomor}`);
  };

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <Card
              onClick={handleClick(index)}
              className={`embla__slide ${
                index === selectedIndex
                  ? "border-[10px] border-white origin-center relative z-10"
                  : "border-[10px] border-transparent"
              } cursor-pointer`}
              key={index}
            >
              <CardContent className="relative flex items-center justify-center p-0 w-full h-full overflow-hidden">
                <Image
                  src={imagesData[index].image}
                  alt="Carousel Image"
                  width={450}
                  height={300}
                  className="w-full h-full object-cover bg-center"
                />
                <div className="font-rubik h-1/2 flex flex-col justify-end absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/50 to-transparent">
                  <h1 className="text-white text-[clamp(24px,3vw,40px)] font-medium leading-none">
                    {imagesData[index].plat}
                  </h1>
                  <p className="text-white text-[clamp(20px,3vw,24px)]">
                    {imagesData[index].brand} {imagesData[index].model}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot ${
                index === selectedIndex ? " embla__dot--selected" : ""
              }`}
            />
          ))}
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

export default EmblaCarousel;
