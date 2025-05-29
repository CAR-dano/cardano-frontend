import React from "react";

export const metadata = {
  title: "Draft Review",
  description:
    "Review page for CarDano dashboard, managing inspections that need review.",
};

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
