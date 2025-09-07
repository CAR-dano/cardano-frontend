"use client";
import { useState, useEffect } from "react";
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

  // Close sidebar when window is resized to desktop view
  const handleResize = () => {
    if (window.innerWidth >= 768 && isOpen) {
      setIsOpen(false);
    }
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
      document.documentElement.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "unset";
      document.body.style.width = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  // Add resize listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const handleToHome = () => {
    setIsOpen(false); // Close mobile menu if open
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

      {/* Menu Desktop New*/}
      <div className="hidden md:flex">
        <ul className="flex gap-8 text-shade font-rubik">
          <li className="text-base font-semibold cursor-pointer hover:text-orange-400">
            <a href="/">Home</a>
            {/* Test Aman */}
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
      <div className="hidden md:block">
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
        className="md:hidden text-orange-700 text-3xl"
        onClick={() => setIsOpen(true)}
      >
        <IoMenu />
      </button>

      {/* Sidebar Overlay (Klik untuk Menutup) */}
      {isOpen && (
        <div
          className="mobile-overlay fixed inset-0 bg-black bg-opacity-50 z-[9998] md:hidden"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9998,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar (Dari Kanan) */}
      <div
        className={`mobile-sidebar fixed top-0 right-0 h-screen w-64 bg-white z-[9999] shadow-2xl transform transition-transform duration-300 md:hidden border-l border-gray-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "#ffffff",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
          boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.3)",
          zIndex: 9999,
        }}
      >
        <div className="flex justify-end p-4 bg-white border-b border-gray-100">
          <button
            className="text-3xl text-orange-700 hover:text-orange-800"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>
        </div>
        <div
          className="flex-1 bg-white overflow-y-auto h-full"
          style={{ backgroundColor: "#ffffff" }}
        >
          <ul
            className="mt-4 space-y-6 text-lg text-orange-700 font-semibold px-6 bg-white py-4"
            style={{ backgroundColor: "#ffffff" }}
          >
            <li className="cursor-pointer hover:text-orange-400">
              <a href="/">Home</a>
            </li>
            <li className="cursor-pointer hover:text-orange-400">
              <a href="https://inspeksimobil.id/profile/">Profile</a>
            </li>
            <li className="cursor-pointer hover:text-orange-400">
              <a href="https://inspeksimobil.id/services/">Services</a>
            </li>
            <li className="cursor-pointer hover:text-orange-400">
              <a href="https://inspeksimobil.id/price-list/">Price List</a>
            </li>
            <li className="cursor-pointer hover:text-orange-400">
              <a href="https://inspeksimobil.id/booking/">Booking</a>
            </li>
            <li
              className={`font-bold cursor-pointer ${
                isActiveLink("/") ? "text-orange-400" : "text-orange-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Link href="/">
                <p
                  className={`inline-block ${
                    isActiveLink("/") ? "border-b-2 border-orange-500" : ""
                  }`}
                >
                  Cari Data
                </p>
              </Link>
            </li>
            <li
              className={`font-bold cursor-pointer ${
                isActiveLink("/cek-validitas")
                  ? "text-orange-400"
                  : "text-orange-700"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <Link href="/cek-validitas">
                <p
                  className={`inline-block ${
                    isActiveLink("/cek-validitas")
                      ? "border-b-2 border-orange-500"
                      : ""
                  }`}
                >
                  Cek Validitas PDF
                </p>
              </Link>
            </li>
          </ul>
          <div
            className="mt-6 px-6 bg-white py-4 flex-1"
            style={{ backgroundColor: "#ffffff" }}
          >
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
      </div>
    </nav>
  );
};

export default Navbar;
