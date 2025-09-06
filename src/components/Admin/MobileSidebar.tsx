"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { LuLayoutDashboard, LuMenu, LuX } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../lib/store";
import { logout } from "../../lib/features/auth/authSlice";
import { AiFillDatabase } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa";
import { SiHiveBlockchain } from "react-icons/si";
import SidebarBulkStatus from "../SidebarBulkStatus";
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
import { MdSmsFailed } from "react-icons/md";

interface MenuItemProps {
  title: string;
  link?: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  link = "#",
  children,
  isActive = false,
  onClick,
}) => {
  return (
    <li className="mb-1">
      <Link href={link} onClick={onClick}>
        <div
          className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ease-in-out group ${
            isActive
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
              : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400"
          }`}
        >
          <div
            className={`mr-3 ${
              isActive
                ? "text-white"
                : "text-orange-500 dark:text-orange-400 group-hover:text-orange-600 dark:group-hover:text-orange-300"
            }`}
          >
            {children}
          </div>
          <span className="font-medium text-sm">{title}</span>
          {isActive && (
            <div className="ml-auto">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

const LogoutMenuItem = ({
  children,
  onLogout,
}: {
  children: React.ReactNode;
  onLogout: () => void;
}) => {
  return (
    <li className="mb-1 list-none">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ease-in-out group text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400">
            <div className="mr-3 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300">
              {children}
            </div>
            <span className="font-medium text-sm">Keluar</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white dark:bg-gray-800 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900 dark:text-gray-100">
              Konfirmasi Logout
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Apakah Anda yakin ingin keluar dari akun? Anda perlu masuk kembali
              untuk mengakses dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 border-0">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onLogout}
              className="bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700 border-0"
            >
              Ya, Keluar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
};

const menu = [
  {
    title: "Dashboard",
    link: "/dashboard",
    children: <LuLayoutDashboard size={20} />,
    access: ["SUPERADMIN", "ADMIN", "REVIEWER"],
  },
  {
    title: "Draft Reviewer",
    link: "/dashboard/review",
    children: <LuClipboardList size={20} />,
    access: ["SUPERADMIN", "ADMIN", "REVIEWER"],
  },
  {
    title: "Data Approved",
    link: "/dashboard/database",
    children: <AiFillDatabase size={20} />,
    access: ["SUPERADMIN", "ADMIN", "REVIEWER"],
  },
  {
    title: "Blockchain",
    link: "/dashboard/blockchain",
    children: <SiHiveBlockchain size={20} />,
    access: ["SUPERADMIN", "ADMIN"],
  },
  {
    title: "User Management",
    link: "/dashboard/usermanagement",
    children: <FaUserGroup size={20} />,
    access: ["SUPERADMIN", "ADMIN"],
  },
  {
    title: "Inspector",
    link: "/dashboard/inspector",
    children: <FaUserTie size={20} />,
    access: ["SUPERADMIN", "ADMIN"],
  },
  {
    title: "Branch",
    link: "/dashboard/branch",
    children: <FaCodeBranch size={20} />,
    access: ["SUPERADMIN", "ADMIN"],
  },
  {
    title: "Data Failed",
    link: "/dashboard/data-failed",
    children: <MdSmsFailed size={20} />,
    access: ["SUPERADMIN"],
  },
];

const MobileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const logOut = async () => {
    try {
      await dispatch(logout()).unwrap();
      window.location.href = "/auth";
    } catch (error) {
      window.location.href = "/auth";
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const hamburger = document.getElementById("hamburger-button");

      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        hamburger &&
        !hamburger.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500 rounded-lg opacity-20 blur-sm"></div>
            <div className="relative bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
              <Image
                src="/assets/logo/palapa.svg"
                width={24}
                height={24}
                alt="logo"
                className="w-6 h-6"
              />
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              PALAPA
            </h1>
          </div>
        </div>

        <button
          id="hamburger-button"
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <LuX size={24} className="text-gray-600 dark:text-gray-300" />
          ) : (
            <LuMenu size={24} className="text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300" />
      )}

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`lg:hidden fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 rounded-lg opacity-20 blur-sm"></div>
                <div className="relative bg-white dark:bg-gray-700 p-2 rounded-lg shadow-sm">
                  <Image
                    src="/assets/logo/palapa.svg"
                    width={32}
                    height={32}
                    alt="logo"
                    className="w-8 h-8"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  PALAPA
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Inspeksi Mobil Jogja
                </p>
              </div>
            </div>
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Close menu"
            >
              <LuX size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* User Info Section */}
          {user && (
            <div className="px-4 py-4 bg-orange-50 dark:bg-orange-900/20 border-b border-orange-100 dark:border-orange-900/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                    {user.role || "USER"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Section */}
          <div className="flex-1 px-4 py-4 overflow-y-auto">
            <nav>
              <ul className="space-y-2">
                {menu.map((item, index) => {
                  // Check if user has access to this menu item
                  if (
                    !item.access ||
                    (user && item.access.includes(user.role))
                  ) {
                    const isActive = pathname === item.link;
                    return (
                      <MenuItem
                        key={index}
                        title={item.title}
                        link={item.link}
                        isActive={isActive}
                        onClick={closeSidebar}
                      >
                        {item.children}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </ul>
            </nav>
          </div>

          {/* Bulk Process Status Section */}
          <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
            <SidebarBulkStatus />
          </div>

          {/* Logout Section */}
          <div className="px-4 py-4 border-t border-gray-100 dark:border-gray-700">
            <LogoutMenuItem onLogout={logOut}>
              <FiLogOut size={20} />
            </LogoutMenuItem>
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              © 2025 PALAPA System
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
