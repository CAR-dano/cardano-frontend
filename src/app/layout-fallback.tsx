import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Toaster } from "../components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: "%s | CAR-dano",
    default: "CAR-dano - Car Inspection & Verification Platform",
  },
  description:
    "CAR-dano adalah platform inspeksi dan verifikasi kendaraan berbasis blockchain Cardano yang menyediakan layanan pemeriksaan kendaraan terpercaya dan transparan.",
  keywords: [
    "car inspection",
    "vehicle verification",
    "blockchain",
    "cardano",
    "automotive",
  ],
  authors: [{ name: "CAR-dano Team" }],
  creator: "CAR-dano",
  openGraph: {
    title: "CAR-dano - Car Inspection & Verification Platform",
    description:
      "Platform inspeksi dan verifikasi kendaraan berbasis blockchain Cardano",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAR-dano - Car Inspection & Verification Platform",
    description:
      "Platform inspeksi dan verifikasi kendaraan berbasis blockchain Cardano",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}