"use client";
import DialogResult from "../../../..//components/Dialog/DialogResult";
import EditReviewComponents from "../../../..//components/EditReview/EditReview";
import Loading from "../../../..//components/Loading";
import {
  getDataForPreview,
  mintingToBlockchain,
} from "../../../..//lib/features/inspection/inspectionSlice";
import { AppDispatch, useAppSelector } from "../../../..//lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Edit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useAppSelector((state: any) => state.inspection.isLoading);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<any>({
    label: "",
    inputFor: "",
    value: "",
    type: "normal-input",
  });
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

  const [data, setData] = useState<any>(null);

  const handleEditReviewClick = (data: any) => {};

  const getData = async (id: string) => {
    const response = await dispatch(getDataForPreview(id)).unwrap();
    if (response) {
      setData(response);
    } else {
      console.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id) {
      getData(id);
    } else {
      router.push("/dashboard/review");
    }
  }, []);

  const router = useRouter();

  const mintingToBlockchainHandler = (id: string) => {
    dispatch(mintingToBlockchain(id))
      .then((response) => {
        setDialogResultData({
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
        setDialogResultData({
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

  const id = window.location.pathname.split("/").pop();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-full mb-20">
            <EditReviewComponents data={data} onClick={handleEditReviewClick} />
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
        </>
      )}
    </>
  );
};

export default Edit;
