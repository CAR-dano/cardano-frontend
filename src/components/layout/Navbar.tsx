"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  IoMenu,
  IoClose,
  IoChevronDown,
  IoPersonOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaUserTie, FaUser } from "react-icons/fa";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

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

  // Prevent body scroll when sidebar is open and handle touch events
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";

      // Prevent touch events on body when sidebar is open
      const preventTouch = (e: TouchEvent) => {
        if (isOpen && !(e.target as Element)?.closest(".mobile-sidebar")) {
          e.preventDefault();
        }
      };

      document.addEventListener("touchmove", preventTouch, { passive: false });

      return () => {
        document.removeEventListener("touchmove", preventTouch);
      };
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

  // Handle touch events to prevent accidental sidebar opening
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isOpen) {
        const touchEndX = e.touches[0].clientX;
        const touchEndY = e.touches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Prevent horizontal swipe that might accidentally trigger sidebar
        if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) {
          // Only allow if swipe starts from very edge of screen (within 20px)
          if (touchStartX > 20) {
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
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
            <Link href="/">Home</Link>
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
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 text-orange-700 px-4 py-2 rounded-lg font-semibold border border-orange-200 hover:border-orange-300 transition-all duration-200 shadow-sm hover:shadow-md">
                {/* Avatar */}
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {user.role === "CUSTOMER" ? (
                    <FaUser className="w-4 h-4" />
                  ) : (
                    <FaUserTie className="w-4 h-4" />
                  )}
                </div>

                {/* User Name */}
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-orange-800">
                    {user.name || user.username || user.email}
                  </span>
                </div>

                {/* Dropdown Arrow */}
                <IoChevronDown className="w-4 h-4 text-orange-600 transition-transform duration-200" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="w-64 p-0 mr-4 bg-white border border-orange-100 shadow-lg"
              align="end"
            >
              <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-orange-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold shadow-sm">
                    {user.role === "CUSTOMER" ? (
                      <FaUser className="w-5 h-5" />
                    ) : (
                      <FaUserTie className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-orange-800 text-sm">
                      {user.name || user.username || user.email}
                    </p>
                    <p className="text-xs text-orange-600 capitalize">
                      {user.role?.toLowerCase()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="py-2">
                {/* Dashboard/Account Link */}
                <Link
                  href={user.role === "CUSTOMER" ? "/account" : "/dashboard"}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors duration-200"
                >
                  {user.role === "CUSTOMER" ? (
                    <IoSettingsOutline className="w-5 h-5" />
                  ) : (
                    <IoPersonOutline className="w-5 h-5" />
                  )}
                  <span className="font-medium">Dashboard</span>
                </Link>

                {/* Logout */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 w-full text-left">
                      <IoLogOutOutline className="w-5 h-5" />
                      <span className="font-medium">Keluar</span>
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
            </PopoverContent>
          </Popover>
        ) : (
          <Link key="user-not-logged-in" href="/auth">
            <button className="gradient-button-2 text-white px-6 py-3 rounded-lg font-bold contact-shadow hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <span className="flex items-center gap-2">
                <IoPersonOutline className="w-5 h-5" />
                Sign In
              </span>
            </button>
          </Link>
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
            touchAction: "none", // Prevent any touch gestures
          }}
          onClick={() => setIsOpen(false)}
          onTouchStart={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        />
      )}

      {/* Sidebar (Dari Kanan) */}
      <div
        className={`mobile-sidebar fixed top-0 right-0 h-screen w-80 bg-white z-[9999] shadow-2xl transform transition-transform duration-300 md:hidden border-l border-orange-100 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "#ffffff",
          height: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
          boxShadow: "-15px 0 40px rgba(251, 146, 60, 0.15)",
          zIndex: 9999,
          touchAction: "pan-y", // Only allow vertical scrolling
          userSelect: "none", // Prevent text selection
          WebkitUserSelect: "none",
          msUserSelect: "none",
          pointerEvents: isOpen ? "auto" : "none", // Disable pointer events when closed
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* Header dengan Close Button */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/logo/palapa.svg"
              width={32}
              height={32}
              alt="logo"
              className="bg-white rounded-full p-1"
            />
            <span className="font-bold text-lg">PALAPA</span>
          </div>
          <button
            className="text-2xl text-white hover:bg-orange-700 p-2 rounded-full transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>
        </div>
        <div className="flex-1 bg-white overflow-y-auto h-full">
          {/* User Profile Section - Mobile */}
          {user && (
            <div className="p-4 bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  {user.role === "CUSTOMER" ? (
                    <FaUser className="w-7 h-7" />
                  ) : (
                    <FaUserTie className="w-7 h-7" />
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <p className="font-bold text-gray-800 text-lg truncate">
                    {user.name || user.username || user.email}
                  </p>
                  <p className="text-sm text-orange-600 capitalize font-medium">
                    {user.role?.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={user.role === "CUSTOMER" ? "/account" : "/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-orange-500 text-white px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-orange-600 transition-all duration-200 shadow-sm"
                >
                  {user.role === "CUSTOMER" ? (
                    <IoSettingsOutline className="w-4 h-4" />
                  ) : (
                    <IoPersonOutline className="w-4 h-4" />
                  )}
                  <span>{user.role === "CUSTOMER" ? "Akun" : "Dashboard"}</span>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="flex items-center justify-center gap-2 bg-red-500 text-white px-3 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-600 transition-all duration-200 shadow-sm">
                      <IoLogOutOutline className="w-4 h-4" />
                      <span>Keluar</span>
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
                          setIsOpen(false);
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
            </div>
          )}

          {/* Navigation Menu */}
          <div className="p-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Menu Navigasi
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 font-medium"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="https://inspeksimobil.id/profile/"
                  className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 font-medium"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="https://inspeksimobil.id/services/"
                  className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 font-medium"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="https://inspeksimobil.id/price-list/"
                  className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 font-medium"
                >
                  Price List
                </a>
              </li>
              <li>
                <a
                  href="https://inspeksimobil.id/booking/"
                  className="flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 font-medium"
                >
                  Booking
                </a>
              </li>
            </ul>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                Fitur Utama
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-200 font-semibold ${
                      isActiveLink("/")
                        ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    Cari Data
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cek-validitas"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-200 font-semibold ${
                      isActiveLink("/cek-validitas")
                        ? "bg-orange-100 text-orange-700 border-l-4 border-orange-500"
                        : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                    }`}
                  >
                    Cek Validitas PDF
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Sign In Button untuk User yang belum login */}
          {!user && (
            <div className="p-4 border-t border-gray-200 mt-auto">
              <Link href="/auth" onClick={() => setIsOpen(false)}>
                <button className="gradient-button-2 bg-orange-500 text-white px-4 py-3 rounded-lg font-bold w-full flex items-center justify-center gap-2 hover:bg-orange-600 transition-all duration-200 shadow-lg">
                  <IoPersonOutline className="w-5 h-5" />
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
