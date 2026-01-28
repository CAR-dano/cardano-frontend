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
import { getInspectionPhotoUrl } from "../../../lib/utils/photoUrl";

import "./embla.css";
import { useRouter } from "next/navigation";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
};

const IMAGE_URL = process.env.NEXT_PUBLIC_PDF_URL;

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

  if (!isMounted) return null; // Hindari perbedaan antara server dan client

  const handleClick = (plateNumber: string) => () => {
    router.push(`/result?platNomor=${plateNumber}`);
  };

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((data, index) => (
            <Card
              onClick={handleClick(data.vehiclePlateNumber)}
              className={`embla__slide ${
                index === selectedIndex
                  ? "border-[10px] border-white origin-center relative z-10"
                  : "border-[10px] border-transparent"
              } cursor-pointer`}
              key={index}
            >
              <CardContent className="relative flex items-center justify-center p-0 w-full h-full overflow-hidden">
                <Image
                  src={getInspectionPhotoUrl(data.photo.path, IMAGE_URL)}
                  alt="Carousel Image"
                  width={450}
                  height={300}
                  className="w-full h-full object-cover bg-center"
                />
                <div className="font-rubik h-1/2 flex flex-col justify-end absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/50 to-transparent">
                  <h1 className="text-white text-[clamp(24px,3vw,40px)] font-medium leading-none">
                    {data.vehiclePlateNumber}
                  </h1>
                  <p className="text-white text-[clamp(20px,3vw,24px)]">
                    {data.merekKendaraan} {data.tipeKendaraan}
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
