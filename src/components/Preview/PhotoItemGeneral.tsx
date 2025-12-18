import React, { useRef, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import FormEditPhoto from "../Form/FormEditPhoto";
import Image from "next/image";

interface PhotoItemGeneralProps {
  item: {
    id: string;
    path: string;
    label: string;
    needAttention?: boolean;
    displayInPdf?: boolean;
  };
  formatPath: (path: string) => string;
  isLandscape?: boolean;
  editable?: boolean;
  inspectionId?: string;
  onPhotoUpdate?: (photoId: string, data: any) => void;
}

const PhotoItemGeneral: React.FC<PhotoItemGeneralProps> = ({
  item,
  formatPath,
  isLandscape = false,
  editable = false,
  inspectionId = "",
  onPhotoUpdate,
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [_currentFontSize, setCurrentFontSize] = useState(16); // Initial font size
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const capitalizeWords = (str: string) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const capitalizedLabel = capitalizeWords(item.label);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      const containerWidth = isLandscape ? 500 : 220; // Adjust based on layout

      if (textWidth > containerWidth) {
        const newSize = (containerWidth / textWidth) * 16 * 0.9;
        setCurrentFontSize(Math.max(newSize, 10)); // Ensure minimum font size of 10px
      } else {
        setCurrentFontSize(16); // Reset if it fits
      }
    }
  }, [item.label, isLandscape]); // Recalculate when label changes

  const handleClick = () => {
    if (editable) {
      setIsDialogOpen(true);
    }
  };

  const handlePhotoChange = (data: any) => {
    onPhotoUpdate?.(item.id, data);
  };

  return (
    <>
      <div
        className={`text-black flex items-center justify-center flex-col ${editable
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

        <Image
          unoptimized
          src={
            item.path
              ? (item.path.startsWith("http")
                ? item.path
                : formatPath(item.path))
              : "/assets/placeholder-photo.png"
          }
          alt={capitalizedLabel}
          width={isLandscape ? 500 : 220}
          height={isLandscape ? 375 : 150}
          className={
            isLandscape
              ? "w-[500px] h-[375px] object-cover"
              : "w-[220px] h-[150px] object-cover"
          }
        />

        {/* Status Indicators */}
        {editable && (
          <div className="flex gap-2 mt-1">
            {item.needAttention && (
              <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                Perlu Perhatian
              </span>
            )}
            {item.displayInPdf && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                PDF
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
              <DialogTitle>Edit Foto</DialogTitle>
            </DialogHeader>
            <FormEditPhoto
              label="Edit Foto Inspeksi"
              inputFor={`edit-photo-${item.id}`}
              photo={{
                id: item.id,
                path: item.path,
                label: item.label,
                needAttention: item.needAttention || false,
                displayInPdf: item.displayInPdf || false,
              }}
              inspectionId={inspectionId}
              onChange={handlePhotoChange}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default PhotoItemGeneral;
