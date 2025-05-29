import React from "react";

export const metadata = {
  title: "Data Branch",
};

export default function BranchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
