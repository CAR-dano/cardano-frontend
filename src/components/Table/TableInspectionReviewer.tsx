"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import SecondaryButton from "../Button/SecondaryButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { mintingToBlockchain } from "@/lib/features/inspection/inspectionSlice";
import DialogResult from "../Dialog/DialogResult";
import { useRouter } from "next/navigation";

const TableData = ({ data, isDatabase = false, setDialogData }: any) => {
  const [fetchStatus, setFetchStatus] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    if (!fetchStatus) {
      setFetchStatus(true);
    }
  }, [fetchStatus]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("id-ID", {
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

  const mintingToBlockchainHandler = (id: string) => {
    dispatch(mintingToBlockchain(id))
      .then((response) => {
        console.log("Minting response:", response);
        setDialogData({
          isOpen: true,
          isSuccess: true,
          title: "Data minted successfully",
          message:
            "Data sudah disetujui dan diminting ke blockchain. Silahkan cek di dashboard.",
          buttonLabel2: "Lihat Data",
          action2: () => router.push("/dashboard/database"),
        });
      })
      .catch((err) => {
        console.error("Minting error:", err);
        setDialogData({
          isOpen: true,
          isSuccess: false,
          title: "Minting failed",
          message: "Minting data ke blockchain gagal. Silahkan coba lagi.",
          buttonLabel1: "Batal",
          buttonLabel2: "Coba Lagi",
          action1: () => router.push("/dashboard/database"),
          action2: () => {
            mintingToBlockchainHandler(id);
          },
        });
      });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Nama Customer</TableHead>
          <TableHead className="text-center">Inspektor</TableHead>
          <TableHead className="text-center">Tanggal</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Dokumen</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          // <TableRow>
          <TableRow key={item.id}>
            <TableCell className="font-light text-center">
              {item.identityDetails.namaCustomer}
            </TableCell>
            <TableCell className="font-light text-center">
              {item.identityDetails.namaInspektor}
            </TableCell>
            <TableCell className="font-light text-center">
              {formatDate(item.inspectionDate)}
            </TableCell>
            <TableCell className="font-light text-center">
              {formatStatus(item.status)}
            </TableCell>
            <TableCell className="font-light text-center">
              <Link
                href={`/preview/${item.id}`}
                className="text-blue-500 underline text-[16px] font-light"
                target="_blank"
              >
                {!isDatabase ? "Preview" : "Download"}
              </Link>
            </TableCell>
            <TableCell className="font-light flex justify-center items-center">
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/${isDatabase ? "data" : "review"}/${
                    item.id
                  }`}
                >
                  <SecondaryButton className="text-[16px] text-white bg-[#30B6ED] rounded-[12px] hover:bg-white hover:text-[#30B6ED] hover:border-[#30B6ED] border-[1px] border-[#30B6ED]">
                    {isDatabase ? "Lihat" : "Review"}
                  </SecondaryButton>
                </Link>
                {item.status == "APPROVED" && (
                  <SecondaryButton
                    onClick={() => mintingToBlockchainHandler(item.id)}
                    className="text-[16px] text-white bg-blue-500 rounded-[12px] hover:bg-white hover:text-[#30B6ED] hover:border-[#30B6ED] border-[1px] border-[#30B6ED]"
                  >
                    Mint to Blockchain
                  </SecondaryButton>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

interface TableInfoProps {
  data: any;
}

const TableInfo: React.FC<TableInfoProps> = ({ data }) => {
  const MAX = 10;
  const dataCount = data.length;
  const pageCount = Math.ceil(dataCount / MAX);
  const [page, setPage] = useState(1);

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

const TableInspectionReviewer = ({ data, isDatabase }: any) => {
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

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <TableData
              data={data}
              isDatabase={isDatabase}
              setDialogData={setDialogResultData}
            />
          </div>
          <TableInfo data={data} />
        </div>
      </div>

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

export default TableInspectionReviewer;
