import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PhotoItemWithDynamicText from "./PhotoItemWithDynamicText";
import AddPhotoDialog from "./AddPhotoDialog";

interface HalamanKakiKakiPhotoProps {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
  inspectionId?: string;
}

const HalamanKakiKakiPhoto: React.FC<HalamanKakiKakiPhotoProps> = ({
  data,
  editable,
  onClick = () => {},
  inspectionId = "",
}) => {
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false);

  if (data == undefined || data == null) {
    return <div>Loading...</div>;
  }

  const PHOTO_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const formatPath = (path: string) => {
    if (!path) return "/assets/placeholder-photo.png";
    // Check if path is already a full URL (starts with http:// or https://)
    if (path.startsWith('http://')||path.startsWith('https://')) {
      return path; // Return as-is if it's already a full URL
    }
    // Otherwise, construct the URL with the backend prefix
    return PHOTO_URL + "/uploads/inspection-photos/" + path;
  };

  const handlePhotoUpdate = (photoId: string, updatedData: any) => {
    onClick?.({ type: "photo_update", photoId, data: updatedData });
  };

  return (
    <div className="text-black px-[30px] font-poppins">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-8 min-h-[830px]">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Foto Kaki-Kaki
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 gap-y-10 px-1 py-10 justify-around">
          {data.photos.map((item: any, index: any) => (
            <PhotoItemWithDynamicText
              key={index}
              item={item}
              formatPath={formatPath}
              editable={editable}
              inspectionId={inspectionId}
              onPhotoUpdate={handlePhotoUpdate}
            />
          ))}
          {editable && data.photos.length < 9 && (
            <div
              className="w-[200px] h-[200px] border border-gray-300 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => setIsAddPhotoDialogOpen(true)}
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute w-full h-1 bg-gray-500"></div>
                <div className="absolute w-1 h-full bg-gray-500"></div>
              </div>
              <p className="text-gray-500 mt-2">Add Photo</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <AddPhotoDialog
        isOpen={isAddPhotoDialogOpen}
        inspectionId={inspectionId}
        category="KakiKaki Tambahan"
        onClose={() => setIsAddPhotoDialogOpen(false)}
        onSave={(file, needsAttention, description) => {
          onClick?.({
            type: "add_new_photo",
            file,
            needAttention: needsAttention,
            label: description,
            category: "KakiKaki Tambahan",
          });
          setIsAddPhotoDialogOpen(false);
        }}
      />
    </div>
  );
};

export default HalamanKakiKakiPhoto;
