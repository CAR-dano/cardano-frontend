import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import PenilaianHasil from "./PenilaianHasil";
import PhotoGeneralItem from "./PhotoGeneralItem";
import Image from "next/image";
import AddPhotoDialog from "./AddPhotoDialog";

interface Halaman6Props {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
  inspectionId?: string;
  onPhotoUpdate?: (photoId: string, data: any) => void;
}

const Halaman6: React.FC<Halaman6Props> = ({
  data,
  editable,
  onClick = () => {},
  inspectionId = "",
  onPhotoUpdate,
}) => {
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false);
  const [selectedMissingLabel, setSelectedMissingLabel] = useState("");

  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  // Define required photos for General Wajib
  const requiredGeneralPhotos = [
    "Tampak Depan",
    "Tampak Belakang",
    "Tampak Samping Kanan",
    "Tampak Samping Kiri",
  ];

  // Get existing photo labels
  const existingLabels =
    data.fotoGeneral?.map((photo: any) => photo.label) || [];

  // Find missing photos
  const missingPhotos = requiredGeneralPhotos.filter(
    (label) => !existingLabels.includes(label)
  );

  const handleClick = (data: any) => {
    if (onClick) {
      onClick(data);
    }
  };

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

  const capitalizeFirstLetterOfSentences = (text: string) => {
    const cleanedText = text.replace(/^•\s*/, "");
    if (!cleanedText) return "";
    return cleanedText.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
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
                subSubFieldName={item.part}
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

          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Catatan toolsTest`,
                fieldName: `detailedAssessment`,
                oldValue: data.toolsTest.catatan,
                subFieldName: "toolsTest",
                subsubfieldname: "catatan",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`text-[12px] px-1 mt-1 font-semibold flex min-h-[55px] ${
              editable ? "cursor-pointer group hover:bg-[#F4622F]" : ""
            }`}
          >
            *Catatan:
            {data.toolsTest.catatan && data.toolsTest.catatan.length > 0 ? (
              <div
                className={`text-[12px] font-semibold flex ${
                  data.toolsTest.catatan.length >= 3
                    ? "flex-row flex-wrap"
                    : "flex-col justify-center items-center"
                } ${editable ? "group-hover:text-white" : ""}`}
              >
                <ol
                  className={`list-disc pl-5 ${
                    data.toolsTest.catatan.length >= 3 ? "w-1/2" : "w-full"
                  }`}
                >
                  {data.toolsTest.catatan
                    .slice(
                      0,
                      data.toolsTest.catatan.length >= 3
                        ? Math.ceil(data.toolsTest.catatan.length / 2)
                        : data.toolsTest.catatan.length
                    )
                    .map((item: any, index: any) => (
                      <li key={index} className="text-[12px]">
                        {capitalizeFirstLetterOfSentences(item)}
                      </li>
                    ))}
                </ol>
                {data.toolsTest.catatan.length >= 3 && (
                  <ol className="list-disc pl-5 w-1/2">
                    {data.toolsTest.catatan
                      .slice(Math.ceil(data.toolsTest.catatan.length / 2))
                      .map((item: any, index: any) => (
                        <li key={index} className="text-[12px]">
                          {capitalizeFirstLetterOfSentences(item)}
                        </li>
                      ))}
                  </ol>
                )}
              </div>
            ) : (
              <div className="text-[12px] font-semibold py-4">-</div>
            )}
          </div>
        </div>

        <div className="flex gap-1 text-[14px] px-2 mb-10 font-semibold mt-2">
          <p className="">Foto General</p>
        </div>

        <div className="flex flex-wrap gap-1 gap-y-10 px-1 pb-4 justify-around mb-10">
          {data.fotoGeneral &&
            data.fotoGeneral.map((photo: any, index: number) => (
              <PhotoGeneralItem
                key={index}
                item={{
                  id: photo.id || `general-photo-${index}`,
                  path: photo.path,
                  label: photo.label,
                  needAttention: photo.needAttention || false,
                  displayInPdf: photo.displayInPdf || false,
                }}
                formatPath={formatPath}
                editable={editable}
                inspectionId={inspectionId}
                onPhotoUpdate={onPhotoUpdate}
              />
            ))}

          {/* Add missing photos buttons */}
          {editable &&
            missingPhotos.length > 0 &&
            missingPhotos.map((label, index) => (
              <div
                key={`missing-${index}`}
                className="flex flex-col items-center"
              >
                <div
                  className="w-[200px] h-[200px] border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:border-[#E95F37] hover:bg-gray-50 transition-all"
                  onClick={() => {
                    setSelectedMissingLabel(label);
                    setIsAddPhotoDialogOpen(true);
                  }}
                >
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute w-full h-1 bg-gray-500"></div>
                    <div className="absolute w-1 h-full bg-gray-500"></div>
                  </div>
                  <p className="text-gray-500 mt-2 font-semibold">
                    Tambah Foto
                  </p>
                </div>
                <p className="text-[12px] font-semibold mt-2 text-center text-gray-700">
                  {label}
                </p>
              </div>
            ))}
        </div>
      </div>

      <Footer />

      <AddPhotoDialog
        isOpen={isAddPhotoDialogOpen}
        inspectionId={inspectionId}
        category="General Wajib"
        onClose={() => {
          setIsAddPhotoDialogOpen(false);
          setSelectedMissingLabel("");
        }}
        onSave={(file, needsAttention, _description) => {
          onClick?.({
            type: "add_new_photo",
            file,
            needAttention: needsAttention,
            label: selectedMissingLabel, // Use the pre-selected label
            category: "General Wajib",
          });
          setIsAddPhotoDialogOpen(false);
          setSelectedMissingLabel("");
        }}
      />
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
  { namaPart: "Temperatur AC Mobil", beban: 2, part: "temperatureAC" },
  { namaPart: "OBD Scanner", beban: 3, part: "obdScanner" },
];
