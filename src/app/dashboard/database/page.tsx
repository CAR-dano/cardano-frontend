"use client";
import Loading, { LoadingSkeleton } from "../../../components/Loading";
import TableInspectionReviewer from "../../../components/Table/TableInspectionReviewer";
import { toast } from "../../../components/ui/use-toast";
import { getDataForReviewer } from "../../../lib/features/inspection/inspectionSlice";
import { useTheme } from "../../../contexts/ThemeContext";
import useAuth from "../../../hooks/useAuth";

import { AppDispatch, RootState } from "../../../lib/store";
import { useEffect, useState, useCallback } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Header = ({
  dataCount,
  onRefresh,
}: {
  dataCount: number;
  onRefresh: () => void;
}) => {
  const { isDarkModeEnabled: _isDarkModeEnabled } = useTheme();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
            <svg
              className="w-6 h-6 text-green-600 dark:text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Data Tersimpan
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {dataCount > 0
                ? `${dataCount} inspeksi telah disetujui`
                : "Belum ada data yang disetujui"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
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
          <div className="flex items-center px-3 py-2 bg-green-50 dark:bg-green-900 rounded-md">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Approved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const _SearchBar = ({ setQuery, _setFilter }: any) => {
  const [keyword, setKeyword] = useState("");

  const handleKeyword = (e: any) => {
    e.preventDefault();
    setQuery({ keyword, page: 1 });
  };

  return (
    <div className="mt-2">
      <p className="text-sm mb-2">Cari UMKM</p>
      <div className="flex gap-2">
        <form
          className="flex-grow relative hidden md:block"
          onSubmit={handleKeyword}
        >
          <div className="absolute inset-y-0 text-gray-500 start-0 flex items-center ps-3 pointer-events-none">
            <IoIosSearch />
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

const Database: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [metapage, setMetapage] = useState({});
  const [hasMounted, setHasMounted] = useState(false);
  const { isLoading } = useSelector((state: RootState) => state.inspection);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { user } = useAuth();
  const _isAdmin = user?.role === "ADMIN";
  const fetchData = useCallback((pageNum = page) => {
    // Only fetch if user is authenticated
    if (!isAuthenticated || !user) {
      console.log("User not authenticated, skipping data fetch");
      return;
    }

    dispatch(
      getDataForReviewer({
        status: "APPROVED",
        page: pageNum,
        pageSize: 10,
      })
    )
      .unwrap()
      .then((response) => {
        if (response) {
          setData(response.data);
          setMetapage(response.meta);
        }
      })
      .catch((_error) => {
        toast({
          title: "Error",
          description: "Failed to fetch data",
          variant: "destructive",
        });
      });
  }, [dispatch, page, isAuthenticated, user]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchData(newPage);
  };

  const handleRefresh = () => {
    fetchData();
  };
  useEffect(() => {
    setHasMounted(true);
    // Only fetch data if user is authenticated
    if (isAuthenticated && user) {
      fetchData();
    }
  }, [dispatch, isAuthenticated, user, fetchData]);
  if (!hasMounted) return null; // Hindari render di server

  // If user is not authenticated, show message
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to access the database.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header dataCount={data ? data.length : 0} onRefresh={handleRefresh} />
      {isLoading ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 dark:bg-gray-800 dark:border-gray-700">
            <Loading />
          </div>
          <LoadingSkeleton rows={5} />
        </div>
      ) : data && data.length > 0 ? (
        <TableInspectionReviewer
          isDatabase={true}
          data={data}
          meta={metapage}
          onPageChange={handlePageChange}
          handleRefresh={handleRefresh}
          userRole={user?.role}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada data tersimpan
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Belum ada inspeksi yang disetujui dan tersimpan dalam database.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg
                  className="-ml-1 mr-2 h-4 w-4"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Database;
