import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Inspector",
  description: "Kelola data inspector dan pembagian tugas inspeksi kendaraan",
  robots: "noindex, nofollow",
};

export default function InspectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
