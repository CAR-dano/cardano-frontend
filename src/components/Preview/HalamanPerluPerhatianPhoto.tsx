import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PhotoItemWithDynamicText from "./PhotoItemWithDynamicText";

interface HalamanPerluPerhatianPhotoProps {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
}

const HalamanPerluPerhatianPhoto: React.FC<HalamanPerluPerhatianPhotoProps> = ({
  data,
  editable,
  onClick = () => {},
}) => {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  const PHOTO_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const formatPath = (path: string) => {
    if (!path) return "/assets/placeholder-photo.png";

    return PHOTO_URL + "/uploads/inspection-photos/" + path;
  };

  return (
    <div className="text-black px-[30px] font-poppins">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-8 min-h-[830px]">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Hasil Inspeksi
            </p>
          </div>
        </div>

        <p className="font-poppins p-2 font-bold">Perlu Perhatian</p>

        <div className="flex flex-wrap gap-1 gap-y-10 px-1 py-5 justify-around">
          {data.photos.map((item: any, index: any) => (
            <PhotoItemWithDynamicText
              key={index}
              item={item}
              formatPath={formatPath}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HalamanPerluPerhatianPhoto;
