"use client";
import {
  deleteEditedData,
  getDataEdited,
} from "../../lib/features/inspection/inspectionSlice";
import { AppDispatch, useAppSelector } from "../../lib/store";
import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { useTheme } from "../../contexts/ThemeContext";

interface EditedDataProps {
  cancelEdit: (oldValue: any, subFieldName: string, fieldName: string) => void;
  id?: string;
  updateData: (data: any[]) => void;
}

function EditedData({ updateData, cancelEdit, id }: EditedDataProps) {
  const [status, setStatus] = React.useState(true);

  // Ambil semua item dengan id yang sama, hasilnya array (atau kosong jika tidak ada)
  const editedItems = useAppSelector((state) => state.inspection.edited).filter(
    (item) => item.inspectionId === id
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleCancelEdit = (index: number) => {
    const item = editedItems[index];
    cancelEdit(
      item.oldValue ?? "",
      item.subFieldName ?? "",
      item.fieldName ?? ""
    );
    dispatch(
      deleteEditedData({
        inspectionId: item.inspectionId,
        fieldName: item.fieldName,
        subFieldName: item.subFieldName,
      })
    );
  };

  function formatPart(input: any) {
    if (!input) return "";
    const result = input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (str: any) => str.toUpperCase());
    return result;
  }

  const getChangeData = (id: string) => {
    if (!id || id === "review") return;

    dispatch(getDataEdited(id))
      .unwrap()
      .then((res) => {
        if (res) {
          updateData(res);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch edited data:", error);
      })
      .finally(() => {
        setStatus(false);
      });
  };

  const checkIfArray = (value: any) => {
    if (Array.isArray(value)) {
      return value.map((item) => item).join(", ");
    }

    return value;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("id-ID", {
      timeZone: "UTC", // penting!
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatted;
  };

  useEffect(() => {
    if (id && status) {
      getChangeData(id);
    }
  }, [id, status, dispatch]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <svg
              className="w-6 h-6 text-orange-600 dark:text-orange-300"
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
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Perubahan Data
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {editedItems.length > 0
                ? `${editedItems.length} perubahan telah dibuat`
                : "Belum ada perubahan yang dibuat"}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {editedItems.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
          <div className="text-center">
            {/* Empty state illustration */}
            <div className="mx-auto w-24 h-24 mb-6">
              <svg
                viewBox="0 0 96 96"
                className="w-full h-full text-gray-300 dark:text-gray-600"
                fill="currentColor"
              >
                {/* Document with edit icon */}
                <rect
                  x="20"
                  y="12"
                  width="48"
                  height="60"
                  rx="4"
                  className="fill-gray-200 dark:fill-gray-700"
                />
                <rect
                  x="28"
                  y="20"
                  width="32"
                  height="2"
                  className="fill-gray-300 dark:fill-gray-600"
                />
                <rect
                  x="28"
                  y="26"
                  width="24"
                  height="2"
                  className="fill-gray-300 dark:fill-gray-600"
                />
                <rect
                  x="28"
                  y="32"
                  width="28"
                  height="2"
                  className="fill-gray-300 dark:fill-gray-600"
                />

                {/* Edit pencil icon */}
                <circle
                  cx="72"
                  cy="24"
                  r="12"
                  className="fill-orange-100 dark:fill-orange-900"
                />
                <path
                  d="M66 18 L78 30 L72 36 L60 24 Z"
                  className="fill-orange-500 dark:fill-orange-300"
                />
                <rect
                  x="64"
                  y="32"
                  width="16"
                  height="2"
                  className="fill-orange-400 dark:fill-orange-500"
                />
              </svg>
            </div>

            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Belum ada perubahan
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Mulai edit data inspeksi untuk melihat perubahan yang telah dibuat
              di sini.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
              <p className="text-xs text-blue-800 dark:text-blue-300">
                Setiap perubahan yang Anda buat akan ditampilkan di sini dan
                dapat dibatalkan sebelum disimpan.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
            <div className="grid grid-cols-6 gap-4 text-sm font-semibold text-gray-700 dark:text-gray-200">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a2 2 0 012-2z"
                  />
                </svg>
                Field Name
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a2 2 0 012-2z"
                  />
                </svg>
                Sub Field
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a2 2 0 012-2z"
                  />
                </svg>
                Part
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-red-400 dark:text-red-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Nilai Sebelumnya
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-green-400 dark:text-green-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Nilai Baru
              </div>
              <div className="flex items-center justify-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
                Actions
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {editedItems.map((item: any, index: number) => (
              <div
                key={index}
                className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
              >
                <div className="grid grid-cols-6 gap-4 items-center">
                  {/* Field Name */}
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 dark:bg-blue-300 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatPart(item.fieldName)}
                    </span>
                  </div>

                  {/* Sub Field Name */}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.subFieldName ? (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs dark:text-gray-200">
                        {formatPart(item.subFieldName)}
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 italic">
                        -
                      </span>
                    )}
                  </div>

                  {/* Sub Sub Field Name */}
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.subsubfieldname ? (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs dark:text-gray-200">
                        {formatPart(item.subsubfieldname)}
                      </span>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 italic">
                        -
                      </span>
                    )}
                  </div>

                  {/* Old Value */}
                  <div className="text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-300 rounded-full"></div>
                      </div>
                      <span className="text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900 px-2 py-1 rounded-md text-xs font-medium">
                        {item.fieldName?.toLowerCase() === "inspectiondate" &&
                        item.oldValue &&
                        !isNaN(new Date(item.oldValue).getTime())
                          ? formatDate(item.oldValue) // Format date
                          : typeof item.oldValue === "boolean"
                          ? item.oldValue
                            ? "Ada"
                            : "Tidak Ada"
                          : checkIfArray(item.oldValue) || "Kosong"}
                      </span>
                    </div>
                  </div>

                  {/* New Value */}
                  <div className="text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-300 rounded-full"></div>
                      </div>
                      <span className="text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900 px-2 py-1 rounded-md text-xs font-medium">
                        {item.fieldName?.toLowerCase() === "inspectiondate" &&
                        item.newValue &&
                        !isNaN(new Date(item.newValue).getTime())
                          ? formatDate(item.newValue) // Format date
                          : typeof item.newValue === "boolean"
                          ? item.newValue
                            ? "Ada"
                            : "Tidak Ada"
                          : checkIfArray(item.newValue) || "Kosong"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleCancelEdit(index)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-red-600 dark:hover:text-red-300 hover:border-red-300 dark:hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Batalkan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Summary */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 dark:bg-orange-300 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-200">
                    Total {editedItems.length} perubahan
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                Klik &quot;Batalkan&quot; untuk mengembalikan nilai sebelumnya
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditedData;
