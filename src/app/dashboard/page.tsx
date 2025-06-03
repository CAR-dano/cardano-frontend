"use client";
import Loading, { LoadingOverlay } from "../../components/Loading";
import { AppDispatch, RootState } from "../../lib/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCombinedDashboardData,
  getMainStats,
} from "../../lib/features/dashboard/dashboardSlice";
import BranchDistribution from "../../components/Dashboard/BranchDistribution";
import InspectorPerfomance from "../../components/Dashboard/InspectorPerfomance";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";

const DashboardHeader = ({
  totalInspections,
}: {
  totalInspections: number;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <svg
              className="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Overview inspeksi kendaraan dan data sistem
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center px-3 py-2 bg-green-50 rounded-md">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-700">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({
  title,
  value,
  change,
  changeType,
  icon,
  color,
  href,
}: {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: React.ReactNode;
  color: string;
  href?: string;
}) => {
  const card = (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200 ${
        href ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  changeType === "increase"
                    ? "text-green-600"
                    : changeType === "decrease"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {changeType === "increase" && "↗"}
                {changeType === "decrease" && "↘"}
                {change}
              </span>
            </div>
          )}
        </div>
        <div
          className={`flex items-center justify-center w-12 h-12 ${color} rounded-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  return href ? <Link href={href}>{card}</Link> : card;
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    mainStats,
    combinedDashboardData,
    isLoadingCombinedDashboardData,
    isLoadingMainStats,
  } = useSelector((state: RootState) => state.dashboard);
  const [hasMounted, setHasMounted] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    setHasMounted(true);
    dispatch(getMainStats());
    if (isAdmin) {
      dispatch(getCombinedDashboardData());
    }
  }, [dispatch, isAdmin]);

  if (!hasMounted) return null;

  if (isLoadingCombinedDashboardData || isLoadingMainStats)
    return <LoadingOverlay message="Memuat Dashboard" />;

  return (
    <div className="space-y-6">
      <DashboardHeader totalInspections={mainStats.totalOrders} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Inspeksi"
          value={mainStats.totalOrders}
          change="+12% dari bulan lalu"
          changeType="increase"
          color="bg-blue-100"
          href="/dashboard"
          icon={
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
        />
        <StatsCard
          title="Perlu Review"
          value={mainStats.needReview}
          change="Prioritas tinggi"
          changeType="neutral"
          color="bg-yellow-100"
          href="/dashboard/review"
          icon={
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          }
        />
        <StatsCard
          title="Disetujui"
          value={mainStats.approved}
          change="+8% minggu ini"
          changeType="increase"
          color="bg-green-100"
          href="/dashboard/database"
          icon={
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          }
        />
        <StatsCard
          title="Di Blockchain"
          value={mainStats.archived}
          change="Tersimpan aman"
          changeType="neutral"
          color="bg-purple-100"
          href="/dashboard/database"
          icon={
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
        />
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 border-none h-full">
            <BranchDistribution
              data={combinedDashboardData.branchDistribution}
            />
          </div>
          <div className="lg:col-span-2 border-none h-full">
            <InspectorPerfomance
              data={combinedDashboardData.inspectorPerformance.data.slice(
                0,
                10
              )}
            />
          </div>
        </div>
      )}

      {/* Sample Data */}
    </div>
  );
};

export default Dashboard;
