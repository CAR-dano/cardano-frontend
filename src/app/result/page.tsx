"use client";

import CardData from "@/components/ui/Card/CardData";
import SearchBar from "@/components/ui/SearchBar";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import dataCar from "@/utils/exampledata.json";
import CardHasil from "@/components/ui/Card/CardHasil";
import Image from "next/image";
import CustomButton from "@/components/ui/CustomButton";
import MadeByCardano from "@/components/ui/MadeByCardano";

function ResultPageContent() {
  const searchParams = useSearchParams();
  const data = dataCar;

  function formatPlatNomor(plat: string) {
    if (!plat) return "";
    return plat.replace(/([A-Z]+)(\d+)([A-Z]+)/, "$1 $2 $3");
  }

  const [platNomor, setPlatNomor] = React.useState<string | null>(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const platNomorParam = params.get("platNomor");
    if (!platNomorParam) {
      window.location.href = "/";
    } else {
      setPlatNomor(platNomorParam);
    }
  }, []);

  if (!platNomor) {
    return null; // loading
  }

  return (
    <div className="font-rubik w-full relative flex flex-col items-center px-4 lg:px-10 mb-20">
      <SearchBar value={platNomor} />

      {/* Data kendaraan */}
      <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-end text-neutral-900 font-light mb-2 lg:mb-5">
        <p className="text-[clamp(24px,3vw,36px)]">Data Kendaraan</p>
        <p className="text-[clamp(16px,3vw,24px)]">
          *Tanggal Inspeksi:
          <span className="text-[clamp(16px,3vw,24px)] font-medium">
            {" "}
            5 Maret 2025
          </span>
        </p>
      </div>

      {/* Card Data Kendaraan */}
      <CardData platNomor={formatPlatNomor(platNomor)} data={data.data} />

      {/* Hasil Inspeksi */}
      <div className="w-full flex justify-between items-end text-neutral-900 font-light mt-10 mb-0 lg:mb-5">
        <p className="text-[clamp(32px,3vw,36px)]">Hasil Inspeksi</p>
      </div>

      {/* Card Hasil Inspeksi */}
      <CardHasil
        penilaian={data.hasil.penilaian}
        indikasi={data.hasil.indikasi}
      />

      {/* Download data */}
      <div className="w-full flex justify-center lg:justify-between items-end text-neutral-900 font-light mt-5 lg:mt-10 mb-5">
        <p className="hidden lg:block w-1/2 text-4xl">
          Download laporan inspeksi lengkap <br /> (19 halaman PDF)
        </p>
        <div className="z-10 flex flex-wrap justify-start items-center gap-3 sm:gap-5 mt-4 sm:mt-5">
          <Image
            src="/assets/logo/pdf.svg"
            alt="PDF Icon"
            width={65}
            height={65}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
          />
          <CustomButton className="text-[clamp(16px,3vw,28px)] font-white font-light rounded-full gradient-details text-white">
            Download Detail (PDF)
          </CustomButton>
        </div>
      </div>

      {/* Made by Cardano */}
      <MadeByCardano />
    </div>
  );
}

// **Gunakan Suspense di sini**
export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPageContent />
    </Suspense>
  );
}
