import "./globals.css";
import type { Metadata } from "next";
import { Inter, Pacifico, Poppins, Rubik } from "next/font/google";
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
  viewport: "width=device-width, initial-scale=1",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${rubik.variable} ${pacifico.variable} ${poppins.variable}`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
