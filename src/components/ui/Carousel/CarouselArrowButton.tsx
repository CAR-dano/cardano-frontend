"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi || !isMounted) return;
    emblaApi.scrollPrev();
  }, [emblaApi, isMounted]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi || !isMounted) return;
    emblaApi.scrollNext();
  }, [emblaApi, isMounted]);

  const onSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (!isMounted) return;
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    },
    [isMounted]
  );

  useEffect(() => {
    if (!emblaApi || !isMounted) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect, isMounted]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton: React.FC<React.ComponentPropsWithRef<"button">> = (
  props
) => {
  return (
    <button
      className="embla__button embla__button--prev"
      type="button"
      {...props}
    >
      <IoChevronBack className="embla__button__svg" />
      {props.children}
    </button>
  );
};

export const NextButton: React.FC<React.ComponentPropsWithRef<"button">> = (
  props
) => {
  return (
    <button
      className="embla__button embla__button--next"
      type="button"
      {...props}
    >
      <IoChevronForward className="embla__button__svg" />
      {props.children}
    </button>
  );
};
