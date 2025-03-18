import React from "react";
import { motion } from "framer-motion";

function CardHasil({ data }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full bg-white rounded-2xl card-data-shadow p-0 lg:px-5 py-0 lg:py-6"
    >
      <div className="flex flex-col md:flex-row gap-10 font-rubik">
        {/* Carousel Image */}
        <motion.div
          className="relative w-full md:w-1/2 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-black text-[clamp(32px,3vw,48px)] font-medium">
            Indikasi*
          </h1>
          <div className="flex flex-col gap-2 lg:gap-6 mt-2 lg:mt-5 px-5 lg:px-0">
            {[
              {
                icon: "/assets/icon/bekastabrak.svg",
                title: "Bekas Tabrakan",
                description: data.indikasi.bekastabrakan,
              },
              {
                icon: "/assets/icon/bekasbanjir.svg",
                title: "Bekas Banjir",
                description: data.indikasi.bekasbanjir,
              },
              {
                icon: "/assets/icon/odometerreset.svg",
                title: "Odometer Reset",
                description: data.indikasi.odometerreset,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-5 items-center text-neutral-900"
              >
                <img
                  src={item.icon}
                  alt="icon"
                  className="w-20 h-20 lg:w-24 lg:h-24"
                />
                <div>
                  <h1 className="text-[clamp(24px,3vw,32px)] font-light">
                    {item.title}
                  </h1>
                  <p
                    className={`text-[clamp(40px,3vw,48px)] font-bold ${
                      item.description ? "text-[#F469A8]" : "text-[#30B6ED]"
                    }`}
                  >
                    {item.description ? "Iya" : "Tidak"}
                  </p>
                </div>
              </div>
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
          <h1 className="text-black text-[clamp(32px,3vw,48px)] font-medium">
            Penilaian*
          </h1>

          <div className="flex flex-row gap-5 text-neutral-900">
            <div className="w-1/2">
              <div className="flex flex-wrap gap-x-5 lg:gap-x-12 gap-y-3.5 lg:gap-y-5">
                {[
                  {
                    title: "Mesin",
                    description: data.penilaian.kondisimesin,
                  },
                  {
                    title: "Eksterior",
                    description: data.penilaian.kondisieksterior,
                  },
                  {
                    title: "Interior",
                    description: data.penilaian.kondisiinterior,
                  },
                  {
                    title: "Kaki-kaki",
                    description: data.penilaian.kondisikakikaki,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col gap-1 items-center">
                    <h1 className="text-[clamp(20px,3vw,34px)] font-light ">
                      {item.title}
                    </h1>
                    <div className="w-20 lg:w-24 aspect-square bg-[#FF7D43] rounded-2xl flex justify-center items-center">
                      <p className="text-[clamp(48px,3vw,60px)] font-bold text-white">
                        D
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <p className="text-[clamp(24px,3vw,43px)] font-light">
                Penilaian Keseluruhan
              </p>
              <div className="w-44 lg:w-48 aspect-square bg-[#A25DF9] rounded-2xl flex justify-center items-center">
                <p className="text-9xl font-bold text-white">D</p>
              </div>
            </div>
          </div>

          <p className="text-neutral-700 text-[clamp(16px,3vw,24px)] font-light">
            *Kriteria Penilaian dapat dicek pada <br /> dokumen lengkap{" "}
            <span className="cursor-pointer font-bold underline">berikut</span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CardHasil;
