import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PhotoItemPerluPerhatian from "./PhotoItemPerluPerhatian";

interface HalamanPerluPerhatianPhotoProps {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
  inspectionId?: string;
}

const HalamanPerluPerhatianPhoto: React.FC<HalamanPerluPerhatianPhotoProps> = ({
  data,
  editable,
  onClick = () => {},
  inspectionId = "",
}) => {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  const PHOTO_URL = process.env.NEXT_PUBLIC_API_URL;

  const formatPath = (path: string) => {
    if (!path) return "/assets/placeholder-photo.png";

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
              Foto Perlu Perhatian
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 gap-y-10 px-1 py-10 justify-around">
          {data.photos.map((item: any, index: any) => (
            <PhotoItemPerluPerhatian
              key={index}
              item={item}
              formatPath={formatPath}
              editable={editable}
              inspectionId={inspectionId}
              onPhotoUpdate={handlePhotoUpdate}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HalamanPerluPerhatianPhoto;
