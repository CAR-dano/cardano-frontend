import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database",
  description: "Kelola database inspeksi kendaraan dan data pengguna",
  robots: "noindex, nofollow",
};

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
