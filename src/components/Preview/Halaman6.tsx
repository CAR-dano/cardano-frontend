import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PenilaianHasil from "./PenilaianHasil";

interface Halaman6Props {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
}

const Halaman6: React.FC<Halaman6Props> = ({
  data,
  editable,
  onClick = () => {},
}) => {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  const handleClick = (data: any) => {
    if (onClick) {
      onClick(data);
    }
  };

  const PHOTO_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const formatPath = (path: string) => {
    if (!path) return "/assets/placeholder-photo.png";

    return PHOTO_URL + "/uploads/inspection-photos/" + path;
  };

  const findUrlPhoto = (photos: any, label: string) => {
    if (!photos) return "";
    console.log("photos", photos);
    const foundPhoto = photos.find((photo: any) => photo.label === label);
    return foundPhoto ? formatPath(foundPhoto.path) : "";
  };

  return (
    <div className="px-[30px] font-poppins text-black">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-8">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Hasil Inspeksi
            </p>
          </div>
        </div>

        <div className="w-full py-2 mb-2 border-b-2 border-black">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold mt-2">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              5
            </p>
            <p className="">Tools Test</p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {toolsTest.map((item, index) => (
              <PenilaianHasil
                edit={editable}
                onClick={handleClick}
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                subFieldName="toolsTest"
                beban={item.beban.toString()}
                nilai={
                  data.toolsTest[item.part] != undefined
                    ? data.toolsTest[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>

          <p className="text-[12px] px-2  mt-1 font-semibold">*Catatan:</p>
          <p className="text-[12px] px-3 min-h-[50px] mt-1 font-semibold">
            {data.toolsTest.catatan}
          </p>
        </div>

        <div className="flex gap-1 text-[14px] px-2 mb-10 font-semibold mt-2">
          <p className="">Foto General</p>
        </div>

        <div className="flex flex-wrap gap-1 gap-y-10 px-1 pb-4 justify-around mb-10">
          {dataPhotoGeneral.map((item, index) => (
            <div
              key={index}
              className=" flex items-center justify-center flex-col"
            >
              <img
                src={
                  findUrlPhoto(data.photos, item)
                    ? findUrlPhoto(data.photos, item)
                    : "/assets/placeholder-photo.png"
                }
                alt={item}
                className="w-[220px] h-[150px] object-cover"
              />
              <p className="text-center text-[16px] font-semibold mt-2">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Halaman6;

const toolsTest = [
  { namaPart: "Tebal Cat Body Depan", beban: 2, part: "tebalCatBodyDepan" },
  { namaPart: "Tebal Cat Body Kanan", beban: 2, part: "tebalCatBodyKanan" },
  { namaPart: "Tebal Cat Body Atap", beban: 2, part: "tebalCatBodyAtap" },
  { namaPart: "Tebal Cat Body Kiri", beban: 2, part: "tebalCatBodyKiri" },
  {
    namaPart: "Tebal Cat Body Belakang",
    beban: 2,
    part: "tebalCatBodyBelakang",
  },
  { namaPart: "Test ACCU (ON & OFF)", beban: 3, part: "testAccu" },
  { namaPart: "Temperatur AC Mobil", beban: 2, part: "temperaturACMobil" },
  { namaPart: "OBD Scanner", beban: 3, part: "obdScanner" },
];

const dataPhotoGeneral = [
  "Tampak Depan",
  "Tampak Belakang",
  "Tampak Samping Kanan",
  "Tampak Samping Kiri",
  "Random",
  "Random 2",
];
