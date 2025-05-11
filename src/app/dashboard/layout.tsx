"use client";
import Header from "@/components/Admin/Header";
import Sidebar from "@/components/Admin/Sidebar";
import { useAppSelector } from "@/lib/store";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreatorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col lg:flex-row bg-primary font-rubik">
      <Sidebar />
      <main className="flex-1 bg-white">
        <Header />
        <div className="p-10">{children}</div>
      </main>
    </div>
  );
}
