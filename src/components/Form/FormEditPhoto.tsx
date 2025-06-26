import React, { useState, useEffect } from "react";
import { Label } from "../ui/label";
import { useTheme } from "../../contexts/ThemeContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { updatePhoto } from "../../lib/features/inspection/inspectionSlice";
import { Button } from "../ui/button";

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

  const { isDarkModeEnabled } = useTheme();
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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await dispatch(
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

      onChange?.({
        label: photoLabel,
        needAttention: needAttention,
        displayInPdf: displayInPdf,
      });

      onSave?.({
        success: true,
      });
    } catch (error) {
      console.error("Error updating photo:", error);
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

      {/* Photo Display */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <img
            src={formatPath(photo.path)}
            alt={photoLabel || "Foto inspeksi"}
            className="w-full h-64 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
          />
          <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {photoLabel || "No label"}
          </div>
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
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md disabled:opacity-50"
        >
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>

      {/* Photo Info */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Info Foto:
        </h4>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <p>ID: {photo.id}</p>
          <p>Path: {photo.path}</p>
          <p>Status Perhatian: {needAttention ? "Ya" : "Tidak"}</p>
          <p>Tampil di PDF: {displayInPdf ? "Ya" : "Tidak"}</p>
        </div>
      </div>
    </div>
  );
}

export default FormEditPhoto;
