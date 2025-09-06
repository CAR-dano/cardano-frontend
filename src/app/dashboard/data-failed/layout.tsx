import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Failed",
  description: "Halaman ini menampilkan data gagal",
  robots: "noindex, nofollow",
};

export default function DataFailedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
