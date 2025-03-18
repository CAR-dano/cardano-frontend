"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

function CardData({ platNomor, data }: any) {
  const images = data.gambar;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full bg-white rounded-2xl card-data-shadow p-0 lg:px-5 py-2 lg:py-6"
    >
      <div className="flex flex-col md:flex-row gap-10 font-rubik">
        {/* Carousel Image */}
        <motion.div
          className="relative w-full md:w-1/2 overflow-hidden rounded-[24px] md:rounded-[20px] shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative flex w-full h-[300px] md:h-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full h-full"
              >
                <Image
                  src={images[currentIndex]}
                  alt="slider image"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Navigasi Carousel */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 text-neutral-500"
          >
            <IoChevronBack size={50} className="md:size-20" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 text-neutral-500"
          >
            <IoChevronForward size={50} className="md:size-20" />
          </button>
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_: any, index: any) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-10 h-3 bg-orange-600"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col gap-3 text-left md:text-left text-neutral-900"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h1 className="gradient-title-plat text-[clamp(40px,3vw,48px)] font-rubik font-bold leading-none">
            {platNomor}
          </h1>
          <h2 className="text-[clamp(32px,3vw,36px)]  font-medium">
            {data.brand} <br className="lg:hidden block" />
            <span className="font-light">{data.model}</span>
          </h2>

          <div className="flex justify-between items-center">
            <div className="w-[40%] lg:w-1/2 space-y-2.5">
              {[
                {
                  icon: "/assets/icon/tahun.svg",
                  title: "Tahun",
                  value: data.tahun,
                },
                {
                  icon: "/assets/icon/odometer.svg",
                  title: "Odometer",
                  value: data.odometer,
                },
                {
                  icon: "/assets/icon/warna.svg",
                  title: "Warna",
                  value: data.warna,
                },
                {
                  icon: "/assets/icon/kepemilikan.svg",
                  title: "Kepemilikan",
                  value: data.kepemilikan,
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Image
                    src={item.icon}
                    alt=""
                    width={50}
                    height={50}
                    className="w-9 h-9 md:w-[50px] md:h-[50px]"
                  />
                  <div className="flex flex-col">
                    <p className="text-[clamp(16px,3vw,20px)] font-light">
                      {item.title}
                    </p>
                    <p className="text-[clamp(20px,3vw,24px)] font-medium">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[60%] lg:w-1/2 space-y-2.5">
              {[
                {
                  icon: "/assets/icon/transmisi.svg",
                  title: "Transmisi",
                  value: data.transmisi,
                },
                {
                  icon: "/assets/icon/pajak.svg",
                  title: "Pajak 1 Tahun",
                  value: data.pajak1tahun,
                },
                {
                  icon: "/assets/icon/pajak.svg",
                  title: "Pajak 5 Tahun",
                  value: data.pajak5tahun,
                },
                {
                  icon: "/assets/icon/biaya.svg",
                  title: "Biaya Pajak",
                  value: data.biayapajak,
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Image
                    src={item.icon}
                    alt=""
                    width={50}
                    height={50}
                    className="w-9 h-9 md:w-[50px] md:h-[50px]"
                  />
                  <div className="flex flex-col">
                    <p className="text-[clamp(16px,3vw,20px)] font-light">
                      {item.title}
                    </p>
                    <p className="text-[clamp(20px,3vw,24px)] font-medium">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CardData;
