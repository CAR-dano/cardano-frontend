"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EmblaOptionsType } from "embla-carousel";

const EmblaCarousel = dynamic(() => import("../ui/Carousel/Carousel"), {
  ssr: false, // Hindari SSR untuk komponen Carousel
});

function HasilInspeksi() {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const [bgImage, setBgImage] = useState("");

  useEffect(() => {
    setBgImage("url('/assets/pattern/inspeksi.png')");
  }, []);

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-10 px-0"
      style={{ backgroundImage: bgImage }}
    >
      <h1 className="text-yellow-900 font-rubik text-3xl md:text-4xl font-medium text-center mb-6 md:mb-10">
        Cek Hasil Inspeksi Kami!
      </h1>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}

export default HasilInspeksi;
