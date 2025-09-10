"use client";
import Loading, { LoadingSkeleton } from "../../../components/Loading";
import TableUsers from "../../../components/Table/TableUsers";
import { toast } from "../../../components/ui/use-toast";
import { getAllUsers } from "../../../lib/features/admin/adminSlice";

import { AppDispatch, RootState, useAppSelector } from "../../../lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Header = ({
  userCount,
  onRefresh,
}: {
  userCount: number;
  onRefresh: () => void;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <svg
              className="w-6 h-6 text-purple-600 dark:text-purple-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              User Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {userCount > 0
                ? `${userCount} pengguna terdaftar`
                : "Belum ada pengguna terdaftar"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
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
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Database: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<any>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { isLoading } = useSelector((state: RootState) => state.inspection);
  const accessToken = useAppSelector(
    (state: RootState) => state.auth.accessToken
  );
  const { error } = useSelector((state: RootState) => state.admin);
  const router = useRouter();
  const fetchUsers = () => {
    // Only proceed if authenticated and have access token
    if (!accessToken) return;

    dispatch(getAllUsers(accessToken))
      .unwrap()
      .then((response) => {
        if (response) {
          setData(response);
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    setHasMounted(true);

    // Only fetch if authenticated and have token
    if (accessToken) {
      fetchUsers();
    }
  }, [dispatch, accessToken]);

  const handleRefresh = () => {
    // Only refresh if authenticated
    if (!accessToken) return;
    fetchUsers();
  };

  if (!hasMounted) return null;

  return (
    <>
      <Header userCount={data ? data.length : 0} onRefresh={handleRefresh} />
      {isLoading ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <Loading />
          </div>
          <LoadingSkeleton rows={4} />
        </div>
      ) : data ? (
        <TableUsers
          isDatabase={true}
          data={data}
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
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada pengguna
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Belum ada data pengguna yang terdaftar dalam sistem.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
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
