import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import FormEditPhoto from "../Form/FormEditPhoto";
import Image from "next/image";

interface PhotoTampakDepanProps {
  item: {
    id: string;
    path: string;
    label: string;
  };
  editable?: boolean;
  inspectionId?: string;
  onPhotoUpdate?: (photoId: string, data: any) => void;
}

const PhotoTampakDepan: React.FC<PhotoTampakDepanProps> = ({
  item,
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

  const PHOTO_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const formatPath = (path: string) => {
    if (!path) return "/assets/placeholder-photo.png";
    if (path.startsWith("http")) return path;
    return `${PHOTO_URL}/uploads/inspection-photos/${path}`;
  };

  return (
    <>
      <div
        className={`w-1/2 bg-[#B2BEB5] border-r-2 border-black h-48 ${editable
          ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800  transition-colors duration-200 relative group"
          : ""
          }`}
        onClick={handleClick}
      >
        <Image
          src={formatPath(currentPhotoPath)}
          alt={capitalizedLabel}
          width={200}
          height={200}
          className="mx-auto w-[90%] h-full object-cover "
          key={currentPhotoPath}
        />
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
                path: currentPhotoPath,
                label: item.label,
                needAttention: false,
                displayInPdf: true,
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

export default PhotoTampakDepan;
