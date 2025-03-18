import Image from "next/image";
import { IoLocationSharp, IoTime, IoCall } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className=" w-full gradient-custom text-white font-rubik">
      <div className="relative container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row md:justify-between gap-5 lg:gap-10">
        {/* Informasi Perusahaan */}
        <div className="md:w-[40%] flex flex-col gap-3 lg:gap-6">
          <div className="flex gap-2">
            <Image
              src="/assets/logo/palapa.svg"
              width={80}
              height={80}
              alt="logo"
              className="w-16 h-16 md:w-20 md:h-20 mr-2"
            />
            <div className="flex flex-col text-white font-bold justify-center">
              <p className="text-[clamp(24px,3vw,36px)]">PALAPA</p>
              <p className="-mt-1 text-[clamp(13px,3vw,15px)]">
                Inspeksi Mobil Jogja
              </p>
            </div>
          </div>
          <div className="mt-2 md:mt-6">
            <h2 className="text-[clamp(24px,3vw,40px)] font-bold">
              PT Inspeksi Mobil Jogja
            </h2>
            <p className="mt-2 md:mt-0 text-[clamp(14px,3vw,20px)] font-light md:font-medium leading-relaxed">
              PALAPA adalah nama brand usaha jasa di bawah perusahaan PT
              Inspeksi Mobil Jogja yang bergerak sebagai jasa pengecekan kondisi
              mobil bekas. 
            </p>

            <div className="md:hidden block w-full md:w-[30%] space-y-6 mt-5 md:mt-0">
              <div className="flex items-center gap-3">
                <IoLocationSharp size={28} />
                <p className="text-[clamp(16px,3vw,18px)]">
                  Sendowo, Sinduadi, Mlati 55284
                </p>
              </div>
              <div className="flex items-center gap-3">
                <IoTime size={28} />
                <p className="text-[clamp(16px,3vw,18px)]">09:00 - 17:00 WIB</p>
              </div>
              <div className="flex items-center gap-3">
                <IoCall size={28} />
                <p className="text-[clamp(16px,3vw,18px)]">0877-4026-0519</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-2 lg:mt-8 flex flex-wrap gap-4">
            {[
              "Youtube",
              "Line",
              "Instagram",
              "Twitter",
              "Tiktok",
              "Facebook",
            ].map((platform) => (
              <Image
                key={platform}
                src={`/assets/socmed/${platform}.svg`}
                width={40}
                height={40}
                alt={`${platform} Icon`}
                className="hover:scale-110 transition-transform duration-200 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-[20%] flex justify-between gap-6 ">
          <div>
            <h3 className="text-xl font-bold mb-3">Quick Links</h3>
            <ul className="space-y-1 lg:space-y-4">
              {[
                "About Us",
                "Services",
                "Pricing Plan",
                "FAQs",
                "Blockchain",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:underline hover:text-orange-200 transition-colors text-[clamp(14px,3vw,18px)] cursor-pointer"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:hidden block w-[50%]   flex flex-col justify-start font-rubik">
            <p className="text-white text-sm md:text-lg mb-3 font-semibold">
              Powered by
            </p>
            <Image
              src="/assets/logo/cardano-vertical-white.svg"
              width={300}
              height={60}
              alt="Logo"
            />
          </div>
        </div>

        <div className="hidden md:block w-[30%] space-y-6">
          <div className="flex items-center gap-3">
            <IoLocationSharp size={28} />
            <p className="text-lg">Sendowo, Sinduadi, Mlati 55284</p>
          </div>
          <div className="flex items-center gap-3">
            <IoTime size={28} />
            <p className="text-lg">09:00 - 17:00 WIB</p>
          </div>
          <div className="flex items-center gap-3">
            <IoCall size={28} />
            <p className="text-lg">0877-4026-0519</p>
          </div>
        </div>
        <div className="hidden md:block w-[30%] md:w-[20%] absolute bottom-5 right-5 md:right-0 flex flex-col justify-start font-rubik">
          <p className="text-white text-sm md:text-lg mb-3 font-semibold">
            Powered by
          </p>
          <Image
            src="/assets/logo/cardano-vertical-white.svg"
            width={300}
            height={60}
            alt="Logo"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="h-[50px] bg-purple-900 text-sm md:text-base  flex items-center  justify-center md:justify-start px-12 md:px-24">
        <p>PALAPA 2025. All rights reserved.</p>
      </div>
    </footer>
  );
}
