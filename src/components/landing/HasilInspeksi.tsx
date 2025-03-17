"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EmblaOptionsType } from "embla-carousel";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Awal animasi: opacity 0 & turun ke bawah
      whileInView={{ opacity: 1, y: 0 }} // Saat masuk viewport: opacity 1 & naik ke posisi normal
      transition={{ duration: 0.8, ease: "easeOut" }} // Durasi animasi smooth
      viewport={{ once: true }} // Animasi hanya berjalan sekali
      className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center py-10 px-0"
      style={{ backgroundImage: bgImage }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-yellow-900 font-rubik text-3xl md:text-4xl font-medium text-center mb-6 md:mb-10"
      >
        Cek Hasil Inspeksi Kami!
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full"
      >
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </motion.div>
    </motion.div>
  );
}

export default HasilInspeksi;
