"use client";
import PrimaryButton from "@/components/Button/PrimaryButton";
import SecondaryButton from "@/components/Button/SecondaryButton";
import DialogResult from "@/components/Dialog/DialogResult";
import EditedData from "@/components/EditReview/EditedData";
import EditReviewComponents from "@/components/EditReview/EditReview";
import { DialogForm } from "@/components/Form/DialogForm";
import Loading from "@/components/Loading";
import { toast } from "@/components/ui/use-toast";
import {
  approveInspectionData,
  getDataForPreview,
  mintingToBlockchain,
  saveDataEdited,
  setEditedData,
} from "@/lib/features/inspection/inspectionSlice";
import { AppDispatch, useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Header = ({ handleApprove, handleSaveChanges }: any) => {
  return (
    <div className="flex justify-between items-center mb-5">
      <h1 className="text-sm lg:text-xl font-semibold">Review</h1>
      <div className="flex gap-2">
        <SecondaryButton
          onClick={handleSaveChanges}
          className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
        >
          {" "}
          Save Changes
        </SecondaryButton>
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

  const handleEditReviewClick = (data: any) => {
    setDialogData(data);
    setIsDialogOpen(true);
  };

  const getData = async (id: string) => {
    const response = await dispatch(getDataForPreview(id)).unwrap();
    if (response) {
      setData(response);
      toast({
        title: "Data fetched successfully",
        description: "Data has been fetched successfully.",
        variant: "default",
      });
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
            "Data sudah disetujui, dan tinggal persetujuan untuk minting pada blockchain. Apakah anda ingin melanjutkan?",
          buttonLabel1: "Nanti Saja",
          buttonLabel2: "Proses ke Blockchain",
          action1: () => router.push("/dashboard/database"),
          action2: () => {
            mintingToBlockchainHandler(id);
          },
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

  const id = window.location.pathname.split("/").pop();
  const editedItems =
    useAppSelector((state) => state.inspection.edited).find(
      (item) => item.id === id
    )?.data ?? [];

  const handleSaveChanges = () => {
    if (!editedItems || editedItems.length === 0) return;

    const result: Record<string, any> = {};

    editedItems.forEach(({ part, section, after }) => {
      if (section === "root") {
        result[part] = after;
      } else {
        if (!result[section]) {
          result[section] = {};
        }
        result[section][part] = after;
      }
    });

    if (id) {
      dispatch(saveDataEdited({ id, data: result }))
        .unwrap()
        .then((data) => {
          setDialogResultData({
            isOpen: true,
            isSuccess: true,
            title: "Data saved successfully",
            message: "Data has been saved successfully.",
            buttonLabel1: "Kembali",
            buttonLabel2: "Lihat Data",
            action1: () => router.push("/dashboard/review"),
            action2: () => window.location.reload(),
          });
        })
        .catch((err) => {
          setDialogResultData({
            isOpen: true,
            isSuccess: false,
            title: "Failed to save data",
            message: "Failed to save data. Please try again.",
            buttonLabel1: "Kembali",
            buttonLabel2: "Coba Lagi",
            action1: () => router.push("/dashboard/database"),
            action2: () => router.push("/dashboard/review" + `/${id}`),
          });
        });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header
            handleApprove={approveInspection}
            handleSaveChanges={handleSaveChanges}
          />
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
