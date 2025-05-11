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

const TableData = ({ data, isDatabase = false }: any) => {
  const [fetchStatus, setFetchStatus] = useState(false);

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Customer</TableHead>
          <TableHead>ID Laporan</TableHead>
          <TableHead>Inspektor</TableHead>
          <TableHead>Tanggal</TableHead>
          {!isDatabase && <TableHead>Status</TableHead>}
          <TableHead>Dokumen</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          // <TableRow>
          <TableRow key={item.id}>
            <TableCell className="font-light">
              {item.identityDetails.namaCustomer}
            </TableCell>
            <TableCell className="font-light">{item.id}</TableCell>
            <TableCell className="font-light">
              {item.identityDetails.namaInspektor}
            </TableCell>
            <TableCell className="font-light">
              {formatDate(item.inspectionDate)}
            </TableCell>
            {!isDatabase && (
              <TableCell className="font-light">
                {formatStatus(item.status)}
              </TableCell>
            )}
            <TableCell>
              <Link
                href={`/preview/${item.id}`}
                className="text-blue-500 underline text-[16px] font-light"
                target="_blank"
              >
                {!isDatabase ? "Preview" : "Download"}
              </Link>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={`/dashboard/data/${item.id}`}>
                  <SecondaryButton className="text-[16px] text-white bg-[#30B6ED] rounded-[12px] hover:bg-white hover:text-[#30B6ED] hover:border-[#30B6ED] border-[1px] border-[#30B6ED]">
                    {isDatabase ? "Lihat" : "Review"}
                  </SecondaryButton>
                </Link>
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
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <TableData data={data} isDatabase={isDatabase} />
          </div>
          <TableInfo data={data} />
        </div>
      </div>
    </div>
  );
};

export default TableInspectionReviewer;
