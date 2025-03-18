"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import CustomButton from "../ui/CustomButton";

export default function HowTo() {
  return (
    <div className="relative flex flex-col gap-6 px-10 lg:px-20 font-rubik mb-24">
      {/* Decoration */}
      <div className="overflow-hidden">
        <Image
          src="/assets/pattern/dot2.svg"
          alt=""
          width={550}
          height={100}
          className="z-0 right-0 top-0 absolute transform -translate-y-1/2"
        />
        <Image
          src="/assets/pattern/dot1.svg"
          alt=""
          width={1100}
          height={100}
          className="z-0 left-0 bottom-0 absolute transform -translate-x-1/2 translate-y-1/2 "
        />
      </div>

      {/* Content */}
      <div className="w-full flex flex-col lg:flex-row items-stretch gap-10">
        {/* Left */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <ol className="relative border-s-[10px] border-purple-100 px-5 z-10 flex-1">
            {/* Step 1 */}
            <li className="ms-4 mb-10">
              <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-[#FF7D43] howto-shadow"></div>
              <h3 className="text-black text-xl md:text-2xl lg:text-4xl font-semibold ">
                Search
              </h3>
              <div className="mt-4 border-[#B175FF] rounded-md">
                <Image
                  src={"/assets/examplesearch.svg"}
                  alt=""
                  width={300}
                  height={56}
                  className="w-full max-w-xs md:max-w-sm"
                />
              </div>
            </li>
            {/* Step 2 */}
            <li className="ms-4 mb-10">
              <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-[#e57f7f] howto-shadow"></div>
              <h3 className="text-black text-xl md:text-2xl lg:text-4xl font-semibold ">
                Check
              </h3>
              <div className="relative mt-4 border-[#B175FF] rounded-md">
                <Image
                  src={"/assets/lambo.png"}
                  alt=""
                  width={400}
                  height={400}
                  className="w-full aspect-[4/3] max-w-xs md:max-w-sm rounded-[20px]"
                />
              </div>
            </li>
            {/* Step 3 */}
            <li className="ms-4">
              <div className="absolute w-5 h-5 bg-purple-100 rounded-full mt-1.5 start-[-15px] outline outline-[12px] outline-purple-500 howto-shadow"></div>
              <h3 className="text-black text-xl md:text-2xl lg:text-4xl font-semibold ">
                Found
              </h3>
            </li>
          </ol>
          <div className="z-10 ml-10 md:ml-16 flex flex-wrap justify-start items-center gap-3 sm:gap-5 mt-4 sm:mt-5">
            <Image
              src="/assets/logo/pdf.svg"
              alt="PDF Icon"
              width={65}
              height={65}
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
            />
            <CustomButton className="text-[clamp(16px,3vw,28px)] font-white font-light rounded-full gradient-details text-white">
              Get the details
            </CustomButton>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="hidden lg:block w-[5px] min-h-full gradient-powered-by rounded-full my-10"></div>
        <div className="block lg:hidden h-[5px] min-w-full gradient-powered-by rounded-full my-10"></div>

        {/* Right */}
        <motion.div
          className="flex flex-col items-start justify-center w-[90%] md:w-1/2 pl-8 sm:pl-12 sm:px-6 md:pl-16 gap-10 md:gap-14"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Inspected */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Image
              src="/assets/logo/exp.svg"
              alt="Car Icon"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-16 sm:h-16 md:w-[105px] md:h-[105px] object-contain"
            />
            <div className="flex flex-col md:items-center items-start">
              <div className="relative">
                <h1 className="inline font-semibold text-black leading-none text-[clamp(48px,8vw,96px)]">
                  175
                </h1>
              </div>
              <p className="text-orange-600 font-medium text-[clamp(16px,4vw,24px)] -mt-2 sm:-mt-3">
                Titik Pengecekan
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Image
              src="/assets/logo/car.svg"
              alt="Experience Icon"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain"
            />
            <div className="flex flex-col md:items-center items-start">
              <div className="relative">
                <h1 className="inline font-semibold text-black leading-none text-[clamp(48px,8vw,96px)]">
                  20
                </h1>
              </div>
              <p className="text-orange-600 font-medium text-[clamp(16px,4vw,24px)] -mt-2 sm:-mt-3">
                Merek Mobil
              </p>
            </div>
          </div>

          {/* Priority */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Image
              src="/assets/logo/no1.svg"
              alt="Priority Icon"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain"
            />
            <div className="flex flex-col md:items-start items-start">
              <div className="flex flex-row items-end">
                <p className="text-[#A25DF9] font-rubik text-[24px] md:text-[40px] font-medium leading-[64px]">
                  No.
                </p>

                <h1 className="-ml-0 md:-ml-4 inline font-semibold text-black lg:leading-none text-[clamp(48px,10vw,110px)]">
                  1
                </h1>
              </div>
              <p className="text-orange-600 font-medium text-[clamp(16px,4vw,24px)] -mt-5 sm:-mt-3">
                Di DIY & Jawa Tengah
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
