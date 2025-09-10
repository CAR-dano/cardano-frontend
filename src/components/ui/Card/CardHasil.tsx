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
      className="w-full bg-white rounded-2xl card-data-shadow p-4 sm:p-6 lg:pl-10 lg:pr-6 lg:py-6"
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 font-rubik">
        {/* Left Section - Indikasi */}
        <motion.div
          className="relative w-full lg:w-1/2 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-black text-[clamp(24px,4vw,48px)] font-medium mb-3 lg:mb-0">
            Indikasi*
          </h1>
          <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6 mt-2 lg:mt-5">
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
                iconYes: "/assets/icon/indikasiodometerreset.png",
                iconNo: "/assets/icon/tidakodometerreset.png",
                title: "Odometer Reset",
                description: inspectionSummary.indikasiOdometerReset,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-3 sm:gap-4 lg:gap-5 items-center text-neutral-900"
              >
                <Image
                  src={item.description ? item.iconYes : item.iconNo}
                  alt="icon"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-[16px] lg:rounded-[20px] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="text-[clamp(18px,4vw,32px)] font-light leading-tight">
                    {item.title}
                  </h1>
                  <p
                    className={`text-[clamp(28px,6vw,48px)] font-bold leading-tight ${
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

        {/* Right Section - Penilaian */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col gap-4 lg:gap-3 text-left text-neutral-900"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h1 className="text-black text-[clamp(24px,4vw,48px)] font-medium">
            Penilaian*
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 text-neutral-900">
            {/* Individual Scores Grid */}
            <div className="w-full sm:w-1/2">
              <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 lg:gap-x-8 gap-y-4 lg:gap-y-5">
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
                  <div key={index} className="flex flex-col gap-2 items-center">
                    <h1 className="text-[clamp(14px,3vw,24px)] font-light text-center leading-tight h-10 flex items-center justify-center">
                      {item.title}
                    </h1>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#FF7D43] rounded-xl lg:rounded-2xl flex justify-center items-center">
                      <p className="text-[clamp(24px,5vw,40px)] lg:text-[clamp(32px,3vw,48px)] font-bold text-white">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Rating */}
            <div className="w-full sm:w-1/2 flex flex-col justify-center items-center">
              <p className="text-[clamp(16px,3vw,24px)] font-light text-center mb-4">
                Penilaian Keseluruhan
              </p>
              <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-[#A25DF9] rounded-2xl flex justify-center items-center">
                <p className="text-[clamp(56px,8vw,80px)] lg:text-[clamp(64px,6vw,96px)] font-bold text-white">
                  {getGradeLabel(overallRating)}
                </p>
              </div>
            </div>
          </div>

          <p className="text-neutral-700 text-[clamp(14px,3vw,24px)] font-light mt-2">
            *Kriteria Penilaian dapat dicek pada dokumen lengkap{" "}
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
