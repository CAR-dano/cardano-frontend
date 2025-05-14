import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PenilaianHasil from "./PenilaianHasil";
import { console } from "inspector";

function Halaman7({ data }: any) {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  return (
    <div className="px-[30px]">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-8">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Hasil Pengecekan Ketebalan Cat
            </p>
          </div>
        </div>

        <div className="w-full relative pt-10 flex justify-center">
          <img
            src="/assets/inspection/ketebalanDepan.svg"
            alt=""
            className="w-1/2"
          />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-black font-bold text-2xl">
            2.56mm
          </div>
        </div>

        <div className="relative w-full pt-10 flex justify-center">
          <img
            src="/assets/inspection/ketebalanBelakang.svg"
            alt="Car diagram"
            className="w-1/2"
          />
          <div className="absolute" style={{ top: "0", left: "50%" }}>
            <div className="text-black font-bold text-xl">Teks Atas</div>
          </div>
          <div className="absolute" style={{ top: "50%", left: "30%" }}>
            <div className="text-black font-bold text-xl">Teks Tengah</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Halaman7;
