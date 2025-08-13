"use client";

import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
