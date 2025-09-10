"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import SecondaryButton from "../Button/SecondaryButton"; // Assuming this exists
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { mintingToBlockchain } from "../../lib/features/inspection/inspectionSlice";
import DialogResult from "../Dialog/DialogResult"; // Your existing dialog
import { Input } from "../ui/input"; // Assuming Input component exists
import { FaSearch } from "react-icons/fa"; // Assuming FaSearch icon exists
import { toast } from "../../hooks/use-toast";

const TableData = ({ data, isDatabase = false, handleRefresh }: any) => {
  const [fetchStatus, setFetchStatus] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // State for the confirmation dialog
  const [confirmMintDialog, setConfirmMintDialog] = useState<{
    isOpen: boolean;
    itemId: string | null;
  }>({ isOpen: false, itemId: null });

  useEffect(() => {
    if (!fetchStatus) {
      setFetchStatus(true);
    }
  }, [fetchStatus]);

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

  const formatStatus = (status: string) => {
    const newStatus = status.replace(/_/g, " ").toLowerCase();
    return newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
  };

  // This is the actual minting logic, now called after confirmation
  const proceedWithMinting = (id: string) => {
    dispatch(mintingToBlockchain(id))
      .then((response) => {
        toast({
          title: "Success",
          description:
            "Data sudah diminting ke blockchain dengan hash " +
            response.payload.pdfFileHash,
        });
        handleRefresh();
      })
      .catch((err) => {
        console.error("Minting error:", err);
        toast({
          title: "Error",
          description: "Gagal melakukan minting ke blockchain.",
          variant: "destructive",
        });
        handleRefresh();
      });
  };

  // This handler now opens the confirmation dialog
  const mintingToBlockchainHandler = (id: string) => {
    setConfirmMintDialog({ isOpen: true, itemId: id });
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
      case "ARCHIVED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      {" "}
      {/* Use Fragment to return multiple top-level elements if DialogResult is outside the div */}
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
                Lihat
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
                    <div className="flex justify-center items-center space-x-2">
                      <Link
                        target="_blank"
                        href={`https://cardanoscan.io/transaction/${item.blockchainTxHash}`}
                      >
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
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
                              d={
                                isDatabase
                                  ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  : "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              }
                            />
                            {isDatabase && (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            )}
                          </svg>
                          {isDatabase ? "Lihat di Mainnet" : "Review"}
                        </button>
                      </Link>
                      {item.urlPdfNoDocs && (
                        <Link
                          target="_blank"
                          href={PDF_URL + item.urlPdfNoDocs}
                        >
                          <button className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
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
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            Lihat PDF
                          </button>
                        </Link>
                      )}
                      {item.status == "APPROVED" && (
                        <button
                          onClick={() => mintingToBlockchainHandler(item.id)} // Calls the handler that opens confirmation
                          className="inline-flex items-center px-3 py-1.5 border border-purple-300 shadow-sm text-xs font-medium rounded-md text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
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
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                          Mint to Blockchain
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16">
                  {/* ... your empty table placeholder ... */}
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    {/* Custom Empty Table Illustration */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 relative">
                        {/* Table illustration */}
                        <svg
                          viewBox="0 0 96 96"
                          className="w-full h-full text-gray-300"
                          fill="currentColor"
                        >
                          {/* Table surface */}
                          <rect
                            x="8"
                            y="20"
                            width="80"
                            height="56"
                            rx="4"
                            className="fill-gray-200 dark:fill-gray-700"
                          />
                          {/* Table legs */}
                          <rect
                            x="12"
                            y="76"
                            width="4"
                            height="16"
                            className="fill-gray-300 dark:fill-gray-600"
                          />
                          <rect
                            x="80"
                            y="76"
                            width="4"
                            height="16"
                            className="fill-gray-300 dark:fill-gray-600"
                          />
                          {/* Table grid lines */}
                          <line
                            x1="8"
                            y1="32"
                            x2="88"
                            y2="32"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="8"
                            y1="44"
                            x2="88"
                            y2="44"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="8"
                            y1="56"
                            x2="88"
                            y2="56"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="8"
                            y1="68"
                            x2="88"
                            y2="68"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="24"
                            y1="20"
                            x2="24"
                            y2="76"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="48"
                            y1="20"
                            x2="48"
                            y2="76"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="72"
                            y1="20"
                            x2="72"
                            y2="76"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                        </svg>

                        {/* Empty state icon overlay */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-400 dark:text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center max-w-sm">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Tidak ada data tersedia
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Belum ada inspeksi yang perlu ditampilkan saat ini.
                      </p>

                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          {isDatabase
                            ? "Data akan muncul setelah inspeksi disetujui dan disimpan."
                            : "Data akan muncul setelah inspeksi baru dibuat dan memerlukan review."}
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
      {/* Confirmation Dialog for Minting */}
      {confirmMintDialog.isOpen && confirmMintDialog.itemId && (
        <DialogResult
          isOpen={confirmMintDialog.isOpen}
          // For confirmation, 'isSuccess' might not be semantically correct.
          // You might want to adjust DialogResult to handle a 'confirmation' type
          // or use a neutral style. For now, let's assume `isSuccess={false}`
          // can be styled or interpreted as a warning/confirmation.
          // Or, if DialogResult's appearance is primarily driven by title/message,
          // `isSuccess` might have minimal visual impact here.
          isSuccess={false} // Or true, depending on how you want it to look, or make it optional.
          // Typically, a confirmation isn't a "success" or "failure" yet.
          // A yellow/amber color scheme is common for confirmations.
          title="Konfirmasi Minting"
          message={`Anda yakin ingin melakukan minting data ini ke blockchain? Tindakan ini tidak dapat dibatalkan.`}
          buttonLabel1="Batal"
          action1={() => setConfirmMintDialog({ isOpen: false, itemId: null })}
          buttonLabel2="Ya, Lanjutkan Minting"
          action2={() => {
            if (confirmMintDialog.itemId) {
              proceedWithMinting(confirmMintDialog.itemId);
            }
            setConfirmMintDialog({ isOpen: false, itemId: null });
          }}
          onClose={() => setConfirmMintDialog({ isOpen: false, itemId: null })}
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

  return (
    <div className="flex justify-between items-center mt-2 text-xs">
      <p className="text-gray-700 dark:text-gray-300">
        {dataCount === 0
          ? "No entries"
          : `Showing ${startIdx} to ${endIdx} of ${dataCount} entries`}
      </p>
      {dataCount > 0 &&
        totalPage > 1 && ( // Only show pagination if there's content and more than one page
          <div className="flex border-[1px] rounded-lg border-primary dark:border-gray-600 overflow-hidden">
            <SecondaryButton
              className={`border-none rounded-none px-3 py-1.5 text-xs ${
                // Adjusted padding and text size
                page <= 1
                  ? " opacity-50 pointer-events-none"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Previous
            </SecondaryButton>
            <div className="border-x-[1px] border-primary dark:border-gray-600 border-y-none flex items-center px-3 text-xs text-gray-700 dark:text-gray-300">
              {`${page} / ${totalPage}`}
            </div>
            <SecondaryButton
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPage}
              className={`border-none rounded-none px-3 py-1.5 text-xs ${
                // Adjusted padding and text size
                page >= totalPage
                  ? " opacity-50 pointer-events-none"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              Next
            </SecondaryButton>
          </div>
        )}
    </div>
  );
};

const TableInBlockchain = ({
  data,
  isDatabase,
  meta,
  onPageChange,
  handleRefresh,
}: any) => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredData = data.filter(
    (item: any) =>
      item.identityDetails?.namaCustomer
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.vehiclePlateNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.vehicleData?.merekKendaraan
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.vehicleData?.tipeKendaraan
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

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
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <TableData
            data={filteredData} // Pass filtered data
            isDatabase={isDatabase}
            setDialogData={setDialogResultData}
            handleRefresh={handleRefresh} // Pass handleRefresh to TableData
          />
          {/* Ensure meta is checked before trying to access its properties for TableInfo */}
          {meta && filteredData && filteredData.length > 0 && (
            <div className="mt-4">
              <TableInfo data={meta} onPageChange={onPageChange} />
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

export default TableInBlockchain;
