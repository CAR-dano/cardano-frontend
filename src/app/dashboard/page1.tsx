"use client";
import TableInspectionReviewer from "@/components/Table/TableInspectionReviewer";
import { getDataForReviewer } from "@/lib/features/inspection/inspectionSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useSelector(
    (state: RootState) => state.inspection
  );
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    dispatch(getDataForReviewer());
  }, [dispatch]);

  if (!hasMounted) return null; // Hindari render di server

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="my-4">
        Welcome to the Inspeksi Mobil Jogja&apos;s dashboard!
      </p>
      <TableInspectionReviewer data={data} />
    </div>
  );
}

export default DashboardPage;
