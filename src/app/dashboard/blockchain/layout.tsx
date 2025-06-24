import React from "react";

export const metadata = {
  title: "Database",
};

export default function DatabaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
