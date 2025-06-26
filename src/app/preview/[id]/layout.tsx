import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Preview Inspeksi",
  description: "Preview hasil inspeksi kendaraan sebelum dipublikasikan",
  robots: "noindex, nofollow",
};

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
