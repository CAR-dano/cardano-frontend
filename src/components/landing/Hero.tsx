"use client";

import Image from "next/image";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SearchBar from "../ui/SearchBar";
import CarComponent from "../ui/CarAnimation";

function Hero() {
  const { scrollYProgress } = useScroll();

  // Animasi scroll untuk teks utama
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center mx-auto">
      {/* Hero Section */}
      <div className="h-[80vh] lg:h-[90vh] relative w-full flex flex-col items-center justify-center custom-height hero-shadow rounded-b-[50px] lg:rounded-b-[80px] mb-[80px] overflow-hidden z-10 bg-[url('/assets/pattern/bghero.png')] bg-cover bg-center">
        {/* Background Pattern */}
        <div className="hidden lg:block absolute bottom-0 right-0 z-[-1]">
          <Image
            src="/assets/pattern/dotinhero.svg"
            width={400}
            height={400}
            alt="Background pattern"
            className="w-auto"
          />
        </div>

        <div className="absolute bottom-16 right-0 z-[-1] md:hidden block translate-x-1/2 -translate-y-1/2">
          <Image
            src="/assets/pattern/dotinhero.svg"
            width={400}
            height={400}
            alt="Background pattern"
            className="w-auto"
          />
        </div>

        <motion.div
          className="flex flex-col items-center justify-center flex-grow"
          style={{ y: textY, opacity: textOpacity }} // Efek paralaks teks
        >
          <h1 className="text-[32px] md:text-[48px] font-rubik text-orange-600 text-center font-light">
            Cek Plat Nomor
          </h1>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-black text-center">
            Masukkan plat nomor kendaraan untuk melihat <br /> riwayat inspeksi
            berbasis blockchain
          </p>
          <SearchBar value="" />

          {/* Gambar Mobil dengan Animasi */}
          <CarComponent />

          {/* Slogan */}
          <motion.div
            className="flex items-center justify-center mt-16 gradient-powered-by font-rubik py-2 px-5 rounded-[64px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }} // Efek fade-in
          >
            <p className="text-white text-sm md:text-lg lg:text-xl mr-2">
              Powered by
            </p>
            <Image
              src="/assets/logo/cardano-vertical-white.svg"
              width={120}
              height={24}
              alt="Cardano Logo"
              className="w-auto"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Pattern */}
      <motion.div
        className="h-[10vh] md:h-[2vh] w-full flex items-center justify-center absolute -bottom-[15px] md:bottom-0 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.8 }} // Efek fade-in
      >
        <Image
          src="/assets/pattern/bottomhero.svg"
          width={1920}
          height={400}
          alt="Decorative bottom pattern for hero section"
          className="w-full opacity-50 md:opacity-30"
        />
      </motion.div>
    </div>
  );
}

export default Hero;
