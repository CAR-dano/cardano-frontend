"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import MadeByCardano from "../ui/MadeByCardano";

function Core() {
  return (
    <div className="w-full font-rubik px-6 sm:px-10 md:px-24 mb-20 mt-0 md:mt-[200px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Core Items */}
        {[
          {
            src: "/assets/Core1.svg",
            num: "1",
            title: "Data Terverifikasi",
            desc: "Semua hasil inspeksi tersimpan di blockchain dan dapat dicek kapan saja",
            extraClass: "",
          },
          {
            src: "/assets/Core2.svg",
            num: "2",
            title: "Keamanan Terjamin",
            desc: "Tidak ada perubahan data atau manipulasi informasi setelah inspeksi",
            extraClass: "sm:-mt-6 md:-mt-16",
          },
          {
            src: "/assets/Core3.svg",
            num: "3",
            title: "Transaksi Lebih Aman",
            desc: "Hindari risiko mobil bermasalah dengan informasi transparan sebelum membeli.",
            extraClass: "",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center justify-center gap-8 sm:gap-10 ${item.extraClass}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Gambar hanya tampil di tablet & desktop */}
            <div className="hidden sm:block mb-10">
              <Image
                src={item.src}
                alt=""
                width={160}
                height={160}
                className="w-[100px] md:w-[160px] object-contain"
              />
            </div>

            <div className="relative w-full flex flex-col items-center">
              {/* Number Badge */}
              <div className="absolute -top-6 sm:-top-7 md:-top-8 w-14 aspect-square rounded-full bg-purple-400 border-2 sm:border-[3px] border-purple-300 flex justify-center items-center">
                <p className="text-4xl text-white font-bold">{item.num}</p>
              </div>

              {/* Content Box */}
              <div className="py-10 px-4 sm:px-6 flex flex-col gap-2 sm:gap-3 rounded-2xl justify-center w-full  md:w-[350px] h-[180px] md:h-[200px] bg-white card-core-shadow">
                <p className="text-center text-xl text-orange-600 font-semibold">
                  {item.title}
                </p>
                <p className="text-center text-lg text-neutral-700">
                  {item.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <MadeByCardano />
    </div>
  );
}

export default Core;
