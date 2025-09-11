"use client";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setIsNavbarVisible(false);
    } else {
      // Scrolling up
      setIsNavbarVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar isNavbarVisible={isNavbarVisible} />
      <div className="flex flex-1">
        <main className="flex-1 w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
