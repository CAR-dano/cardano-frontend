import type { Metadata } from "next";
import DashboardClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: {
    template: "%s | CAR-dano",
    default: "Dashboard | CAR-dano",
  },
  robots: "noindex, nofollow", // Dashboard should not be indexed
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
