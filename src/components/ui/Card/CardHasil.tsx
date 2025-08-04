import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function CardHasil({ inspectionSummary, overallRating, urlPdf }: any) {
  function getGradeLabel(score: number): string {
    const gradingScale: { [key: number]: string } = {
      0: "-",
      1: "E",
      2: "D-",
      3: "D",
      4: "C-",
      5: "C",
      6: "B-",
      7: "B",
      8: "B+",
      9: "A-",
      10: "A",
    };

    return gradingScale[score] ?? "Skor tidak valid";
  }

  const PDF_URL = process.env.NEXT_PUBLIC_PDF_URL;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full bg-white rounded-2xl card-data-shadow p-0 lg:pl-10 py-0 lg:py-6"
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
                iconYes: "/assets/icon/bekastabrak.png",
                iconNo: "/assets/icon/tidakbekastabrak.png",
                title: "Bekas Tabrakan",
                description: inspectionSummary.indikasiTabrakan,
              },
              {
                iconYes: "/assets/icon/bekasbanjir.png",
                iconNo: "/assets/icon/tidakbekasbanjir.png",
                title: "Bekas Banjir",
                description: inspectionSummary.indikasiBanjir,
              },
              {
                iconYes: "/assets/icon/odometerreset.png",
                iconNo: "/assets/icon/tidakodometer.png",
                title: "Odometer Reset",
                description: inspectionSummary.indikasiOdometerReset,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-5 items-center text-neutral-900"
              >
                <Image
                  src={item.description ? item.iconYes : item.iconNo}
                  alt="icon"
                  width={80}
                  height={80}
                  className={`w-20 h-20 lg:w-24 lg:h-24  rounded-[20px]  
            `}
                />
                <div>
                  <h1 className="text-[clamp(24px,3vw,32px)] font-light ">
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
              <div className="grid grid-cols-2 gap-x-5 lg:gap-x-8 gap-y-3.5 lg:gap-y-5">
                {[
                  {
                    title: "Mesin",
                    description: getGradeLabel(inspectionSummary.mesinScore),
                  },
                  {
                    title: "Eksterior",
                    description: getGradeLabel(
                      inspectionSummary.eksteriorScore
                    ),
                  },
                  {
                    title: "Interior",
                    description: getGradeLabel(inspectionSummary.interiorScore),
                  },
                  {
                    title: "Kaki-kaki",
                    description: getGradeLabel(inspectionSummary.kakiKakiScore),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col gap-1 items-center">
                    <h1 className="text-[clamp(20px,3vw,34px)] font-light ">
                      {item.title}
                    </h1>
                    <div className="w-20 lg:w-24 aspect-square bg-[#FF7D43] rounded-2xl flex justify-center items-center">
                      <p className="text-[clamp(48px,3vw,60px)] font-bold text-white">
                        {item.description}
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
                <p className="text-9xl font-bold text-white">
                  {getGradeLabel(overallRating)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-neutral-700 text-[clamp(16px,3vw,24px)] font-light">
            *Kriteria Penilaian dapat dicek pada <br /> dokumen lengkap{" "}
            <a
              href={`${PDF_URL}${urlPdf}`}
              className="cursor-pointer font-bold underline"
            >
              berikut
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CardHasil;
