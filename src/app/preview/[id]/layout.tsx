import { Metadata } from "next";
import React from "react";

const metadata: Metadata = {
  title: "Preview",
  description: "Preview page",
};

export default function PreviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
