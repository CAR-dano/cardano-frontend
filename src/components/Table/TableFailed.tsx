"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import SecondaryButton from "../Button/SecondaryButton";
import PrimaryButton from "../Button/PrimaryButton";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../lib/store";
import {
  searchByKeyword,
  clearSearchResults,
  returnToReview,
  markAsApproved,
} from "../../lib/features/inspection/inspectionSlice";
import DialogResult from "../Dialog/DialogResult";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { FaSearch, FaUndo, FaCheck } from "react-icons/fa";
import { toast } from "../../hooks/use-toast";
import { LoadingSkeleton } from "../Loading";

const TableDataFailed = ({
  data,
  setDialogData,
  handleRefresh,
  userRole,
}: any) => {
  const [fetchStatus, setFetchStatus] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // State for the confirmation dialogs
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    itemId: string | null;
    action: "review" | "approve" | null;
    title: string;
    message: string;
  }>({
    isOpen: false,
    itemId: null,
    action: null,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (!fetchStatus) {
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("id-ID", {
      timeZone: "UTC",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatted;
  };

  const formatStatus = (status: string) => {
    const newStatus = status.replace(/_/g, " ").toLowerCase();
    return newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
  };

  const getNameFile = (pathPdf: string) => {
    return pathPdf.split("/").pop();
  };

  const PDF_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEED_REVIEW":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "APPROVED":
        return "bg-green-100 text-green-800 border-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 border-red-200";
      case "FAIL_ARCHIVE":
        return "bg-red-100 text-red-800 border-red-200";
      case "ARCHIVED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Handler for return to review
  const handleReturnToReview = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      itemId: id,
      action: "review",
      title: "Kembalikan ke Review",
      message:
        "Anda yakin ingin mengembalikan data ini ke status NEED_REVIEW? Data akan memerlukan review ulang sebelum dapat disetujui.",
    });
  };

  // Handler for mark as approved
  const handleMarkAsApproved = (id: string) => {
    setConfirmDialog({
      isOpen: true,
      itemId: id,
      action: "approve",
      title: "Tandai Sebagai Disetujui",
      message:
        "Anda yakin ingin langsung menyetujui data ini? Data akan berpindah ke status APPROVED tanpa melalui review.",
    });
  };

  // Process the action
  const processAction = async () => {
    if (!confirmDialog.itemId || !confirmDialog.action) return;

    setProcessingId(confirmDialog.itemId);

    try {
      if (confirmDialog.action === "review") {
        await dispatch(returnToReview(confirmDialog.itemId)).unwrap();
        toast({
          title: "Berhasil",
          description: "Data berhasil dikembalikan ke status NEED_REVIEW",
        });
      } else if (confirmDialog.action === "approve") {
        await dispatch(markAsApproved(confirmDialog.itemId)).unwrap();
        toast({
          title: "Berhasil",
          description: "Data berhasil disetujui",
        });
      }

      if (handleRefresh) {
        handleRefresh();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error || "Terjadi kesalahan saat memproses data",
        variant: "destructive",
      });
    } finally {
      setProcessingId(null);
      setConfirmDialog({
        isOpen: false,
        itemId: null,
        action: null,
        title: "",
        message: "",
      });
    }
  };

  // Filter data to only show FAILED items
  const failedData =
    data?.filter((item: any) => item.status === "FAIL_ARCHIVE") || [];

  return (
    <>
      {/* Header Info */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Data Gagal Diproses
          </h3>
        </div>
        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
          Berikut adalah data yang gagal diproses. Anda dapat mengembalikannya
          ke review atau langsung menyetujuinya.
        </p>
        <div className="mt-2 text-sm text-red-600 dark:text-red-400">
          Total data gagal:{" "}
          <span className="font-semibold">{failedData.length}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900">
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Customer
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Kendaraan
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Tanggal
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Status
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Dokumen
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {failedData && failedData.length > 0 ? (
              failedData.map((item: any, index: number) => (
                <TableRow
                  key={item.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    index !== failedData.length - 1
                      ? "border-b border-gray-100 dark:border-gray-700"
                      : ""
                  }`}
                >
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {item.identityDetails?.namaCustomer
                          ? item.identityDetails.namaCustomer
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)
                          : "XX"}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {item.identityDetails?.namaCustomer ||
                            "Unknown Customer"}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Inspektor:{" "}
                          {item.identityDetails?.namaInspektor || "Unknown"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {item.vehiclePlateNumber || "Unknown Plate"}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.vehicleData?.merekKendaraan || "Unknown Brand"}{" "}
                        {item.vehicleData?.tipeKendaraan || ""}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <div className="text-sm text-gray-900 dark:text-gray-100">
                      {formatDate(item.inspectionDate)}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {formatStatus(item.status)}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <Link
                      href={`/dashboard/preview/${item.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      target="_blank"
                    >
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Preview
                    </Link>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      {/* Return to Review Button */}
                      <button
                        onClick={() => handleReturnToReview(item.id)}
                        disabled={processingId === item.id}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-300 rounded-md hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200 disabled:opacity-50"
                      >
                        {processingId === item.id ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-yellow-700 mr-1"></div>
                        ) : (
                          <FaUndo className="w-3 h-3 mr-1" />
                        )}
                        Kembali ke Review
                      </button>

                      {/* Mark as Approved Button */}
                      <button
                        onClick={() => handleMarkAsApproved(item.id)}
                        disabled={processingId === item.id}
                        className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-300 rounded-md hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-50"
                      >
                        {processingId === item.id ? (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-700 mr-1"></div>
                        ) : (
                          <FaCheck className="w-3 h-3 mr-1" />
                        )}
                        Setujui Langsung
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    {/* Success State - No Failed Data */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 relative">
                        {/* Success checkmark illustration */}
                        <div className="w-full h-full bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                          <svg
                            className="w-12 h-12 text-green-500 dark:text-green-400"
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
                        </div>
                      </div>
                    </div>

                    <div className="text-center max-w-sm">
                      <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
                        Tidak ada data yang gagal
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Semua data telah diproses dengan sukses. Tidak ada data
                        yang memerlukan penanganan khusus.
                      </p>

                      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                        <p className="text-xs text-green-800 dark:text-green-200">
                          Sistem berjalan dengan baik. Data yang gagal akan
                          muncul di sini jika terjadi masalah dalam proses.
                        </p>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <DialogResult
          isOpen={confirmDialog.isOpen}
          isSuccess={false}
          title={confirmDialog.title}
          message={confirmDialog.message}
          buttonLabel1="Batal"
          action1={() =>
            setConfirmDialog({
              isOpen: false,
              itemId: null,
              action: null,
              title: "",
              message: "",
            })
          }
          buttonLabel2="Ya, Lanjutkan"
          action2={processAction}
          onClose={() =>
            setConfirmDialog({
              isOpen: false,
              itemId: null,
              action: null,
              title: "",
              message: "",
            })
          }
        />
      )}
    </>
  );
};

// The rest of your TableInfo and TableInspectionReviewer components remain the same
// ... (TableInfo component as provided)
// ... (TableInspectionReviewer component as provided, it will pass setDialogResultData for the *post-minting* dialog)

interface TableInfoProps {
  data: any;
  onPageChange?: (page: number) => void;
}

const TableInfo: React.FC<TableInfoProps> = ({ data, onPageChange }) => {
  const [page, setPage] = useState(data.page || 1);
  const [inputPage, setInputPage] = useState("");
  const MAX = data.pageSize || 10;
  const dataCount = data.total || 0;
  const totalPage = data.totalPages || 1;

  React.useEffect(() => {
    setPage(data.page || 1);
  }, [data.page]);

  const startIdx = dataCount === 0 ? 0 : (page - 1) * MAX + 1;
  const endIdx = Math.min(page * MAX, dataCount);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPage) return;
    setPage(newPage);
    if (onPageChange) onPageChange(newPage);
  };

  const handleInputPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setInputPage(value);
    }
  };

  const handleGoToPage = () => {
    const pageNum = parseInt(inputPage);
    if (pageNum && pageNum >= 1 && pageNum <= totalPage) {
      handlePageChange(pageNum);
      setInputPage(""); // Clear input after successful navigation
    }
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  return (
    <div className="flex justify-between items-center mt-2 text-xs">
      <p className="text-gray-700 dark:text-gray-300">
        {dataCount === 0
          ? "No entries"
          : `Showing ${startIdx} to ${endIdx} of ${dataCount} entries`}
      </p>
      {dataCount > 0 &&
        totalPage > 1 && ( // Only show pagination if there's content and more than one page
          <div className="flex items-center space-x-2">
            {/* First Page Button */}
            <SecondaryButton
              className={`px-2 py-1.5 text-xs rounded-md border border-gray-300 dark:border-gray-600 ${
                page <= 1
                  ? " opacity-50 pointer-events-none"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handlePageChange(1)}
              disabled={page <= 1}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </SecondaryButton>

            {/* Previous Page Button */}
            <SecondaryButton
              className={`px-3 py-1.5 text-xs rounded-md border border-gray-300 dark:border-gray-600 ${
                page <= 1
                  ? " opacity-50 pointer-events-none"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </SecondaryButton>

            {/* Page Info with Input */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center px-2 py-1.5 text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600">
                <input
                  type="text"
                  value={inputPage}
                  onChange={handleInputPageChange}
                  onKeyPress={handleInputKeyPress}
                  placeholder={page.toString()}
                  className="w-8 text-center bg-transparent border-none outline-none text-xs text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                  maxLength={totalPage.toString().length}
                />
                <span className="mx-1">/</span>
                <span>{totalPage}</span>
              </div>
              {inputPage && (
                <SecondaryButton
                  onClick={handleGoToPage}
                  className="px-2 py-1.5 text-xs rounded-md border border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800"
                >
                  Go
                </SecondaryButton>
              )}
            </div>

            {/* Next Page Button */}
            <SecondaryButton
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPage}
              className={`px-3 py-1.5 text-xs rounded-md border border-gray-300 dark:border-gray-600 ${
                page >= totalPage
                  ? " opacity-50 pointer-events-none"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Next
            </SecondaryButton>

            {/* Last Page Button */}
            <SecondaryButton
              onClick={() => handlePageChange(totalPage)}
              disabled={page >= totalPage}
              className={`px-2 py-1.5 text-xs rounded-md border border-gray-300 dark:border-gray-600 ${
                page >= totalPage
                  ? " opacity-50 pointer-events-none"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m13 5 7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </SecondaryButton>
          </div>
        )}
    </div>
  );
};

const TableFailed = ({
  data,
  meta,
  onPageChange,
  handleRefresh,
  userRole,
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults } = useAppSelector((state) => state.inspection);

  const [dialogResultData, setDialogResultData] = useState<{
    isOpen: boolean;
    isSuccess: boolean;
    title: string;
    message: string;
    buttonLabel1?: string;
    buttonLabel2: string;
    action1?: () => void;
    action2: () => void;
  } | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((keyword: string) => {
      if (keyword.trim()) {
        setIsSearching(true);
        dispatch(searchByKeyword({ keyword: keyword.trim() })).finally(() =>
          setIsSearching(false)
        );
      } else {
        dispatch(clearSearchResults());
        setIsSearching(false);
      }
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    // Cleanup debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // Clear search when component unmounts or when explicitly clearing
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  // Determine which data to display
  const displayData = searchTerm.trim() ? searchResults.data : data;

  const displayMeta = searchTerm.trim() ? searchResults.meta : meta;

  const isLoading = isSearching || searchResults.isLoading;
  return (
    <div className="flex flex-col space-y-4">
      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by customer, plate, or vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
            </div>
          )}
        </div>
        {searchResults.error && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-400">
            Search error: {searchResults.error}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          {isLoading ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <LoadingSkeleton rows={5} />
            </div>
          ) : (
            <TableDataFailed
              data={displayData}
              setDialogData={setDialogResultData}
              handleRefresh={handleRefresh}
              userRole={userRole}
            />
          )}
          {/* Show pagination only if there's data and meta */}
          {displayMeta &&
            displayData &&
            displayData.length > 0 &&
            !isLoading && (
              <div className="mt-4">
                <TableInfo
                  data={displayMeta}
                  onPageChange={searchTerm.trim() ? undefined : onPageChange}
                />
              </div>
            )}
        </div>
      </div>

      {/* This DialogResult is for displaying the result of the minting operation (success/failure) */}
      {dialogResultData && (
        <DialogResult
          isOpen={dialogResultData.isOpen}
          isSuccess={dialogResultData.isSuccess}
          title={dialogResultData.title}
          message={dialogResultData.message}
          buttonLabel1={dialogResultData.buttonLabel1}
          buttonLabel2={dialogResultData.buttonLabel2}
          action1={dialogResultData.action1}
          action2={dialogResultData.action2}
          onClose={() => setDialogResultData(null)}
        />
      )}
    </div>
  );
};

// Simple debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => {
    if (timeout) clearTimeout(timeout);
  };

  return debounced as T & { cancel: () => void };
}

export default TableFailed;
