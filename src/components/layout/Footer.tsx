import Image from "next/image";
import { IoLocationSharp, IoTime, IoCall } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className="w-full bg-orange-500 text-white font-rubik">
      <div className="container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row md:justify-between gap-10">
        {/* Informasi Perusahaan */}
        <div className="md:w-[40%]">
          <h2 className="text-3xl md:text-4xl font-bold">
            PT Inspeksi Mobil Jogja
          </h2>
          <p className="mt-4 text-base md:text-lg font-medium leading-relaxed">
            PALAPA adalah brand jasa di bawah PT Inspeksi Mobil Jogja yang
            bergerak dalam pengecekan kondisi mobil bekas.
          </p>
          <div className="mt-6 space-y-4">
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
          {/* Social Media */}
          <div className="mt-8 flex flex-wrap gap-4">
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
        <div className="md:w-[20%]">
          <h3 className="text-xl font-bold mb-3">Quick Links</h3>
          <ul className="space-y-4">
            {["About Us", "Services", "Pricing Plan", "FAQs", "Blockchain"].map(
              (link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:underline hover:text-orange-200 transition-colors text-lg cursor-pointer"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="h-[50px] bg-orange-600 text-sm md:text-base font-bold flex items-center justify-center">
        <p>© 2025 PALAPA. All rights reserved.</p>
      </div>
    </footer>
  );
}
