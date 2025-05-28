import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface HalamanExteriorPhotoProps {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
}

const HalamanExteriorPhoto: React.FC<HalamanExteriorPhotoProps> = ({
  data,
  editable,
  onClick = () => {},
}) => {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  const findUrlPhoto = (photos: any, label: string) => {
    if (!photos) return "";
    const foundPhoto = photos.find((photo: any) => photo.label === label);
    return foundPhoto ? foundPhoto.path : "";
  };

  const PHOTO_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const formatPath = (path: string) => {
    if (!path) return "/assets/placeholder-photo.png";

    return PHOTO_URL + "/uploads/inspection-photos/" + path;
  };

  return (
    <div className="text-black px-[30px] font-poppins">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-8 min-h-[820px]">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Foto Eksterior
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 gap-y-10 px-1 py-12 justify-around mb-10">
          {data.photos.map((item: any, index: any) => (
            <div
              key={index}
              className=" flex items-center justify-center flex-col"
            >
              <img
                src={
                  item.path
                    ? formatPath(item.path)
                    : "/assets/placeholder-photo.png"
                }
                alt={item.label}
                className="w-[220px] h-[150px] object-cover"
              />
              <p className="text-center text-[16px] font-semibold mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HalamanExteriorPhoto;
