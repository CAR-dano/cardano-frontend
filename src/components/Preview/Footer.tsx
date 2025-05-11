import React from "react";

import { FaTiktok, FaInstagram } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";

function Footer() {
  return (
    <div className="w-full bg-[#E95F37]  px-5 py-3 rounded-xl text-white flex items-center justify-between">
      <div className="flex justify-center items-center gap-1">
        <FaInstagram size={24} />
        <FaTiktok size={20} />
        <p className="text-[12px]">@inspeksimobil.jogja</p>
      </div>

      <div className="flex justify-center items-center gap-1">
        <MdLocalPhone size={24} />
        <p className="text-[12px]">+6281391735311</p>
      </div>

      <div className="flex justify-center items-center gap-1">
        <CiMail size={24} />
        <p className="text-[12px]">inspeksimobiljogja@gmail.com</p>
      </div>
    </div>
  );
}

export default Footer;
