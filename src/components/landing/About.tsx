"use client";
import Image from "next/image";
import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import CustomButton from "../ui/CustomButton";

const images = [
  "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 font-rubik my-20 px-4 md:px-20 lg:px-28">
      {/* Carousel Image */}
      <div className="relative w-full md:w-1/2 overflow-hidden rounded-[24px] md:rounded-[48px] shadow-lg">
        <div className="relative flex w-full h-[300px] md:h-[480px] items-center justify-center">
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
                className="object-cover rounded-lg"
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
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-orange-600" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full md:w-1/2 flex flex-col gap-3 text-left md:text-left">
        <h1 className="font-light text-black text-4xl md:text-5xl">
          We are independent
        </h1>
        <h2 className="text-orange-600 text-xl md:text-2xl font-medium">
          Description Value 1
        </h2>
        <p className="text-lg text-neutral-700 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus.
        </p>
        <div className="flex justify-center md:justify-end mt-5">
          <CustomButton className="text-white bg-gradient-to-r from-orange-500 to-purple-500 text-xl font-bold py-4 px-6 rounded-lg">
            Take a Ride!
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default About;
