import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blockchain",
  description:
    "Kelola transaksi blockchain dan verifikasi data di Cardano network",
  robots: "noindex, nofollow",
};

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
