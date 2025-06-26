import HasilInspeksi from "../../components/landing/HasilInspeksi";
import { Layout } from "../../components/layout";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Hasil Inspeksi",
  description:
    "Lihat hasil inspeksi kendaraan Anda yang telah diverifikasi melalui CAR-dano",
  robots: "index, follow",
};

export default function ResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full relative">
      <Layout>
        {children}
        <HasilInspeksi />
      </Layout>
    </div>
  );
}
