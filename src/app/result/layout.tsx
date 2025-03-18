import { Layout } from "@/components/layout";
import React from "react";

export default function ResultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full relative">
      <Layout>{children}</Layout>
    </div>
  );
}
