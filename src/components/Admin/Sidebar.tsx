"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { logout } from "@/lib/features/auth/authSlice";

interface MenuItemProps {
  title: string;
  link?: string;
  children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, link = "#", children }) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  const colorClass = isActive ? "text-blue-500" : "text-black";
  const iconColorClass = isActive ? "text-blue-500" : "text-orange-400";

  return (
    <li className="rounded-md text-white p-0 md:p-1">
      <Link href={link}>
        <p
          className={`flex items-center transition-all p-2 space-x-3 ${iconColorClass}`}
        >
          {children}
          <span className={`${colorClass} font-rubik`}>{title}</span>
        </p>
      </Link>
    </li>
  );
};

const menu = [
  {
    title: "Dashboard",
    link: "/dashboard",
    children: <LuLayoutDashboard size={25} style={{ marginRight: "10px" }} />,
  },
  {
    title: "Draft Reviewer",
    link: "/dashboard/review",
    children: <LuClipboardList size={25} style={{ marginRight: "10px" }} />,
  },
  {
    title: "Data",
    link: "/dashboard/database",
    children: <LuClipboardList size={25} style={{ marginRight: "10px" }} />,
  },
  {
    title: "Keluar",
    link: "/",
    children: <FiLogOut size={25} style={{ marginRight: "10px" }} />,
  },
];

const Sidebar: React.FC = () => {
  const [drop, setDrop] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const logOut = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <div className="flex flex-col sticky top-0  w-full lg:w-72 lg:h-screen p-3 bg-[#FFFFFF] border-r-2 border-gray-200 shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center lg:px-0 px-2 py-5 justify-center">
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
        </div>
        <div className={`flex-1 md:block ${drop ? "block" : "hidden"}`}>
          <ul className="p-0 lg:pb-4 space-y-1 md:space-y-1 text-base">
            {menu.map((item, index) =>
              item.title === "Keluar" ? (
                <li key={index} className="rounded-md text-white p-0 md:p-1">
                  <button
                    onClick={logOut}
                    className="flex items-center w-full text-left transition-all p-2 space-x-3 text-orange-400"
                  >
                    {item.children}
                    <span className="text-black font-rubik">Keluar</span>
                  </button>
                </li>
              ) : (
                <MenuItem key={index} title={item.title} link={item.link}>
                  {item.children}
                </MenuItem>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
