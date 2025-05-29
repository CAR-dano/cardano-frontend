import React from "react";

export const metadata = {
  title: "Auth | CAR-dano",
  description: "Authentication page for CAR-dano application.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
