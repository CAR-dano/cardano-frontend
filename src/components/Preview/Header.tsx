import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-start items-center gap-2 px-5">
      <Image
        src="/assets/logo/palapa.svg"
        alt="Logo"
        width={115}
        height={115}
      />
      <div className="flex flex-col items-start">
        <h1 className="text-[18px] font-bold text-[#F4622F]">
          PT INSPEKSI MOBIL JOGJA
        </h1>
        <h1 className="text-[18px] font-bold">
          LAPORAN HASIL INSPEKSI KENDARAAN
        </h1>
      </div>
    </div>
  );
}

export default Header;
