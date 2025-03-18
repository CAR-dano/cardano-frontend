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
        "https://s3-alpha-sig.figma.com/img/8eab/d576/54c7c654f41553198f5578ab5789116e?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=q6ayIdZHrwC5-AqQgqc-CDiqYS2H5vZll3-fDomNBp1hcJR6XJ0csnoB8NJVyF3zIhyH9yKC9KAyVvY0f898tf-RIk5HfLcq4Cic8g1c4ztg0JFcpNcTD8HA-LHgZIPtukZeIMwA0CskpR-sjzcQdvVKsUCR3ZQCq5AsTT34EPj~sAMb42zuYsPgitVGIq2cP-ZhsgYdMfe-5OVsUDKrR4ikZzZAZmErjKIIClFFmZwFM9H6VHzK4E-7n0UhDpcug5W3Nj3Mf0aLkMCjHI044BK4GmaQ3ITUGgVorrxs6vmJvg3KtWOQJ1PsMFGELq0x6ywRpph4kxla2vUAGetZOQ__",
      brand: "Mitsubishi",
      model: "Expander 1.5 Ultimate",
    },
    {
      plat: "AB 1345 CF",
      image:
        "https://s3-alpha-sig.figma.com/img/9a8d/be06/db9d9d1d58fd737e76faf7d4103d17c5?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pxWorSGoIEwxtNMJ5hMJ5a3g76A~DNAQfUkbfCxhU5aZ2etOS6Ac4uL6KpZJkcRW-Cxyi0-zkf2qW9vWL5EsGBF-PA1y78xXXAQpgGm8JpmG-Voaer7c5QSk4sqodUBt~xFPeqx7YVaAfb1scBE1OmGCeYOvbUgg849cZmC01440Ac1Yk9fgc7F7yjavNnfzP4igcSJPVpyhixShhLk3oSH9GDy7v8AjCJ-oDrejXyVCHKciVekuyUGTSiUM4zBsRe39ze1w5sCoGAJ~PXcEKlZxBI2D5TTpFXdVNdeBbOgQCZf~pj-nQAS62wZEgvikyF5tXRM-0rNj8~-3WmZ1Cw__",
      brand: "BMW",
      model: "7 Series",
    },

    {
      plat: "AB 1234 ABC",
      image:
        "https://s3-alpha-sig.figma.com/img/7808/8c27/ae6fbc8e69411409a265c81edbbfa16f?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=npzyTYlvImBxwONmJByERez1sO7WQqpvVVMwdoN9eBlzNlny3aAmcTxxvTHwup2sfs5kYX6OVycGr9XtTLwBcjcZ~Vm7LdoYFT3R2Xqip~9B4mhJLqI3Df5LJb54s1m9OzC8bgzccF8hjuHD2EOAJJza~ZDhn1IlBLlN52XUJ1LcnMxtbXsjXvb-HUVymhgsnutDOg9RJgXRKf6tXmkAIt2pGAz1qUoCH65thciSa~u7WbzgPrK1uBBz3ITSmG8Qfld0dgFcgdhqssDqoQ76~XDykH2w9pvWe1clKuzKrRuXns-FlO5Nxg~0vPkF2igdvSY6LX-T61VdVXxyf16eXQ__",
      brand: "Audy",
      model: "A5",
    },
    {
      plat: "AB 1234 XYZ",
      image:
        "https://s3-alpha-sig.figma.com/img/b484/376d/4862bafbe464af5328be82cc6417b1ab?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=maJq8bPdpjnsvu0GejEq7sBRq~JJOWQgkaGmJ52oQnF4akIzCJP3pGwHWLU9dpmNMDsvIWx1rwOVtkbXvncLWs6JKk0zVKJ9F85jRnzf80kvjWTDezJJY2zp8ZArgYvzKS39LAgmjw~RAjWo2vEI-85FeVNExl86GwKlC8NGWluGwFRw8jq~sd38cnMzxrYrx2O6ku2~K9414iirej8qg2Fmu9hI-p3WIT8d0GMajqJjdFutY4drGJLgOHjNWqgzzpa9MMyX9McuiAAluLp6b5OTwK~M9Ez2n9gL~p2xspshxDxloQl558pLUrMrBg4fCQq0MJPFLuGmCMdpUBo8gg__",
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
                  className="w-full h-auto object-cover bg-center"
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
