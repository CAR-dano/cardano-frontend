import React from "react";

export const metadata = {
  title: "Data Inspector",
};

export default function InspectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
