import React from "react";

export const metadata = {
  title: "Auth",
  description: "Authentication page for CAR-dano application.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
