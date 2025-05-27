"use client";
import Loading, { LoadingOverlay } from "../../components/Loading";
import { getDataForReviewer } from "../../lib/features/inspection/inspectionSlice";
import { AppDispatch, RootState } from "../../lib/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import exampleData from "../../utils/exampledata.json";
import { getMainStats } from "../../lib/features/dashboard/dashboardSlice";

const DashboardHeader = ({
  totalInspections,
  onRefresh,
}: {
  totalInspections: number;
  onRefresh: () => void;
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
          <button
            onClick={onRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
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

const RecentActivity = ({ data }: { data: any[] }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEED_REVIEW":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "APPROVED":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800";
      case "REJECTED":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800";
      case "ARCHIVED":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Aktivitas Terbaru
        </h3>
        <Link
          href="/dashboard/review"
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.slice(0, 5).map((item: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {item.vehiclePlateNumber
                    ? item.vehiclePlateNumber.slice(0, 2)
                    : "XX"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.vehiclePlateNumber || "Unknown Plate"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.identityDetails?.namaCustomer || "Unknown Customer"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status === "NEED_REVIEW"
                    ? "Perlu Review"
                    : item.status === "APPROVED"
                    ? "Disetujui"
                    : item.status === "REJECTED"
                    ? "Ditolak"
                    : item.status === "ARCHIVED"
                    ? "Diarsipkan"
                    : item.status}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(item.inspectionDate || new Date().toISOString())}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Belum ada aktivitas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const InspectionChart = ({ data }: { data: any[] }) => {
  const gradeData = data
    ? data.reduce((acc: Record<string, number>, item: any) => {
        const grade = item.overallGrade || "Unknown";
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
      }, {})
    : {};

  const gradeColors = {
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-yellow-500",
    D: "bg-orange-500",
    E: "bg-red-500",
    Unknown: "bg-gray-500",
  };

  const total = Object.values(gradeData).reduce(
    (sum, count) => sum + (count as number),
    0
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Distribusi Grade Inspeksi
      </h3>
      <div className="space-y-4">
        {Object.entries(gradeData).map(([grade, count]) => {
          const percentage =
            total > 0 ? (((count as number) / total) * 100).toFixed(1) : 0;
          return (
            <div key={grade} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded ${
                    gradeColors[grade as keyof typeof gradeColors] ||
                    "bg-gray-500"
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Grade {grade}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {count}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({percentage}%)
                </span>
              </div>
            </div>
          );
        })}
        {total === 0 && (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Belum ada data grade
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ExampleDataCard = () => {
  const { data: vehicleData, hasil: inspectionResult } = exampleData;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Data Inspeksi Sample
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Informasi Kendaraan
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Plat Nomor:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {vehicleData.plat}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Merk:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {vehicleData.brand}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Model:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {vehicleData.model}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Tahun:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {vehicleData.tahun}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Odometer:
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {vehicleData.odometer}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Hasil Penilaian
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Interior:
              </span>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  inspectionResult.penilaian.interior === "A"
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                    : inspectionResult.penilaian.interior === "B"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                    : inspectionResult.penilaian.interior === "C"
                    ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                    : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                }`}
              >
                {inspectionResult.penilaian.interior}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Exterior:</span>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  inspectionResult.penilaian.exterior === "A"
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                    : inspectionResult.penilaian.exterior === "B"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                    : inspectionResult.penilaian.exterior === "C"
                    ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                    : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                }`}
              >
                {inspectionResult.penilaian.exterior}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Mesin:</span>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  inspectionResult.penilaian.mesin === "A"
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                    : inspectionResult.penilaian.mesin === "B"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                    : inspectionResult.penilaian.mesin === "C"
                    ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                    : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                }`}
              >
                {inspectionResult.penilaian.mesin}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Kaki-kaki:</span>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${
                  inspectionResult.penilaian.kakiKaki === "A"
                    ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                    : inspectionResult.penilaian.kakiKaki === "B"
                    ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                    : inspectionResult.penilaian.kakiKaki === "C"
                    ? "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300"
                    : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                }`}
              >
                {inspectionResult.penilaian.kakiKaki}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm font-medium text-gray-700">
                Keseluruhan:
              </span>
              <span
                className={`text-sm font-bold px-2 py-1 rounded ${
                  inspectionResult.penilaian.keseluruhan === "A"
                    ? "bg-green-100 text-green-800"
                    : inspectionResult.penilaian.keseluruhan === "B"
                    ? "bg-blue-100 text-blue-800"
                    : inspectionResult.penilaian.keseluruhan === "C"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {inspectionResult.penilaian.keseluruhan}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Indikasi</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bekas Tabrakan:</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    inspectionResult.indikasi.bekastabrakan
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {inspectionResult.indikasi.bekastabrakan ? "Ya" : "Tidak"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bekas Banjir:</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    inspectionResult.indikasi.bekasbanjir
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {inspectionResult.indikasi.bekasbanjir ? "Ya" : "Tidak"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Odometer Reset:</span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    inspectionResult.indikasi.odometerreset
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {inspectionResult.indikasi.odometerreset ? "Ya" : "Tidak"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { mainStats, isLoading } = useSelector(
    (state: RootState) => state.dashboard
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    dispatch(getMainStats());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getDataForReviewer({}));
  };

  if (!hasMounted) return null;

  if (isLoading) return <LoadingOverlay message="Memuat Dashboard" />;

  return (
    <div className="space-y-6">
      <DashboardHeader
        totalInspections={mainStats.totalOrders}
        onRefresh={handleRefresh}
      />

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

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <InspectionChart data={data || []} /> */}
        {/* <RecentActivity data={data || []} /> */}
      </div>

      {/* Sample Data */}
      <ExampleDataCard />
    </div>
  );
};

export default Dashboard;
