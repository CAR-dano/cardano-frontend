import type { Metadata } from "next";
import { Rubik, Pacifico } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components/layout";
// import ReduxProvider from "@/lib/store/redux-provider";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "CAR-dano",
  description: "A website can store car inspection data on Cardano blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ReduxProvider>
    <html lang="en">
      <body className={`${rubik.variable} ${pacifico.variable} antialiased`}>
        <Layout>{children}</Layout>
      </body>
    </html>
    // </ReduxProvider>
  );
}
