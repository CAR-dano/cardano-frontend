import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PhotoItemGeneral from "./PhotoItemGeneral";
import AddPhotoDialog from "./AddPhotoDialog";

interface HalamanFotoDokumenProps {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
  inspectionId?: string;
}

const HalamanFotoDokumen: React.FC<HalamanFotoDokumenProps> = ({
  data,
  editable,
  onClick = () => { },
  inspectionId = "",
}) => {
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false);

  if (data == undefined || data == null) {
    return <div>Loading...</div>;
  }

  const PHOTO_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const formatPath = (path: string) => {
    if (!path) return "/assets/placeholder-photo.png";
    if (path.startsWith("http")) return path;
    return PHOTO_URL + "/uploads/inspection-photos/" + path;
  };

  const handlePhotoUpdate = (photoId: string, updatedData: any) => {
    onClick?.({ type: "photo_update", photoId, data: updatedData });
  };

  return (
    <div className="text-black px-[30px] font-poppins">
      <Header />
      <div className="w-full border-2 border-black mt-5 mb-5 min-h-[830px]">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Foto Dokumen
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 gap-y-5 px-1 py-5 justify-around">
          {data.photos.map((item: any, index: any) => (
            <PhotoItemGeneral
              isLandscape={true}
              key={index}
              item={item}
              formatPath={formatPath}
              editable={editable}
              inspectionId={inspectionId}
              onPhotoUpdate={handlePhotoUpdate}
            />
          ))}
          {editable && data.photos.length < 2 && (
            <div
              className="w-[400px] h-[300px] border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:border-[#E95F37] hover:bg-gray-50 transition-all"
              onClick={() => setIsAddPhotoDialogOpen(true)}
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute w-full h-1 bg-gray-500"></div>
                <div className="absolute w-1 h-full bg-gray-500"></div>
              </div>
              <p className="text-gray-500 mt-2 font-semibold">Tambah Foto</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <AddPhotoDialog
        isOpen={isAddPhotoDialogOpen}
        inspectionId={inspectionId}
        category="Foto Dokumen"
        onClose={() => setIsAddPhotoDialogOpen(false)}
        onSave={(file, needsAttention, description) => {
          onClick?.({
            type: "add_new_photo",
            file,
            needAttention: needsAttention,
            label: description,
            category: "Foto Dokumen",
          });
          setIsAddPhotoDialogOpen(false);
        }}
      />
    </div>
  );
};

export default HalamanFotoDokumen;
