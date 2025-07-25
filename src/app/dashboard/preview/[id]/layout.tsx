import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Pratinjau Dashboard",
  description: "Pratinjau hasil inspeksi kendaraan dari dashboard admin",
  robots: "noindex, nofollow",
};

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
