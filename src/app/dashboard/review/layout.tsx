import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Draft Review",
  description:
    "Review dan kelola draft inspeksi kendaraan yang memerlukan persetujuan",
  robots: "noindex, nofollow",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
