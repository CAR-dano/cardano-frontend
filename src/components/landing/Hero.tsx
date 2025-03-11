"use client";

import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { motion, useScroll, useTransform } from "framer-motion";

function Hero() {
  const { scrollYProgress } = useScroll();
  const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="relative w-full flex flex-col items-center justify-center h-[78vh] px-4 hero-shadow  rounded-b-[60px] lg:rounded-b-[89px] mb-[100px] overflow-hidden z-10 bg-[url('/assets/pattern/bghero.png')] bg-cover bg-center">
        {/* Background Pattern */}
        <div className="absolute bottom-0 right-0 z-[-1]">
          <Image
            src="/assets/pattern/dotinhero.svg"
            width={450}
            height={450}
            alt="Background pattern for hero section"
            className="w-auto"
          />
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-[36px] md:text-[54px] font-rubik text-orange-600 text-center font-light">
            Cek Plat Nomor
          </h1>

          {/* Input Pencarian */}
          <div className="relative w-full max-w-xs md:max-w-md mt-6 mb-6 search-box-shadow">
            <IoSearch
              size={24}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
            />
            <input
              className="border-2 border-orange-500 rounded-xl py-3 pl-12 pr-5 w-full text-lg outline-none focus:ring-2 focus:ring-orange-300 placeholder:text-neutral-500 placeholder:font-semibold"
              type="text"
              placeholder="Search here..."
            />
          </div>

          {/* Gambar Mobil dengan Animasi */}
          <motion.div
            className="mt-10"
            initial={{ x: "-100vw" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ x: xPos }}
          >
            <Image
              src="/assets/car-illustration.svg"
              width={720}
              height={570}
              alt="Illustration of a car for plate number checking"
              priority
              className="w-auto max-w-full md:w-[720px]"
            />
          </motion.div>

          {/* Slogan */}
          <div className="flex items-center justify-center mt-6 gradient-powered-by font-rubik py-2 px-5 rounded-[64px]">
            <p className="text-white text-sm md:text-xl mr-2">Powered by</p>
            <Image
              src="/assets/logo/cardano-vertical-white.svg"
              width={140}
              height={28}
              alt="Cardano Logo"
              className="w-auto"
            />
          </div>
        </div>
      </div>

      {/* Bottom Pattern */}
      <div className="h-[10vh] md:h-[2vh] w-full flex items-center justify-center absolute bottom-[20px] md:bottom-0 z-[-1]">
        <Image
          src="/assets/pattern/bottomhero.svg"
          width={1920}
          height={200}
          alt="Decorative bottom pattern for hero section"
          className="w-full opacity-50 md:opacity-30"
        />
      </div>
    </div>
  );
}

export default Hero;
