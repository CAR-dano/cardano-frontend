import React, { useState, useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import {
  updatePhoto,
  updatePhotoWithFile,
} from "../../lib/features/inspection/inspectionSlice";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import Image from "next/image";
import { toast } from "../../hooks/use-toast";

interface FormEditPhotoProps {
  label: string;
  inputFor: string;
  photo: {
    id: string;
    path: string;
    label: string;
    needAttention: boolean;
    displayInPdf: boolean;
  };
  inspectionId: string;
  onChange?: (value: any) => void;
  onSave?: (result: { success: boolean }) => void;
}

function FormEditPhoto({
  label,
  inputFor,
  photo,
  inspectionId,
  onChange,
  onSave,
}: FormEditPhotoProps) {
  const [photoLabel, setPhotoLabel] = useState(photo.label || "");
  const [needAttention, setNeedAttention] = useState(
    photo.needAttention || false
  );
  const [displayInPdf, setDisplayInPdf] = useState(photo.displayInPdf || false);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk foto baru
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [newPhotoPreview, setNewPhotoPreview] = useState<string | null>(null);
  const [showPhotoReplaceDialog, setShowPhotoReplaceDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State untuk menyimpan path foto terbaru dari response API
  const [currentPhotoPath, setCurrentPhotoPath] = useState(photo.path);

  const dispatch = useDispatch<AppDispatch>();

  const PHOTO_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const formatPath = (path: string) => {
    if (!path) return "/assets/placeholder-photo.png";
    return `${PHOTO_URL}/uploads/inspection-photos/${path}`;
  };

  useEffect(() => {
    setPhotoLabel(photo.label || "");
    setNeedAttention(photo.needAttention || false);
    setDisplayInPdf(photo.displayInPdf || false);
    setCurrentPhotoPath(photo.path); // Update path foto saat ini
    // Reset file states ketika photo prop berubah
    setNewPhotoFile(null);
    setNewPhotoPreview(null);
  }, [photo]);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoLabel(e.target.value);
  };

  const handleNeedAttentionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    setNeedAttention(checked);

    // Reset label when hiding input
    if (!checked) {
      setPhotoLabel("");
    }
  };

  const handleDisplayInPdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setDisplayInPdf(checked);
  };

  // Handler untuk memilih file foto baru
  // Validasi: hanya gambar, maksimal 5MB
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith("image/")) {
        alert("Harap pilih file gambar yang valid!");
        return;
      }

      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file terlalu besar! Maksimal 5MB.");
        return;
      }

      setNewPhotoFile(file);

      // Buat preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPhotoPreview(e.target?.result as string);
        setShowPhotoReplaceDialog(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler untuk konfirmasi penggantian foto
  // Menampilkan preview dan menyiapkan untuk proses save
  const handleConfirmPhotoReplace = () => {
    setShowPhotoReplaceDialog(false);
    // Preview sudah di-set, file sudah di-set, tinggal tunggu save
  };

  // Handler untuk membatalkan penggantian foto
  // Reset semua state yang berkaitan dengan foto baru
  const handleCancelPhotoReplace = () => {
    setShowPhotoReplaceDialog(false);
    setNewPhotoFile(null);
    setNewPhotoPreview(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handler untuk menghapus foto baru yang dipilih
  // Memungkinkan user untuk membatalkan pilihan foto tanpa menutup dialog
  const handleRemoveNewPhoto = () => {
    setNewPhotoFile(null);
    setNewPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handler untuk menyimpan perubahan
  // Menggunakan API yang berbeda tergantung ada tidaknya foto baru
  // Update foto langsung setelah mendapat response dari API
  const handleSave = async () => {
    setIsLoading(true);
    try {
      let apiResponse;

      // Jika ada foto baru, gunakan updatePhotoWithFile
      if (newPhotoFile) {
        apiResponse = await dispatch(
          updatePhotoWithFile({
            id: inspectionId,
            photosId: photo.id,
            data: {
              label: photoLabel,
              needAttention: needAttention,
              displayInPdf: displayInPdf,
              file: newPhotoFile,
            },
          })
        ).unwrap();

        // Update path foto dari response API dan refresh tampilan
        // Response API biasanya berisi path foto baru setelah upload berhasil
        if (apiResponse?.path) {
          setCurrentPhotoPath(apiResponse.path);
          // Reset state foto baru karena sudah berhasil diupload
          setNewPhotoFile(null);
          setNewPhotoPreview(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      } else {
        // Jika tidak ada foto baru, gunakan updatePhoto biasa
        console.log("Updating photo without new file");
        apiResponse = await dispatch(
          updatePhoto({
            id: inspectionId,
            photosId: photo.id,
            data: {
              label: photoLabel,
              needAttention: needAttention,
              displayInPdf: displayInPdf,
            },
          })
        ).unwrap();
      }

      // Callback dengan data terbaru termasuk path foto baru (jika ada)
      onChange?.({
        label: photoLabel,
        needAttention: needAttention,
        displayInPdf: displayInPdf,
        hasNewPhoto: !!newPhotoFile,
        newPath: apiResponse?.path || currentPhotoPath, // Path foto terbaru
      });

      onSave?.({
        success: true,
      });
    } catch (error) {
      console.error("Error saving photo changes:", error);
      toast({
        title: "Error",
        description: "Gagal menyimpan perubahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-rubik space-y-6">
      <Label
        className="text-xl font-normal dark:text-gray-200"
        htmlFor={inputFor}
      >
        {label}
      </Label>

      {/* Photo Display - Side by Side Comparison */}
      <div className="space-y-4">
        {/* Button untuk memilih foto baru */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center space-y-2">
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              {newPhotoFile ? "Ganti Foto Lain" : "Pilih Foto Baru"}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Format: JPG, PNG, JPEG | Max: 5MB
            </p>
          </div>
        </div>

        {/* Photo Comparison */}
        <div
          className={`grid ${
            newPhotoPreview ? "grid-cols-2" : "grid-cols-1"
          } gap-4`}
        >
          {/* Foto Lama */}
          <div className="flex flex-col items-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Foto Saat Ini
            </h3>
            <div className="relative w-full max-w-md">
              <Image
                src={formatPath(currentPhotoPath)}
                alt={photoLabel || "Foto inspeksi saat ini"}
                className="w-full h-64 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                key={currentPhotoPath} // Force re-render when path changes
                width={500}
                height={300}
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {photoLabel || "No label"}
              </div>
            </div>
          </div>

          {/* Foto Baru (jika ada) */}
          {newPhotoPreview && (
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">
                  Foto Baru
                </h3>
                <Button
                  type="button"
                  onClick={handleRemoveNewPhoto}
                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
                >
                  Hapus
                </Button>
              </div>
              <div className="relative w-full max-w-md">
                <Image
                  src={newPhotoPreview}
                  alt="Foto baru"
                  className="w-full h-64 object-cover rounded-lg border-2 border-green-500 dark:border-green-400"
                  width={500}
                  height={300}
                />
                <div className="absolute bottom-2 left-2 bg-green-600 bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  Foto Baru
                </div>
              </div>
              {/* Warning untuk foto baru */}
              <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 w-full max-w-md">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Peringatan
                  </span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Setelah disimpan, foto lama tidak dapat dikembalikan. Pastikan
                  foto baru sudah sesuai.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Label Input - Hidden when needAttention is false */}
      {needAttention && (
        <div>
          <Label
            className="text-lg font-medium dark:text-gray-200 mb-2 block"
            htmlFor={`${inputFor}-label`}
          >
            Label Foto
          </Label>
          <input
            type="text"
            id={`${inputFor}-label`}
            name={`${inputFor}-label`}
            value={photoLabel}
            onChange={handleLabelChange}
            placeholder="Masukkan label foto..."
            className="mt-1 px-4 py-3 block w-full rounded-md border-2 border-purple-500 text-lg focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-100 dark:border-purple-800 dark:focus:border-purple-800 dark:focus:ring-purple-800"
          />
        </div>
      )}

      {/* Checkboxes */}
      <div className="space-y-4">
        {/* Need Attention Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id={`${inputFor}-needAttention`}
            name={`${inputFor}-needAttention`}
            checked={needAttention}
            onChange={handleNeedAttentionChange}
            className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <Label
            htmlFor={`${inputFor}-needAttention`}
            className="text-lg font-medium dark:text-gray-200 cursor-pointer"
          >
            Perlu Perhatian
          </Label>
        </div>

        {/* Display In PDF Checkbox */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id={`${inputFor}-displayInPdf`}
            name={`${inputFor}-displayInPdf`}
            checked={displayInPdf}
            onChange={handleDisplayInPdfChange}
            className="w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <Label
            htmlFor={`${inputFor}-displayInPdf`}
            className="text-lg font-medium dark:text-gray-200 cursor-pointer"
          >
            Tampilkan di PDF
          </Label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className={`px-6 py-2 text-white rounded-md disabled:opacity-50 ${
            newPhotoFile
              ? "bg-green-600 hover:bg-green-700"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>{newPhotoFile ? "Mengganti Foto..." : "Menyimpan..."}</span>
            </span>
          ) : newPhotoFile ? (
            "Simpan & Ganti Foto"
          ) : (
            "Simpan Perubahan"
          )}
        </Button>
      </div>

      {/* Photo Info */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Info Foto:
        </h4>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>ID: {photo.id}</p>
          <p>Path: {currentPhotoPath}</p>
          <p>Status Perhatian: {needAttention ? "Ya" : "Tidak"}</p>
          <p>Tampil di PDF: {displayInPdf ? "Ya" : "Tidak"}</p>
          {newPhotoFile && (
            <p className="text-green-600 dark:text-green-400">
              File Baru: {newPhotoFile.name} (
              {(newPhotoFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          {currentPhotoPath !== photo.path && (
            <p className="text-blue-600 dark:text-blue-400">
              ✓ Foto telah diperbarui
            </p>
          )}
        </div>
      </div>

      {/* Dialog Konfirmasi Penggantian Foto */}
      <Dialog
        open={showPhotoReplaceDialog}
        onOpenChange={setShowPhotoReplaceDialog}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Konfirmasi Penggantian Foto
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <svg
                  className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-yellow-800 dark:text-yellow-200">
                  Peringatan Penting
                </span>
              </div>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                Anda akan mengganti foto yang sudah ada.{" "}
                <strong>Foto lama tidak dapat dikembalikan</strong> setelah
                proses penyimpanan selesai.
              </p>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>File yang dipilih:</strong>
              </p>
              <p>Nama: {newPhotoFile?.name}</p>
              <p>
                Ukuran:{" "}
                {newPhotoFile
                  ? (newPhotoFile.size / 1024 / 1024).toFixed(2) + " MB"
                  : ""}
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleConfirmPhotoReplace}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                Ya, Lanjutkan
              </Button>
              <Button
                onClick={handleCancelPhotoReplace}
                variant="outline"
                className="flex-1"
              >
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FormEditPhoto;
