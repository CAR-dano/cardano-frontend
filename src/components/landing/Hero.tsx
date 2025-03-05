import Image from "next/image";
import React from "react";
import { IoSearch } from "react-icons/io5";

function Hero() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[90vh] px-4">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-[32px] md:text-[54px] font-rubik text-orange-600 text-center font-light">
          Cek Plat Nomor
        </h1>

        {/* Input Pencarian */}
        <div className="relative w-full max-w-[570px] mt-6 mb-6 search-box-shadow">
          <IoSearch
            size={24}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500"
          />
          <input
            className="border-2 border-orange-500 rounded-xl py-3 pl-12 pr-5 w-full text-lg outline-none focus:ring-2 focus:ring-orange-300
                  placeholder:text-neutral-500 placeholder:font-bold"
            type="text"
            placeholder="Search here..."
          />
        </div>

        {/* Gambar Mobil */}
        <div className="max-w-xs md:max-w-md lg:max-w-lg mb-6">
          <Image
            src="/assets/car-illustration.svg"
            width={720}
            height={570}
            alt="Car"
            className="w-full h-auto"
          />
        </div>

        {/* Slogan */}
        <h1 className="font-pacifico text-4xl md:text-6xl text-orange-400 text-center">
          Slogan Here
        </h1>
      </div>
    </div>
  );
}

export default Hero;
