import React, { useRef, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import PenilaianContoh from "./PenilaianContoh";

interface Halaman2Props {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void; // Prop onClick yang diteruskan
}

const Halaman2: React.FC<Halaman2Props> = ({
  data,
  editable,
  onClick = () => {},
}) => {
  const mesinNotesRef = useRef<HTMLDivElement>(null);
  const kakiKakiNotesRef = useRef<HTMLDivElement>(null);
  const interiorNotesRef = useRef<HTMLDivElement>(null);
  const eksteriorNotesRef = useRef<HTMLDivElement>(null);

  const [mesinNotesFontSizeClass, setMesinNotesFontSizeClass] =
    useState("text-[13px]");
  const [kakiKakiNotesFontSizeClass, setKakiKakiNotesFontSizeClass] =
    useState("text-[13px]");
  const [interiorNotesFontSizeClass, setInteriorNotesFontSizeClass] =
    useState("text-[13px]");
  const [eksteriorNotesFontSizeClass, setEksteriorNotesFontSizeClass] =
    useState("text-[13px]");

  useEffect(() => {
    const checkFontSize = (
      ref: React.RefObject<HTMLDivElement | null>,
      setFontSizeClass: React.Dispatch<React.SetStateAction<string>>
    ) => {
      if (ref.current) {
        const scrollHeight = ref.current.scrollHeight;
        if (scrollHeight > 220) {
          setFontSizeClass("text-[10px]");
        } else if (scrollHeight > 200) {
          setFontSizeClass("text-[11px]");
        } else if (scrollHeight > 180) {
          setFontSizeClass("text-[12px]");
        } else {
          setFontSizeClass("text-[13px]");
        }
      }
    };

    checkFontSize(mesinNotesRef, setMesinNotesFontSizeClass);
    checkFontSize(kakiKakiNotesRef, setKakiKakiNotesFontSizeClass);
    checkFontSize(interiorNotesRef, setInteriorNotesFontSizeClass);
    checkFontSize(eksteriorNotesRef, setEksteriorNotesFontSizeClass);
  }, [data]);

  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  const formatPrice = (price: string) => {
    if (!price) return "-";
    const formattedPrice = parseFloat(price).toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return formattedPrice;
  };

  const capitalizeFirstLetterOfSentences = (text: string) => {
    const cleanedText = text.replace(/^•\s*/, "");
    if (!cleanedText) return "";
    return cleanedText.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  return (
    <div className="px-[30px] font-poppins">
      <Header />

      <div className="w-full border-2 border-black mt-12 mb-8">
        <div className="w-full flex">
          <div className="w-full bg-[#F4622F]">
            <p className="text-left text-white py-2 px-3 font-semibold border-b-2  border-black">
              Ringkasan Pengecekan
            </p>
          </div>
        </div>

        <div className="w-full flex border-b-2  border-black">
          <div className="w-1/4 ">
            <p className="text-center text-[13px] text-black py-2 px-3 font-semibold border-r-2  border-black">
              Mesin
            </p>
          </div>
          <div className="w-1/4 ">
            <p className="text-center text-[13px] text-black py-2 px-3 font-semibold border-r-2  border-black">
              Kaki-kaki
            </p>
          </div>
          <div className="w-1/4 ">
            <p className="text-center text-[13px] text-black py-2 px-3 font-semibold border-r-2  border-black">
              Interior
            </p>
          </div>
          <div className="w-1/4 ">
            <p className="text-center text-[13px] text-black py-2 px-3 font-semibold  ">
              Eksterior
            </p>
          </div>
        </div>

        <div className="w-full flex border-b-2 border-black">
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Inspection Summary`,
                fieldName: `inspectionSummary`,
                oldValue: data.inspectionSummary.mesinNotes,
                subFieldName: "mesinNotes",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`w-1/4 mn-h-[180px] border-black border-r-2 ${
              editable
                ? "cursor-pointer hover:bg-[#F4622F] hover:text-white"
                : ""
            }`}
          >
            <div
              ref={mesinNotesRef}
              className={`text-left text-black py-2 px-3 font-medium ${mesinNotesFontSizeClass}`}
            >
              <ol className="list-disc list-inside">
                {data.inspectionSummary.mesinNotes.map(
                  (note: string, index: number) => (
                    <li key={index} className="font-semibold">
                      {capitalizeFirstLetterOfSentences(note)}
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Inspection Summary`,
                fieldName: `inspectionSummary`,
                oldValue: data.inspectionSummary.kakiKakiNotes,
                subFieldName: "kakiKakiNotes",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`w-1/4 min-h-[180px] border-black border-r-2 ${
              editable
                ? "cursor-pointer hover:bg-[#F4622F] hover:text-white"
                : ""
            }`}
          >
            <div
              ref={kakiKakiNotesRef}
              className={`text-left text-black py-2 px-3 font-medium ${kakiKakiNotesFontSizeClass}`}
            >
              <ol className="list-disc list-inside">
                {data.inspectionSummary.kakiKakiNotes.map(
                  (note: string, index: number) => (
                    <li key={index} className="font-semibold">
                      {capitalizeFirstLetterOfSentences(note)}
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Inspection Summary`,
                fieldName: `inspectionSummary`,
                oldValue: data.inspectionSummary.interiorNotes,
                subFieldName: "interiorNotes",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`w-1/4 min-h-[180px] border-black border-r-2 ${
              editable
                ? "cursor-pointer hover:bg-[#F4622F] hover:text-white"
                : ""
            }`}
          >
            <div
              ref={interiorNotesRef}
              className={`text-left text-black py-2 px-3 font-medium ${interiorNotesFontSizeClass}`}
            >
              <ol className="list-disc list-inside">
                {data.inspectionSummary.interiorNotes.map(
                  (note: string, index: number) => (
                    <li key={index} className="font-semibold">
                      {capitalizeFirstLetterOfSentences(note)}
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Inspection Summary`,
                fieldName: `inspectionSummary`,
                oldValue: data.inspectionSummary.eksteriorNotes,
                subFieldName: "eksteriorNotes",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`w-1/4 min-h-[180px] ${
              editable
                ? "cursor-pointer hover:bg-[#F4622F] hover:text-white"
                : ""
            }`}
          >
            <div
              ref={eksteriorNotesRef}
              className={`text-left text-black py-2 px-3 font-medium ${eksteriorNotesFontSizeClass}`}
            >
              {data.inspectionSummary.eksteriorNotes ? (
                <ol className="list-disc list-inside">
                  {data.inspectionSummary.eksteriorNotes.map(
                    (note: string, index: number) => (
                      <li key={index} className="font-semibold">
                        {capitalizeFirstLetterOfSentences(note)}
                      </li>
                    )
                  )}
                </ol>
              ) : (
                <p className="text-gray-500">-</p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-full bg-[#F4622F]">
            <p className="text-left text-white py-2 px-3 font-semibold border-b-2  border-black">
              Estimasi Perbaikan
            </p>
          </div>
        </div>

        <div className="w-full flex ">
          <div className="w-[45%] ">
            <p className="text-center text-[13px] text-black py-2 px-3 font-semibold border-r-2  border-b-2 border-black">
              Part
            </p>
          </div>
          <div className="w-[35%] ">
            <p className="text-center text-[13px] text-black py-2 px-3 font-semibold border-r-2 border-b-2 border-black">
              Harga
            </p>
          </div>

          <div className="w-[20%] ">
            <p className="text-center text-[13px] text-black py-2 px-3 font-medium "></p>
          </div>
        </div>

        <div
          className={`w-full flex border-b-2 border-black
          ${editable ? "cursor-pointer group" : ""}`}
          onClick={() =>
            editable &&
            onClick({
              label: `Estimasi Perbaikan`,
              fieldName: `inspectionSummary`,
              oldValue: data.inspectionSummary.estimasiPerbaikan,
              subFieldName: "estimasiPerbaikan",
              type: "estimasi-perbaikan",
              onClose: () => {},
            })
          }
        >
          <div
            className={`w-[45%] min-h-[200px] border-black border-r-2 
            ${editable ? "group-hover:bg-[#F4622F]" : ""}
            `}
          >
            <div
              className={`text-left text-[13px] py-2 px-3 font-medium list-none ${
                editable ? "group-hover:text-white" : ""
              }`}
            >
              <ul className="list-none">
                {data.inspectionSummary.estimasiPerbaikan.map(
                  (item: any, index: any) => (
                    <li key={index} className="text-black font-semibold">
                      {capitalizeFirstLetterOfSentences(item.namaPart)}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div
            className={`w-[35%] min-h-[200px] border-black border-r-2 ${
              editable ? "group-hover:bg-[#F4622F]" : ""
            }`}
          >
            <div
              className={`text-left text-[13px] py-2 px-3 font-medium list-none ${
                editable ? "group-hover:text-white" : ""
              }`}
            >
              <ul className="list-none">
                {data.inspectionSummary.estimasiPerbaikan.map(
                  (item: any, index: any) => (
                    <li key={index} className="text-black font-semibold">
                      {formatPrice(item.harga)}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="w-[20%] h-50 flex justify-center items-center">
            <p className="text-center font-semibold text-[10px] text-black px-3 font-light -mt-10">
              *Biaya estimasi dapat lebih murah atau mahal tergantung bengkel
            </p>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-full bg-[#F4622F]">
            <p className="text-left text-white py-2 px-3 font-semibold border-b-2  border-black">
              Keterangan
            </p>
          </div>
        </div>

        <div className="text-black w-full flex border-b-2 border-black py-8 items-center justify-between px-2">
          <PenilaianContoh warna="#FFFFFF" nilai="" namaPart="" beban="" />

          <div className="mx-2 text-[14px] font-bold">
            <p className="underline">Beban Part</p>
            <div className="flex gap-1 items-center">
              <div className="text-[12px] w-4 h-4 rounded-full bg-[#A1AEB1] aspect-square flex justify-center items-center ">
                1
              </div>
              <p>Penting</p>
            </div>

            <div className="flex gap-1 items-center">
              <div className="text-[12px] w-4 h-4 rounded-full bg-[#A1AEB1] aspect-square flex justify-center items-center ">
                2
              </div>
              <p>Sangat Penting</p>
            </div>

            <div className="flex gap-1 items-center">
              <div className="text-[12px] w-4 h-4 rounded-full bg-[#A1AEB1] aspect-square flex justify-center items-center ">
                3
              </div>
              <p>Krusial/Vital</p>
            </div>
          </div>

          <div className="flex flex-col justify-start text-[14px] font-bold">
            <p className="underline">Nilai</p>
            <div className="border-2 border-black w-fit">
              {/* Baris Nilai */}
              <div className="flex gap-1 py-1 px-1">
                {[
                  { val: 0, color: "#040102", textColor: "#ffffff" },
                  { val: 1, color: "#E41C17", textColor: "#040102" },
                  { val: 2, color: "#E41C17", textColor: "#040102" },
                  { val: 3, color: "#E41C17", textColor: "#040102" },
                  { val: 4, color: "#E7DC39", textColor: "#040102" },
                  { val: 5, color: "#E7DC39", textColor: "#040102" },
                  { val: 6, color: "#E7DC39", textColor: "#040102" },
                  { val: 7, color: "#1B8A48", textColor: "#040102" },
                  { val: 8, color: "#1B8A48", textColor: "#040102" },
                  { val: 9, color: "#1B8A48", textColor: "#040102" },
                  { val: 10, color: "#1B8A48", textColor: "#040102" },
                ].map(({ val, color, textColor }) => (
                  <div
                    key={val}
                    className="w-5 h-5 flex items-center justify-center"
                    style={{ backgroundColor: color, color: textColor }}
                  >
                    {val}
                  </div>
                ))}
              </div>

              {/* Baris Huruf */}
              <div className="flex border-t-2 border-black">
                {[
                  "E",
                  "D-",
                  "D",
                  "C-",
                  "C",
                  "B-",
                  "B",
                  "B+",
                  "A-",
                  "A-",
                  "A",
                ].map((grade, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 flex items-center justify-center "
                  >
                    {grade}
                  </div>
                ))}
              </div>

              {/* Baris Keterangan */}
              <div className="flex border-t-2 border-black">
                <div className="w-[35%] flex items-center justify-center  text-center text-[10px] px-1 py-1">
                  0: Part tidak ada
                </div>
                <div className="w-[65%] flex items-center justify-center  text-center text-[10px] px-1 py-1">
                  10: Kondisi baru
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-1/5 bg-[#F4622F] border-r-2 border-black flex items-center">
            <p className="text-left text-white py-2 px-3 font-semibold ">
              Data Ban
            </p>
          </div>
          <div
            className={`w-1/5 border-r-2  border-black
          ${editable ? "cursor-pointer hover:bg-[#F4622F] group " : ""}
            `}
          >
            <p className="text-[12px] text-center text-black group-hover:text-white py-1 px-3 font-semibold border-b-2 border-black">
              Posisi Ban
            </p>
            <p
              onClick={() =>
                editable &&
                onClick({
                  label: `Posisi Ban`,
                  fieldName: `inspectionSummary`,
                  oldValue: data.inspectionSummary.posisiBan,
                  subFieldName: "posisiBan",
                  type: "normal-input",
                  onClose: () => {},
                })
              }
              className="text-center text-[12px] h-10 text-left text-black group-hover:text-white  font-semibold flex items-center justify-center"
            >
              {data.inspectionSummary.posisiBan}
            </p>
          </div>
          <div
            className={`w-1/5 border-r-2  border-black
          ${editable ? "cursor-pointer hover:bg-[#F4622F] group " : ""}
            `}
          >
            <p className="text-[12px] text-center text-black group-hover:text-white py-1 px-3 font-semibold border-b-2 border-black">
              Merk
            </p>
            <p
              onClick={() =>
                editable &&
                onClick({
                  label: `Merk Ban`,
                  fieldName: `inspectionSummary`,
                  oldValue: data.inspectionSummary.merkban,
                  subFieldName: "merkban",
                  type: "normal-input",
                  onClose: () => {},
                })
              }
              className="text-center text-[12px] h-10 text-left text-black  group-hover:text-white font-semibold flex items-center justify-center"
            >
              {data.inspectionSummary.merkban}
            </p>
          </div>
          <div
            className={`w-1/5 border-r-2  border-black
          ${editable ? "cursor-pointer hover:bg-[#F4622F] group " : ""}
            `}
          >
            <p className="text-[12px] text-center text-black group-hover:text-white py-1 px-3 font-semibold border-b-2 border-black">
              Tipe velg
            </p>
            <p
              onClick={() =>
                editable &&
                onClick({
                  label: `Tipe Velg`,
                  fieldName: `inspectionSummary`,
                  oldValue: data.inspectionSummary.tipeVelg,
                  subFieldName: "tipeVelg",
                  type: "normal-input",
                  onClose: () => {},
                })
              }
              className="text-center text-[12px] h-10 text-left text-black group-hover:text-white font-semibold flex items-center justify-center"
            >
              {data.inspectionSummary.tipeVelg}
            </p>
          </div>

          <div
            className={`w-1/5
          ${editable ? "cursor-pointer hover:bg-[#F4622F] group " : ""}
            `}
          >
            <p className="text-[12px] text-center text-black group-hover:text-white py-1 px-3 font-semibold border-b-2 border-black">
              Ketebalan
            </p>
            <p
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Ban`,
                  fieldName: `inspectionSummary`,
                  oldValue: data.inspectionSummary.ketebalanBan,
                  subFieldName: "ketebalanBan",
                  type: "normal-input",
                  onClose: () => {},
                })
              }
              className="text-center text-[12px] h-10 text-left text-black group-hover:text-white font-semibold flex items-center justify-center"
            >
              {data.inspectionSummary.ketebalanBan}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Halaman2;
