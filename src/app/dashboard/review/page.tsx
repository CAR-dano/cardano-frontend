"use client";
import Loading, { LoadingSkeleton } from "@/components/Loading";
import TableInspectionReviewer from "@/components/Table/TableInspectionReviewer";
import { getDataForReviewer } from "@/lib/features/inspection/inspectionSlice";
import { useTheme } from "@/contexts/ThemeContext";

import { AppDispatch, RootState } from "@/lib/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = ({
  dataCount,
  onRefresh,
}: {
  dataCount: number;
  onRefresh: () => void;
}) => {
  const { isDarkModeEnabled } = useTheme();
  return (
    <div className="bg-white dark:bg-gray-800  rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
            <svg
              className="w-6 h-6 text-blue-600 "
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
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Draft Reviewer
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {dataCount > 0
                ? `${dataCount} inspeksi menunggu review`
                : "Belum ada inspeksi yang perlu direview"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
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
          <div className="flex items-center px-3 py-2 bg-blue-50 dark:bg-blue-900 rounded-md">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Live
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Review: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1);
  const [metapage, setMetapage] = useState({});
  const { data, isLoading, meta } = useSelector(
    (state: RootState) => state.inspection
  );

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    dispatch(
      getDataForReviewer({
        status: "NEED_REVIEW",
        page: page,
        pageSize: 10,
      })
    );
  }, [dispatch]);

  if (!hasMounted) return null; // Hindari render di server

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    dispatch(
      getDataForReviewer({
        status: "NEED_REVIEW",
        page: newPage,
        pageSize: 10,
      })
    );
  };

  const handleRefresh = () => {
    dispatch(
      getDataForReviewer({
        status: "NEED_REVIEW",
        page: page,
        pageSize: 10,
      })
    );
  };

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
          data={data}
          meta={meta}
          isDatabase={false}
          onPageChange={handlePageChange}
          handleRefresh={handleRefresh}
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada data review
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Belum ada inspeksi yang perlu direview saat ini.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default Review;
