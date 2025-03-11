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

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ slides, options }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

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

  const imageSlides = [
    "https://plus.unsplash.com/premium_photo-1661299284368-eb544e14fcdf?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1562232661-b9429e20f13a?w=900&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1661502828652-13e709b751c7?w=900&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1661504711778-e5823d64a41e?w=900&auto=format&fit=crop&q=60",
    "https://plus.unsplash.com/premium_photo-1661504711778-e5823d64a41e?w=900&auto=format&fit=crop&q=60",
  ];

  if (!isMounted) return null; // Hindari perbedaan antara server dan client

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <Card
              className={`embla__slide ${
                index === selectedIndex ? "border-[10px] border-white" : ""
              }`}
              key={index}
            >
              <CardContent className="flex items-center justify-center p-0 w-full h-full overflow-hidden">
                <Image
                  src={imageSlides[index]}
                  alt="Carousel Image"
                  width={450}
                  height={300}
                  className="w-full h-full object-cover"
                />
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
