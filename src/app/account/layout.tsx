import type { Metadata } from "next";
import AccountDashboardClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Account Dashboard",
  description:
    "CAR-dano Account Dashboard - Manage your account settings and preferences",
  robots: "noindex, nofollow",
};

export default function AccountDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AccountDashboardClientLayout>{children}</AccountDashboardClientLayout>
  );
}
