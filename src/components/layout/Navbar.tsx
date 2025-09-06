"use client";
import { useState } from "react";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { AppDispatch, useAppSelector } from "../../lib/store";
import { useDispatch } from "react-redux";
import { logout } from "../../lib/features/auth/authSlice";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface NavbarProps {
  isNavbarVisible: boolean;
}

const Navbar = ({ isNavbarVisible }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const pathName = usePathname();

  const handleToHome = () => {
    router.push("/");
  };
  const handleLogout = async () => {
    try {
      // Dispatch logout and wait for it to complete
      await dispatch(logout()).unwrap();

      // Force a hard navigation to ensure clean state
      window.location.href = "/auth";
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, still redirect to auth
      window.location.href = "/auth";
    }
  };

  const activeLinkStyle = "text-orange-400 border-b-2 border-orange-500";

  function isActiveLink(link: string) {
    return pathName === link;
  }

  return (
    <nav
      className={`font-rubik w-full bg-white text-white px-6 md:px-14 py-4 flex justify-between items-center navbar-shadow sticky top-0 z-50 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div onClick={handleToHome} className="flex gap-2 cursor-pointer">
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
      <div className="hidden lg:flex">
        <ul className="flex gap-8 text-shade font-rubik">
          <li className="text-base font-semibold cursor-pointer hover:text-orange-400">
            <a href="https://inspeksimobil.id/">Home</a>
          </li>
          <li className="text-base font-semibold group cursor-pointer hover:text-orange-400">
            <a href="https://inspeksimobil.id/profile/">Profile</a>
          </li>
          <li className="text-base font-semibold group cursor-pointer hover:text-orange-400">
            <a href="https://inspeksimobil.id/services/">Services</a>
          </li>
          <li className="text-base font-semibold group cursor-pointer hover:text-orange-400">
            <a href="https://inspeksimobil.id/price-list/">Price List</a>
          </li>
          <li className="text-base font-semibold group cursor-pointer hover:text-orange-400">
            <a href="https://inspeksimobil.id/booking/">Booking</a>
          </li>
          <li
            className={`text-base font-bold cursor-pointer ${
              isActiveLink("/") ? activeLinkStyle : ""
            }`}
          >
            <Link href="/">Cari Data</Link>
          </li>
          <li
            className={`text-base font-bold cursor-pointer ${
              isActiveLink("/cek-validitas") ? activeLinkStyle : ""
            }`}
          >
            <Link href="/cek-validitas/">Cek Validitas PDF</Link>
          </li>
        </ul>
      </div>

      {/* Contact Us Button / User Info */}
      <div className="hidden lg:block">
        {user ? (
          <div key="user-logged-in" className="flex items-center gap-3">
            <Link href={user.role === "CUSTOMER" ? "#" : "/dashboard"}>
              <span className="text-orange-700 font-bold">
                {user.username || user.email}
              </span>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold border border-orange-300 hover:bg-orange-200 transition">
                  Logout
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah Anda yakin ingin keluar?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini akan mengeluarkan Anda dari akun Anda. Anda
                    perlu masuk lagi untuk mengakses akun Anda.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleLogout();
                    }}
                    className="bg-red-500 text-white hover:bg-red-600 transition"
                  >
                    Log out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : (
          <a key="user-not-logged-in" href="/auth">
            <button className="gradient-button-2 text-white px-5 py-2 rounded-lg font-bold contact-shadow">
              Sign In
            </button>
          </a>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden text-orange-700 text-3xl"
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
          {/* <li className="font-bold text-orange-400  cursor-pointer">
            <p className="inline-block border-b-2 border-orange-500">
              Cari Data
            </p>
          </li> */}
          <li
            className={`pb-2 text-base font-bold cursor-pointer ${
              isActiveLink("/") ? activeLinkStyle : ""
            }`}
          >
            <Link href="/">Cari Data</Link>
          </li>
          <li
            className={`pb-2 text-base font-bold cursor-pointer ${
              isActiveLink("/cek-validitas") ? activeLinkStyle : ""
            }`}
          >
            <Link href="/cek-validitas/">Cek Validitas PDF</Link>
          </li>
        </ul>
        <div className="mt-6 px-6">
          {user ? (
            <div key="sidebar-user-logged-in" className="flex flex-col gap-2">
              <span className="text-orange-700 font-bold">
                {user.username || user.email}
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold border border-orange-300 hover:bg-orange-200 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <a key="sidebar-user-not-logged-in" href="/auth">
              <button className="gradient-button-2 bg-orange-400 text-white px-4 py-2 rounded-lg font-bold w-full">
                Sign In
              </button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
