import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import FormEditPhoto from "../Form/FormEditPhoto";

interface PhotoGeneralItemProps {
  item: {
    id: string;
    path: string;
    label: string;
    needAttention?: boolean;
    displayInPdf?: boolean;
  };
  formatPath: (path: string) => string;
  editable?: boolean;
  inspectionId?: string;
  onPhotoUpdate?: (photoId: string, data: any) => void;
}

const PhotoGeneralItem: React.FC<PhotoGeneralItemProps> = ({
  item,
  formatPath,
  editable = false,
  inspectionId = "",
  onPhotoUpdate,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // State untuk menyimpan path foto terbaru setelah update
  const [currentPhotoPath, setCurrentPhotoPath] = useState(item.path);

  // Update currentPhotoPath ketika item.path berubah (dari props)
  useEffect(() => {
    setCurrentPhotoPath(item.path);
  }, [item.path]);

  const capitalizeWords = (str: string) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const capitalizedLabel = capitalizeWords(item.label);

  const handleClick = () => {
    if (editable) {
      setIsDialogOpen(true);
    }
  };

  const handlePhotoChange = (data: any) => {
    // Update path foto lokal jika ada path baru dari response API
    // Ini memungkinkan tampilan foto diupdate langsung tanpa refresh halaman
    if (data.newPath) {
      setCurrentPhotoPath(data.newPath);
    }
    onPhotoUpdate?.(item.id, data);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === "true") {
      return;
    }
    target.dataset.fallbackApplied = "true";
    target.src = "/assets/placeholder-photo.png";
  };

  return (
    <>
      <div
        className={`text-black flex items-center justify-center flex-col ${
          editable
            ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 relative group"
            : ""
        }`}
        onClick={handleClick}
      >
        {/* Edit Indicator */}
        {editable && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <div className="bg-purple-600 text-white p-1 rounded-full text-xs">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        {editable && (
          <div className="absolute inset-0 bg-purple-600 bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-purple-600 font-semibold text-sm">
              Klik untuk edit
            </div>
          </div>
        )}

        <img
          src={
            currentPhotoPath
              ? formatPath(currentPhotoPath)
              : "/assets/placeholder-photo.png"
          }
          alt={capitalizedLabel}
          className="w-[220px] h-[150px] object-cover"
          key={currentPhotoPath} // Force re-render when path changes
          loading="lazy"
          decoding="async"
          onError={handleImageError}
        />

        <p className="text-center text-[16px] font-semibold mt-2">
          {capitalizedLabel}
        </p>

        {/* Status Indicators - Hanya tampil jika editable */}
        {editable && (
          <div className="flex gap-2 mt-1">
            {item.needAttention && (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Perlu Perhatian
              </span>
            )}
            {item.displayInPdf ? (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Tampil PDF
              </span>
            ) : (
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                Tidak Tampil PDF
              </span>
            )}
            {/* Indicator jika foto telah diupdate */}
            {currentPhotoPath !== item.path && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                ✓ Foto Diperbarui
              </span>
            )}
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      {editable && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Foto General</DialogTitle>
            </DialogHeader>
            <FormEditPhoto
              label="Edit Foto General"
              inputFor={`edit-general-photo-${item.id}`}
              photo={{
                id: item.id,
                path: currentPhotoPath, // Gunakan path terbaru
                label: item.label,
                needAttention: item.needAttention || false,
                displayInPdf: item.displayInPdf || false,
              }}
              inspectionId={inspectionId}
              onChange={handlePhotoChange}
              onSave={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PhotoGeneralItem;
