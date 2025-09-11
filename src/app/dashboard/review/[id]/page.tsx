"use client";
import DialogResult from "../../../../components/Dialog/DialogResult";
import EditedData from "../../../../components/EditReview/EditedData";
import EditReviewComponents from "../../../../components/EditReview/EditReview";
import { DialogForm } from "../../../../components/Form/DialogForm";
import Loading from "../../../../components/Loading";
import {
  approveInspectionData,
  getDataForPreview,
  mintingToBlockchain,
  saveDataEdited,
  setEditedData,
} from "../../../../lib/features/inspection/inspectionSlice";
import { AppDispatch, useAppSelector } from "../../../../lib/store";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Button } from "../../../../components/ui/button"; // Import Button component
import { toast } from "../../../../hooks/use-toast";

const Header = ({
  hasChanges,
  data,
  processing,
  id,
  router,
  handleApprove,
  setShowApprovalConfirmationDialog,
}: any) => {
  const { isDarkModeEnabled } = useTheme();

  const handleGetLinkPreview = () => {
    const previewUrl = `https://cardano-pdf.vercel.app/data/${id}`;
    navigator.clipboard.writeText(previewUrl);
    toast({
      title: "Tautan Disalin!",
      description: "Tautan pratinjau telah disalin ke papan klip.",
      variant: "default",
    });
  };

  const handlePreview = () => {
    router.push(`/dashboard/preview/${id}`);
  };

  const handleApproveClick = () => {
    if (hasChanges > 0) {
      toast({
        title: "Tidak Dapat Menyetujui",
        description:
          "Harap simpan semua perubahan sebelum menyetujui inspeksi.",
        variant: "destructive",
      });
      return;
    }
    // Show approval confirmation dialog instead of directly approving
    setShowApprovalConfirmationDialog(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 mb-6 w-full max-w-full overflow-hidden">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Review Inspeksi
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {data?.vehiclePlateNumber || "Memuat data..."} -{" "}
            {data?.identityDetails?.namaCustomer || ""}
          </p>
          {processing && (
            <div className="flex items-center mt-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
              <span className="text-sm text-orange-600 dark:text-orange-300">
                Memproses...
              </span>
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handleGetLinkPreview}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Dapatkan Tautan Pratinjau
          </Button>
          <Button
            onClick={handlePreview}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Pratinjau
          </Button>
          <Button
            onClick={handleApproveClick}
            disabled={processing || hasChanges > 0}
            className={`${
              hasChanges > 0
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            } disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            title={hasChanges > 0 ? "Simpan perubahan sebelum menyetujui" : ""}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {processing
              ? "Memproses..."
              : hasChanges > 0
              ? "Simpan Dulu"
              : "Setujui"}
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      {hasChanges > 0 && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-amber-500 dark:text-amber-300 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span className="text-sm text-amber-800 dark:text-amber-300">
              Ada {hasChanges} perubahan yang belum disimpan. Simpan perubahan
              sebelum menyetujui inspeksi.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const BottomActionBar = ({
  handleSaveChanges,
  hasChanges,
  data,
  processing,
  onOpenDrawer,
}: any) => {
  const { isDarkModeEnabled } = useTheme();
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-xl z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Status Info */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenDrawer}
              className={`flex items-center space-x-2 transition-colors ${
                hasChanges > 0
                  ? "text-blue-600 hover:text-blue-700"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  hasChanges > 0
                    ? "bg-blue-100"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
              >
                <svg
                  className="w-4 h-4"
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
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {hasChanges > 0 ? "Lihat Perubahan" : "Tidak Ada Perubahan"}
                </p>
                {hasChanges > 0 && (
                  <p className="text-xs text-blue-600">
                    {hasChanges} perubahan belum disimpan
                  </p>
                )}
              </div>
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
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Save Changes Button */}
            <button
              onClick={handleSaveChanges}
              disabled={!hasChanges || processing}
              className={`inline-flex items-center px-3 py-2 border shadow-sm text-xs font-medium rounded-md transition-colors duration-200 ${
                hasChanges && !processing
                  ? "border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  : "border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 cursor-not-allowed"
              }`}
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {hasChanges ? `Simpan (${hasChanges})` : "Simpan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChangesDrawer = ({
  isOpen,
  onClose,
  data,
  id,
  cancelEdit,
  updateData,
  hasChanges,
}: any) => {
  const { isDarkModeEnabled } = useTheme();
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl shadow-2xl dark:shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-300"
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
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Perubahan Data
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {hasChanges > 0
                  ? `${hasChanges} perubahan belum disimpan`
                  : "Tidak ada perubahan"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>

        {/* Drawer Content */}
        <div className="max-h-[70vh] overflow-y-auto p-4">
          {data && (
            <EditedData
              cancelEdit={cancelEdit}
              id={id}
              updateData={updateData}
            />
          )}
        </div>

        {/* Drag Handle */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </>
  );
};

const Edit = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useAppSelector((state: any) => state.inspection.isLoading);
  const router = useRouter();
  const params = useParams();
  const user = useAppSelector((state) => state.auth.user);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState<any>({
    fieldName: "",
    subFieldName: "",
    subsubfieldname: "",
    label: "",
    oldValue: "",
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

  const [showMintConfirmationDialog, setShowMintConfirmationDialog] =
    useState(false);

  const [showApprovalConfirmationDialog, setShowApprovalConfirmationDialog] =
    useState(false);

  const [data, setData] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Add new state to track unsaved changes
  const [unsavedChanges, setUnsavedChanges] = useState<any[]>([]);

  // Get the id from URL params
  const id = typeof params?.id === "string" ? params.id : "";

  // Get edited items from Redux store (for history/log)
  const editedItems = useAppSelector((state) => state.inspection.edited).filter(
    (item) => item.inspectionId === id
  );

  const handleEditReviewClick = (actionData: any) => {
    if (actionData.type === "photo_update") {
      updateFoto(actionData.photoId, actionData.data);
    } else if (actionData.type === "photo_added") {
      // Handle new photo added from AddPhotoDialog
      setData((prevData: any) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          photos: [...(prevData.photos || []), actionData.newPhotoData],
        };
      });
      toast({
        title: "Foto Ditambahkan",
        description: "Foto baru telah berhasil ditambahkan.",
        variant: "default",
      });
    } else {
      setDialogData(actionData);
      setIsDialogOpen(true);
    }
  };

  const updateFoto = (photoId: string, updatedData: any) => {
    if (!id) return;

    // Update the data state with the new photo data
    setData((prevData: any) => {
      if (!prevData || !prevData.photos) return prevData;

      return {
        ...prevData,
        photos: prevData.photos.map((photo: any) =>
          photo.id === photoId ? { ...photo, ...updatedData } : photo
        ),
      };
    });
  };

  const getData = async (id: string) => {
    try {
      const response = await dispatch(getDataForPreview(id)).unwrap();
      if (response) {
        setData(response);
        toast({
          title: "Data berhasil dimuat",
          description: "Data inspeksi siap untuk direview.",
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Gagal memuat data",
        description: "Terjadi kesalahan saat mengambil data inspeksi.",
        variant: "destructive",
      });
      setDialogResultData({
        isOpen: true,
        isSuccess: false,
        title: "Data Tidak Ditemukan",
        message:
          "Tidak dapat mengambil data inspeksi. Mungkin tidak ada atau terjadi kesalahan.",
        buttonLabel2: "Kembali ke Daftar Review",
        action2: () => router.push("/dashboard/review"),
      });
    }
  };

  const updateData = (data: any) => {
    data.map((item: any) => {
      const {
        inspectionId,
        fieldName,
        subFieldName,
        subsubfieldname,
        oldValue,
      } = item;
      let { newValue } = item;
      if (subsubfieldname) {
        setData((prevData: any) => {
          if (!prevData) return prevData;

          return {
            ...prevData,
            [fieldName]: {
              ...(prevData[fieldName] || {}),
              [subFieldName]: {
                ...(prevData[fieldName]?.[subFieldName] || {}),
                [subsubfieldname]: newValue,
              },
            },
          };
        });
      } else if (subFieldName) {
        setData((prevData: any) => {
          if (!prevData) return prevData;

          if (subFieldName === "estimasiPerbaikan") {
            // Handle special case for estimasiPerbaikan
            if (typeof newValue === "string") {
              try {
                const parsedValue = JSON.parse(newValue);
                if (Array.isArray(parsedValue)) {
                  newValue = parsedValue;
                }
              } catch (error) {
                // Not JSON or not an array, keep as string
              }
            }
          }

          return {
            ...prevData,
            [fieldName]: {
              ...(prevData[fieldName] || {}),
              [subFieldName]: newValue,
            },
          };
        });
      } else {
        setData((prevData: any) => {
          if (!prevData) return prevData;

          return {
            ...prevData,
            [fieldName]: newValue,
          };
        });
      }
    });
  };

  useEffect(() => {
    if (id) {
      getData(id);
    } else {
      router.push("/dashboard/review");
    }
  }, [id, router]);

  const updateDataHandler = async (
    newValue: any,
    subFieldName: any,
    subsubfieldname: any,
    fieldName: string
  ) => {
    try {
      if (typeof newValue === "string") {
        try {
          const parsedValue = JSON.parse(newValue);
          if (Array.isArray(parsedValue)) {
            newValue = parsedValue;
          }
        } catch (error) {
          // Not JSON or not an array, keep as string
        }
      }

      setData((prevData: any) => {
        if (!prevData) return prevData;

        if (subsubfieldname) {
          return {
            ...prevData,
            [fieldName]: {
              ...(prevData[fieldName] || {}),
              [subFieldName]: {
                ...(prevData[fieldName]?.[subFieldName] || {}),
                [subsubfieldname]: newValue,
              },
            },
          };
        } else if (subFieldName) {
          return {
            ...prevData,
            [fieldName]: {
              ...(prevData[fieldName] || {}),
              [subFieldName]: newValue,
            },
          };
        } else {
          return {
            ...prevData,
            [fieldName]: newValue,
          };
        }
      });

      const desc = subsubfieldname
        ? `${subFieldName} - ${
            subsubfieldname.charAt(0).toUpperCase() + subsubfieldname.slice(1)
          }`
        : subFieldName;

      // Show toast notification for confirmation
      toast({
        title: "Isian diperbarui",
        description: `${subsubfieldname ? `` : fieldName}${
          desc ? ` ${desc}` : ``
        } telah diperbarui.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating data:", error);
      toast({
        title: "Pembaruan gagal",
        description: "Tidak dapat memperbarui nilai isian.",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = (
    oldValue: any,
    subFieldName: string,
    fieldName: string
  ) => {
    setData((prevData: any) => {
      if (subFieldName) {
        return {
          ...prevData,
          [fieldName]: {
            ...prevData[fieldName],
            [subFieldName]: oldValue,
          },
        };
      } else {
        return {
          ...prevData,
          [fieldName]: oldValue,
        };
      }
    });
  };

  const mintingToBlockchainHandler = (id: string) => {
    setProcessing(true);

    dispatch(mintingToBlockchain(id))
      .then((response) => {
        setProcessing(false);
        setDialogResultData({
          isOpen: true,
          isSuccess: true,
          title: "Berhasil Dicetak ke Blockchain",
          message:
            "Data inspeksi telah berhasil disetujui dan dicetak ke blockchain. Anda dapat melihatnya di database.",
          buttonLabel2: "Lihat di Database",
          action2: () => router.push("/dashboard/database"),
        });
      })
      .catch((err) => {
        setProcessing(false);
        setDialogResultData({
          isOpen: true,
          isSuccess: false,
          title: "Pencetakan Gagal",
          message:
            "Gagal mencetak data ke blockchain. Apakah Anda ingin mencoba lagi?",
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
    if (!id) return;

    setProcessing(true);
    dispatch(approveInspectionData(id))
      .then((response) => {
        setProcessing(false);
        if (response.meta.requestStatus === "fulfilled") {
          setDialogResultData({
            isOpen: true,
            isSuccess: true,
            title: "Inspeksi Disetujui",
            message:
              "Data inspeksi telah disetujui. Apakah Anda ingin melanjutkan dengan pencetakan ke blockchain?",
            buttonLabel1: "Nanti",
            buttonLabel2:
              user?.role === "ADMIN" ? "Cetak Sekarang" : "Lihat di Database",
            action1: () => router.push("/dashboard/database"),
            action2: () => {
              setDialogResultData(null); // Close the current dialog
              if (user?.role === "ADMIN") {
                mintingToBlockchainHandler(id);
              } else {
                router.push("/dashboard/database");
              }
            },
          });
        } else {
          setDialogResultData({
            isOpen: true,
            isSuccess: false,
            title: "Persetujuan Gagal",
            message:
              "Data ini mungkin telah disetujui sebelumnya atau ada masalah dengan proses persetujuan.",
            buttonLabel1: "Kembali ke Database",
            buttonLabel2: "Coba Lagi",
            action1: () => router.push("/dashboard/database"),
            action2: () => router.push("/dashboard/review"),
          });
        }
      })
      .catch(() => {
        setProcessing(false);
        setDialogResultData({
          isOpen: true,
          isSuccess: false,
          title: "Persetujuan Gagal",
          message: "Terjadi kesalahan saat menyetujui data inspeksi.",
          buttonLabel1: "Kembali ke Database",
          buttonLabel2: "Coba Lagi",
          action1: () => router.push("/dashboard/database"),
          action2: () => approveInspection(),
        });
      });
  };

  const handleSaveChanges = () => {
    if (!unsavedChanges || unsavedChanges.length === 0) {
      toast({
        title: "Tidak ada perubahan untuk disimpan",
        description: "Anda belum membuat perubahan apa pun pada data inspeksi.",
        variant: "default",
      });
      return;
    }

    const result: Record<string, any> = {};

    unsavedChanges.forEach(
      ({ fieldName, subFieldName, subsubfieldname, newValue }) => {
        if (!result[fieldName]) {
          result[fieldName] = {};
        }

        if (subFieldName) {
          if (subFieldName == "namaInspektor") {
            subFieldName = "inspectorId";
          }

          if (!result[fieldName][subFieldName]) {
            result[fieldName][subFieldName] = {};
          }
          if (subsubfieldname) {
            result[fieldName][subFieldName][subsubfieldname] = newValue;
          } else {
            result[fieldName][subFieldName] = newValue;
          }
        } else {
          result[fieldName] = newValue;
        }

        if (subFieldName == "estimasiPerbaikan") {
          // Handle special case for estimasiPerbaikan
          if (typeof newValue === "string") {
            try {
              const parsedValue = JSON.parse(newValue);
              if (Array.isArray(parsedValue)) {
                result[fieldName][subFieldName] = parsedValue;
              }
            } catch (error) {
              // Not JSON or not an array, keep as string
            }
          }
        }
      }
    );

    if (id) {
      setProcessing(true);
      dispatch(saveDataEdited({ id, data: result }))
        .unwrap()
        .then(() => {
          setProcessing(false);
          // Clear unsaved changes after successful save
          setUnsavedChanges([]);
          setDialogResultData({
            isOpen: true,
            isSuccess: true,
            title: "Perubahan Berhasil Disimpan",
            message: "Perubahan Anda pada data inspeksi telah disimpan.",
            buttonLabel1: "Kembali ke Daftar Review",
            buttonLabel2: "Lihat Data Terbaru",
            action1: () => router.push("/dashboard/review"),
            action2: () => window.location.reload(),
          });
        })
        .catch((err) => {
          setProcessing(false);
          setDialogResultData({
            isOpen: true,
            isSuccess: false,
            title: "Gagal Menyimpan Perubahan",
            message:
              "Terjadi kesalahan saat menyimpan perubahan Anda. Silakan coba lagi.",
            buttonLabel1: "Kembali ke Draf Review",
            buttonLabel2: "Coba Lagi",
            action1: () => router.push("/dashboard/review"),
            action2: () => handleSaveChanges(),
          });
        });
    }
  };

  return (
    <>
      {isLoading || processing ? (
        <Loading />
      ) : (
        <>
          <Header
            hasChanges={unsavedChanges.length} // Use unsavedChanges instead of editedItems
            data={data}
            processing={processing}
            id={id}
            router={router}
            handleApprove={approveInspection}
            setShowApprovalConfirmationDialog={
              setShowApprovalConfirmationDialog
            }
          />
          <div className="w-full mb-20">
            <EditReviewComponents
              data={data}
              onClick={handleEditReviewClick}
              inspectionId={id}
            />
          </div>

          {/* Bottom Action Bar */}
          <BottomActionBar
            handleSaveChanges={handleSaveChanges}
            hasChanges={unsavedChanges.length} // Use unsavedChanges instead of editedItems
            data={data}
            processing={processing}
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />

          {/* Changes Drawer */}
          <ChangesDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            data={data}
            id={id}
            cancelEdit={cancelEdit}
            updateData={updateData}
            hasChanges={unsavedChanges.length} // Use unsavedChanges instead of editedItems
          />

          {/* Dialog Form */}
          {isDialogOpen && (
            <DialogForm
              isOpen={isDialogOpen}
              label={dialogData.label}
              fieldName={dialogData.fieldName}
              subFieldName={dialogData.subFieldName}
              oldValue={dialogData.oldValue}
              type={dialogData.type}
              onClose={() => setIsDialogOpen(false)}
              onSave={(newValue) => {
                updateDataHandler(
                  newValue,
                  dialogData.subFieldName,
                  dialogData.subsubfieldname,
                  dialogData.fieldName
                );

                // Add to Redux store (for history/log)
                dispatch(
                  setEditedData({
                    inspectionId: data.id,
                    subFieldName: dialogData.subFieldName,
                    subsubfieldname: dialogData.subsubfieldname,
                    fieldName: dialogData.fieldName,
                    oldValue: dialogData.oldValue,
                    newValue: newValue,
                  })
                );

                // Add to unsaved changes state
                const changeData = {
                  inspectionId: data.id,
                  subFieldName: dialogData.subFieldName,
                  subsubfieldname: dialogData.subsubfieldname,
                  fieldName: dialogData.fieldName,
                  oldValue: dialogData.oldValue,
                  newValue: newValue,
                };

                setUnsavedChanges((prev) => {
                  // Remove existing change for the same field if exists
                  const filtered = prev.filter(
                    (item) =>
                      !(
                        item.fieldName === changeData.fieldName &&
                        item.subFieldName === changeData.subFieldName &&
                        item.subsubfieldname === changeData.subsubfieldname
                      )
                  );
                  // Add the new change
                  return [...filtered, changeData];
                });

                setIsDialogOpen(false);
              }}
            />
          )}

          {/* Result Dialog */}
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

          {/* Approval Confirmation Dialog */}
          {showApprovalConfirmationDialog && (
            <DialogResult
              isOpen={showApprovalConfirmationDialog}
              isSuccess={false} // This is a confirmation, not a success/failure
              title="Konfirmasi Persetujuan Inspeksi"
              message="Apakah Anda yakin ingin menyetujui data inspeksi ini? Setelah disetujui, data akan siap untuk dicetak ke blockchain."
              buttonLabel1="Batal"
              buttonLabel2="Ya, Setujui"
              action1={() => setShowApprovalConfirmationDialog(false)} // Close dialog on cancel
              action2={() => {
                setShowApprovalConfirmationDialog(false); // Close dialog
                approveInspection(); // Proceed with approval
              }}
              onClose={() => setShowApprovalConfirmationDialog(false)}
            />
          )}

          {/* Minting Confirmation Dialog */}
          {showMintConfirmationDialog && (
            <DialogResult
              isOpen={showMintConfirmationDialog}
              isSuccess={false} // This is a confirmation, not a success/failure
              title="Konfirmasi Minting ke Blockchain"
              message="Apakah Anda yakin ingin mencetak data inspeksi ini ke blockchain? Tindakan ini tidak dapat diurungkan."
              buttonLabel1="Batal"
              buttonLabel2="Ya, Cetak Sekarang"
              action1={() => setShowMintConfirmationDialog(false)} // Close dialog on cancel
              action2={() => {
                setShowMintConfirmationDialog(false); // Close dialog
                mintingToBlockchainHandler(id); // Proceed with minting
              }}
              onClose={() => setShowMintConfirmationDialog(false)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Edit;
