"use client";

import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { motion, useScroll, useTransform } from "framer-motion";

function Hero() {
  const { scrollYProgress } = useScroll();
  const xPos = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);

  window.addEventListener("resize", () => {
    console.log(`Tinggi viewport: ${window.innerHeight}px`);
  });

  return (
    <div className="relative w-full flex flex-col items-center justify-center mx-auto">
      {/* Hero Section */}
      <div className="h-[90vh] relative w-full flex flex-col items-center justify-center custom-height hero-shadow rounded-b-[50px] lg:rounded-b-[80px] mb-[80px] overflow-hidden z-10 bg-[url('/assets/pattern/bghero.png')] bg-cover bg-center">
        {/* Background Pattern */}
        <div className="absolute bottom-0 right-0 z-[-1] hidden md:block">
          <Image
            src="/assets/pattern/dotinhero.svg"
            width={400}
            height={400}
            alt="Background pattern"
            className="w-auto"
          />
        </div>

        <div className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-[32px] md:text-[48px] font-rubik text-orange-600 text-center font-light">
            Cek Plat Nomor
          </h1>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-black text-center">
            Masukkan plat nomor kendaraan untuk melihat <br /> riwayat inspeksi
            berbasis blockchain
          </p>

          {/* Input Pencarian */}
          <div className="relative w-full max-w-sm md:max-w-lg mt-6 mb-6 search-box-shadow">
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
            className="mt-10 w-full flex justify-center"
            initial={{ x: "-100vw" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ x: xPos }}
          >
            <Image
              src="/assets/car-illustration.svg"
              width={640}
              height={500}
              alt="Illustration of a car"
              priority
              className="w-auto max-w-[90%] md:max-w-[640px]"
            />
          </motion.div>

          {/* Slogan */}
          <div className="flex items-center justify-center mt-6 gradient-powered-by font-rubik py-2 px-5 rounded-[64px]">
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
