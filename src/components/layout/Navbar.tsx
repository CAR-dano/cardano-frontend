"use client";
import { useState } from "react";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" font-rubik w-full bg-white text-white px-6 md:px-14 py-4 flex justify-between items-center navbar-shadow">
      {/* Logo */}
      <div className="flex gap-2">
        <Image
          src="/assets/logo/palapa.svg"
          width={52}
          height={52}
          alt="logo"
        />
        <div className="flex flex-col text-orange-700 font-bold justify-center">
          <p className="text-2xl">PALAPA</p>
          <p className="-mt-1 text-xs">Inspeksi Mobil Jogja</p>
        </div>
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex">
        <ul className="flex gap-8 text-shade font-rubik">
          <li className="text-base font-semibold cursor-pointer">Home</li>
          <li className="text-base font-semibold group cursor-pointer">
            Profile
          </li>
          <li className="text-base font-semibold group cursor-pointer">
            Services
          </li>
          <li className="text-base font-semibold group cursor-pointer">
            Pricelist
          </li>
          <li className="text-base font-semibold cursor-pointer">Booking</li>
          <li className="text-base font-bold text-orange-400 border-b-2 border-orange-500 cursor-pointer">
            Cari Data
          </li>
        </ul>
      </div>

      {/* Contact Us Button */}
      <div className="hidden md:block">
        <button className="bg-orange-400 text-white px-5 py-2 rounded-lg font-bold contact-shadow">
          Masuk
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-orange-700 text-3xl"
        onClick={() => setIsOpen(true)}
      >
        <IoMenu />
      </button>

      {/* Sidebar Overlay (Klik untuk Menutup) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Dari Kanan) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-3xl text-orange-700"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>
        </div>
        <ul className="mt-4 space-y-6 text-lg text-orange-700 font-semibold px-6">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Profile</li>
          <li className="cursor-pointer">Services</li>
          <li className="cursor-pointer">Pricelist</li>
          <li className="cursor-pointer">Booking</li>
          <li className="font-bold text-orange-400  cursor-pointer">
            <p className="inline-block border-b-2 border-orange-500">
              Cari Data
            </p>
          </li>
        </ul>
        <div className="mt-6 px-6">
          <button className="bg-orange-400 text-white px-4 py-2 rounded-lg font-bold w-full">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
