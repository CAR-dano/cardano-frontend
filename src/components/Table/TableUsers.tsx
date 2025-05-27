"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import SecondaryButton from "../Button/SecondaryButton";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../lib/store";
import { useRouter } from "next/navigation";
import DialogEditRole from "../Form/DialogEditRole";
import LoadingScreen from "../../components/LoadingFullScreen";
import { updateRole } from "../../lib/features/admin/adminSlice";

const TableData = ({ data }: any) => {
  const [fetchStatus, setFetchStatus] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [editDialogOpen, setEditDialogOpen] = useState<string | null>(null);
  const [editRoleValue, setEditRoleValue] = useState<string>("");
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // Handler untuk simpan perubahan role
  const handleSaveRole = async (userId: string, newRole: string) => {
    if (!accessToken) return;
    await dispatch(
      updateRole({ id: userId, role: newRole, token: accessToken })
    );
    setEditDialogOpen(null);
  };

  // Generate initials for avatar
  const getInitials = (name: string | null | undefined) => {
    if (!name || typeof name !== "string") {
      return "U"; // Default to 'U' for User
    }
    return (
      name
        .split(" ")
        .map((word) => word && word[0])
        .filter(Boolean)
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  // Get role badge color
  const getRoleBadgeStyle = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "reviewer":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "inspector":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  useEffect(() => {
    if (!fetchStatus) {
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-900">
            <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
              User
            </TableHead>
            <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
              Contact
            </TableHead>
            <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
              Role
            </TableHead>
            <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((item: any, index: number) => (
              <TableRow
                key={item.id}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                  index !== data.length - 1
                    ? "border-b border-gray-100 dark:border-gray-700"
                    : ""
                }`}
              >
                <TableCell className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {getInitials(item.name)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {item.name || "Nama tidak tersedia"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ../..{item.username || "username"}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6">
                  <div className="text-sm text-gray-900 dark:text-gray-100">
                    {item.email || "Email tidak tersedia"}
                  </div>
                </TableCell>
                <TableCell className="py-4 px-6 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeStyle(
                      item.role || "user"
                    )}`}
                  >
                    {item.role || "User"}
                  </span>
                </TableCell>
                <TableCell className="py-4 px-6 text-center">
                  <button
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    onClick={() => {
                      setEditDialogOpen(item.id);
                      setEditRoleValue(item.role);
                    }}
                  >
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Role
                  </button>
                  {editDialogOpen === item.id && (
                    <DialogEditRole
                      isOpen={true}
                      onClose={() => setEditDialogOpen(null)}
                      onSave={(newRole) => handleSaveRole(item.id, newRole)}
                      value={item.role}
                      label="Role"
                      subFieldName="role"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-12">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <svg
                    className="h-12 w-12 mb-4 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium">Tidak ada pengguna</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Belum ada data pengguna yang terdaftar
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

interface TableInfoProps {
  data: any;
}

const TableInfo: React.FC<TableInfoProps> = ({ data }) => {
  const meta = useAppSelector((state) => state.inspection.meta);
  const [page, setPage] = useState(1);
  const MAX = 10;
  const dataCount = data.length;
  const totalPage = Math.ceil(dataCount / MAX);

  return (
    <div className="flex justify-between items-center mt-2 text-xs">
      <p>
        Showing 1 to {dataCount > MAX ? MAX : dataCount} of {dataCount} entries
      </p>
      <div className="flex border-[1px] rounded-lg border-primary overflow-hidden">
        {page > 1 && (
          <SecondaryButton
            className="border-none rounded-none"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </SecondaryButton>
        )}
        <div className="border-x-[1px] border-y-none border-0 rounded-none flex items-center px-3">
          {page}
        </div>
        <SecondaryButton
          onClick={() => setPage(page + 1)}
          className="border-none rounded-none"
        >
          Next
        </SecondaryButton>
      </div>
    </div>
  );
};

const TableUsers = ({ data, isDatabase }: any) => {
  const loading = useAppSelector((state) => state.admin.isLoading);
  return (
    <div className="flex flex-col space-y-4">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="w-full inline-block align-middle">
              <TableData data={data} isDatabase={isDatabase} />
              {data && data.length > 0 && (
                <div className="mt-4">
                  <TableInfo data={data} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TableUsers;
