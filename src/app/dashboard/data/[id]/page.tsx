"use client";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DialogResult from "@/components/Dialog/DialogResult";
import EditedData from "@/components/EditReview/EditedData";
import EditReviewComponents from "@/components/EditReview/EditReview";
import { DialogForm } from "@/components/Form/DialogForm";
import Loading from "@/components/Loading";
import {
  approveInspectionData,
  getDataForPreview,
  setEditedData,
  updateData,
} from "@/lib/features/inspection/inspectionSlice";
import { AppDispatch, useAppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Header = ({ handleApprove }: any) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-sm lg:text-xl font-semibold">Form Pengubahan Umkm</h1>
      <div className="flex gap-2">
        <PrimaryButton
          onClick={handleApprove}
          className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          {" "}
          Approve Inspection Data
        </PrimaryButton>
      </div>
    </div>
  );
};

const Edit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useAppSelector((state: any) => state.inspection.isLoading);
  const error = useAppSelector((state: any) => state.inspection.error);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<any>({
    label: "",
    inputFor: "",
    value: "",
    type: "normal-input",
  });
  const [isDialogResultOpen, setIsDialogResultOpen] = useState(false);
  const [dialogResultData, setDialogResultData] = useState<{
    isOpen: boolean;
    isSuccess: boolean;
    title: string;
    message: string;
    buttonLabel1: string;
    buttonLabel2: string;
    action1: () => void;
    action2: () => void;
  } | null>(null);

  const [data, setData] = useState<any>(null);

  const handleEditReviewClick = (data: any) => {
    setDialogData(data);
    setIsDialogOpen(true);
  };

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
    }
  }, []);

  const updateDataHandler = async (
    newValue: any,
    part: string,
    section: string
  ) => {
    if (part === "root") {
      setData((prevData: any) => {
        return { ...prevData, [part]: newValue };
      });
    } else {
      setData((prevData: any) => {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [part]: newValue,
          },
        };
      });
    }
  };

  const cancelEdit = (oldValue: any, part: string, section: string) => {
    setData((prevData: any) => {
      if (part === "root") {
        return { ...prevData, [part]: oldValue };
      } else {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [part]: oldValue,
          },
        };
      }
    });
  };

  const router = useRouter();

  const approveInspection = () => {
    const id = window.location.pathname.split("/").pop();
    if (!id) return;

    dispatch(approveInspectionData(id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setDialogResultData({
          isOpen: true,
          isSuccess: true,
          title: "Data approved successfully",
          message:
            "Data sudah disetujui, dan tinggal menunggu minting pada blockchain. Lihat data di bawah ini untuk melihat data yang sudah disetujui.",
          buttonLabel1: "Lihat Data",
          buttonLabel2: "Draft Review Lain",
          action1: () => router.push("/dashboard/database"),
          action2: () => router.push("/dashboard/review"),
        });
      } else {
        setDialogResultData({
          isOpen: true,
          isSuccess: false,
          title: "Data approve failed",
          message: "Data mungkin sudah disetujui sebelumnya. Coba cek lagi.",
          buttonLabel1: "Kembali",
          buttonLabel2: "Coba Lagi",
          action1: () => router.push("/dashboard/database"),
          action2: () => router.push("/dashboard/review"),
        });
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header handleApprove={approveInspection} />
          <div className="flex my-5">
            <EditedData cancelEdit={cancelEdit} />
          </div>
          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            <EditReviewComponents data={data} onClick={handleEditReviewClick} />
          </div>

          {/* Dialog Form */}
          {isDialogOpen && (
            <DialogForm
              isOpen={isDialogOpen}
              label={dialogData.label}
              inputFor={dialogData.inputFor}
              value={dialogData.value}
              type={dialogData.type}
              onClose={() => setIsDialogOpen(false)}
              onSave={(newValue) => {
                updateDataHandler(
                  newValue,
                  dialogData.inputFor,
                  dialogData.section
                );
                dispatch(
                  setEditedData({
                    id: data.id,
                    part: dialogData.inputFor,
                    section: dialogData.section,
                    before: dialogData.value,
                    after: newValue,
                  })
                );
              }}
            />
          )}

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
