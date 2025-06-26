import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Branch",
  description: "Kelola data cabang dan lokasi inspeksi kendaraan",
  robots: "noindex, nofollow",
};

export default function BranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
