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

const TableData = ({ data }: any) => {
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Merk Mobil</TableHead>
          <TableHead>Lokasi</TableHead>
          <TableHead>Tanggal Inspeksi</TableHead>
          <TableHead>Nama Inspector</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item: any) => (
          // <TableRow>
          <TableRow key={item._id}>
            <TableCell className="w-1/4">
              {item.vehicleData.merekKendaraan} {item.vehicleData.tipeKendaraan}
            </TableCell>
            <TableCell>{item.identityDetails.cabangInspeksi}</TableCell>
            <TableCell>{formatDate(item.inspectionDate)}</TableCell>
            <TableCell>{item.identityDetails.namaInspektor}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <SecondaryButton className="text-xs border-[1px] bg-blue">
                  <Link href="/dashboard/data/1">Detail</Link>
                </SecondaryButton>
                <SecondaryButton className="text-xs border-[1px] bg-blue">
                  <Link target="_blank" href={`/preview/${item.id}`}>
                    Preview
                  </Link>
                </SecondaryButton>
                <SecondaryButton className="text-xs border-[1px] bg-blue">
                  <Link
                    target="_blank"
                    href="https://cardano-pdf.vercel.app/data/1"
                  >
                    Upload
                  </Link>
                </SecondaryButton>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const TableInfo: React.FC = () => {
  const MAX = 10;
  const dataCount = 0;
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

const TableInspectionReviewer = ({ data }: any) => {
  return (
    <div className="w-3/4 flex flex-col">
      <div className="overflow-x-auto">
        <div className="w-full inline-block align-middle">
          <div className="overflow-hidden border rounded-lg">
            <TableData data={data} />
          </div>
          <TableInfo />
        </div>
      </div>
    </div>
  );
};

export default TableInspectionReviewer;
