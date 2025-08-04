"use client";
import React, { useRef, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Image from "next/image";

interface Halaman1Props {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void; // Prop onClick yang diteruskan
}

const Halaman1: React.FC<Halaman1Props> = ({
  data,
  editable,
  onClick = () => {},
}) => {
  const deskripsiRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(12);

  useEffect(() => {
    // Tambahkan pengecekan yang lebih lengkap
    if (deskripsiRef.current && data?.inspectionSummary?.deskripsiKeseluruhan) {
      const maxHeight = 192; // h-48 dalam pixel (48 * 4 = 192px)
      let currentFontSize = 12;

      // Reset font size
      deskripsiRef.current.style.fontSize = `${currentFontSize}px`;

      // Kurangi font size jika tinggi melebihi maxHeight
      while (
        deskripsiRef.current.scrollHeight > maxHeight &&
        currentFontSize > 8
      ) {
        currentFontSize -= 0.5;
        deskripsiRef.current.style.fontSize = `${currentFontSize}px`;
      }

      setFontSize(currentFontSize);
    }
  }, [data?.inspectionSummary?.deskripsiKeseluruhan]);

  // Pengecekan yang lebih komprehensif
  if (
    !data ||
    !data.inspectionSummary ||
    !data.vehicleData ||
    !data.identityDetails
  ) {
    return <div>Loading...</div>;
  }

  const PHOTO_URL = process.env.NEXT_PUBLIC_PDF_URL;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("id-ID", {
      timeZone: "UTC", // penting!
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatted;
  };

  const formatCurrency = (value: number | string) => {
    // Convert string to number if needed
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    if (numValue === undefined || numValue === null || isNaN(numValue)) {
      return "Rp 0";
    }

    return numValue.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  const capitalizeFirstLetterOfSentences = (text: string) => {
    const cleanedText = text.replace(/^•\s*/, "");
    if (!cleanedText) return "";
    return cleanedText.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
  };

  const capitalizeFirstLetter = (text: string | number) => {
    if (typeof text === "number") return text.toString();
    if (!text) return "";
    const str = text.toString();
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const dataKendaraan = [
    {
      label: "Merk Kendaraan",
      subFieldName: "merekKendaraan",
      value: capitalizeFirstLetter(data.vehicleData.merekKendaraan),
    },
    {
      label: "Tipe Kendaraan",
      subFieldName: "tipeKendaraan",
      value: capitalizeFirstLetter(data.vehicleData.tipeKendaraan),
    },
    {
      label: "Tahun",
      subFieldName: "tahun",
      value: data.vehicleData.tahun,
    },
    {
      label: "Transmisi",
      subFieldName: "transmisi",
      value: capitalizeFirstLetter(data.vehicleData.transmisi),
    },
    {
      label: "Warna Kendaraan",
      subFieldName: "warnaKendaraan",
      value: capitalizeFirstLetter(data.vehicleData.warnaKendaraan),
    },
    {
      label: "Odo Meter",
      subFieldName: "odometer",
      value: data.vehicleData.odometer,
    },
    {
      label: "Kepemilikan",
      subFieldName: "kepemilikan",
      value: data.vehicleData.kepemilikan,
    },
    {
      label: "Plat Nomor",
      subFieldName: "vehiclePlateNumber",
      value: data.vehiclePlateNumber,
    },
    {
      label: "Pajak 1 Tahun s.d.",
      subFieldName: "pajak1Tahun",
      value: formatDate(data.vehicleData.pajak1Tahun),
    },
    {
      label: "Pajak 5 Tahun s.d.",
      subFieldName: "pajak5Tahun",
      value: formatDate(data.vehicleData.pajak5Tahun),
    },
    {
      label: "Biaya Pajak",
      subFieldName: "biayaPajak",
      value: formatCurrency(data.vehicleData.biayaPajak),
    },
  ];

  const kelengkapan = [
    {
      label: "Buku Service",
      partName: "bukuService",
      value: data.equipmentChecklist.bukuService,
    },
    {
      label: "Kunci Serep",
      partName: "kunciSerep",
      value: data.equipmentChecklist.kunciSerep,
    },
    {
      label: "Buku Manual",
      partName: "bukuManual",
      value: data.equipmentChecklist.bukuManual,
    },
    {
      label: "Ban Serep",
      partName: "banSerep",
      value: data.equipmentChecklist.banSerep,
    },
    {
      label: "BPKB",
      partName: "bpkb",
      value: data.equipmentChecklist.bpkb,
    },
    {
      label: "Dongkrak",
      partName: "dongkrak",
      value: data.equipmentChecklist.dongkrak,
    },
    {
      label: "Toolkit",
      partName: "toolkit",
      value: data.equipmentChecklist.toolkit,
    },
    {
      label: "No Rangka",
      partName: "noRangka",
      value: data.equipmentChecklist.noRangka,
    },
    {
      label: "No Mesin",
      partName: "noMesin",
      value: data.equipmentChecklist.noMesin,
    },
  ];

  const check = ["Interior", "Eksterior", "Mesin", "Kaki-Kaki"];

  const overallCheck = [
    {
      value: "Excellent",
      label: "A",
    },
    {
      value: "Good",
      label: "B",
    },
    {
      value: "Fair",
      label: "C",
    },
    {
      value: "Poor",
      label: "D",
    },
  ];

  const summaryScore = [
    {
      label: "Interior",
      value: data.inspectionSummary.interiorScore,
    },
    {
      label: "Eksterior",
      value: data.inspectionSummary.eksteriorScore,
    },
    {
      label: "Mesin",
      value: data.inspectionSummary.mesinScore,
    },
    {
      label: "Kaki-Kaki",
      value: data.inspectionSummary.kakiKakiScore,
    },
  ];

  const checkOverall = (value: any) => {
    const result = overallCheck.find((item) => item.value === value);
    return result ? result : { label: "N/A" };
  };

  function getGradeLabel(score: number): string {
    const gradingScale: { [key: number]: string } = {
      0: "-",
      1: "E",
      2: "D-",
      3: "D",
      4: "C-",
      5: "C",
      6: "B-",
      7: "B",
      8: "B+",
      9: "A-",
      10: "A",
    };

    return gradingScale[score] ?? "Skor tidak valid";
  }

  return (
    <div className="px-[30px] font-poppins">
      <Header />

      <div className="text-black flex justify-between items-end">
        <p
          onClick={() =>
            editable &&
            onClick({
              label: "Tanggal",
              fieldName: "inspectionDate",
              oldValue: data.inspectionDate,
              subFieldName: "",
              type: "date-input",
              onClose: () => {},
            })
          }
          className={`ml-[50px] text-[14px] font-semibold leading-none ${
            editable
              ? "cursor-pointer hover:underline"
              : "cursor-default text-black"
          }`}
        >
          Tanggal : {formatDate(data.inspectionDate)}
        </p>

        <div className="flex flex-col items-end ">
          <h1 className="text-[16px] font-semibold text-[#F4622F] leading-none">
            VEHICLE INSPECTION
          </h1>
          <p
            // onClick={() =>
            //   editable &&
            //   onClick({
            //     label: "Lokasi Inspeksi",
            //     fieldName: "identityDetails",
            //     oldValue: data.identityDetails.cabangInspeksi,
            //     subFieldName: "cabangInspeksi",
            //     type: "dropdown-lokasi",
            //     onClose: () => {},
            //   })
            // }
            // className={`ml-[50px] text-black text-[14px] leading-none text-[16px] font-semibold uppercase ${
            //   editable ? "cursor-pointer hover:underline" : "cursor-default "
            // }`}
            className="ml-[50px] text-black text-[14px] leading-none text-[16px] font-semibold uppercase cursor-default"
          >
            {data.identityDetails.cabangInspeksi}
          </p>
        </div>
      </div>

      <div className="w-full bg-[#F4622F] mt-[10px] px-[50px] py-1 text-white rounded-lg font-medium text-[16px]">
        <p
          // onClick={() =>
          //   editable &&
          //   onClick({
          //     label: "Nama Customer",
          //     fieldName: "identityDetails",
          //     oldValue: data.identityDetails.namaCustomer,
          //     subFieldName: "namaCustomer",
          //     type: "normal-input",
          //     onClose: () => {},
          //   })
          // }
          // className={`${
          //   editable ? "cursor-pointer hover:underline" : "cursor-default"
          // }`}
          className="cursor-default"
        >
          Nama Customer : {data.identityDetails.namaCustomer}
        </p>
        <p
          // onClick={() =>
          //   editable &&
          //   onClick({
          //     label: "Nama Inspektor",
          //     fieldName: "identityDetails",
          //     oldValue: data.identityDetails.namaInspektor,
          //     subFieldName: "namaInspektor",
          //     type: "dropdown-inspektor",
          //     onClose: () => {},
          //   })
          // }
          // className={`${
          //   editable ? "cursor-pointer hover:underline" : "cursor-default"
          // }`}
          className="cursor-default"
        >
          Nama Inspektor : {data.identityDetails.namaInspektor}
        </p>
        <p></p>
      </div>

      <div className="w-full border-2 border-black mt-2 mb-5">
        <div className="w-full flex">
          <div className="w-1/2 bg-[#F4622F]">
            <p className="text-center text-white py-2 font-semibold border-r-2  border-black">
              Data Kendaraan
            </p>
          </div>
          <div className="w-1/2 bg-[#F4622F]">
            <p className="text-center text-white py-2 font-semibold">
              Kelengkapan Kendaraan
            </p>
          </div>
        </div>
        <div className="w-full flex border-t-2 border-black">
          <div className="w-1/2 flex flex-row gap-0 py-3 border-r-2 border-black">
            <div className="flex flex-col gap-0 px-5">
              {dataKendaraan.map((item, index) => (
                <div key={index} className="">
                  <p className="text-[14px] text-start text-black font-semibold">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div>
              {dataKendaraan.map((item, index) => (
                <div key={index}>
                  <p
                    onClick={() =>
                      editable &&
                      onClick({
                        label: item.label,
                        fieldName:
                          item.subFieldName === "vehiclePlateNumber"
                            ? "vehiclePlateNumber"
                            : "vehicleData",
                        oldValue: item.value,
                        type:
                          item.subFieldName === "pajak1Tahun" ||
                          item.subFieldName === "pajak5Tahun"
                            ? "date-input"
                            : "normal-input",
                        subFieldName:
                          item.subFieldName === "vehiclePlateNumber"
                            ? ""
                            : item.subFieldName,
                        onClose: () => {},
                      })
                    }
                    className={`text-[14px] text-black font-semibold ${
                      editable ? "cursor-pointer hover:underline" : ""
                    }`}
                  >
                    : {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 flex flex-row gap-0 py-3 ">
            <div className="flex flex-col gap-0 px-5">
              {kelengkapan.map((item, index) => (
                <div key={index} className="">
                  <p className="text-[14px] text-start text-black font-semibold">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div>
              {kelengkapan.map((item, index) => (
                <div key={index}>
                  <p
                    onClick={() =>
                      editable &&
                      onClick({
                        label: item.label,
                        fieldName: "equipmentChecklist",
                        oldValue: item.value,
                        subFieldName: item.partName,
                        type: "select-2-input-kelengkapan",
                        onClose: () => {},
                      })
                    }
                    className={`text-[14px] text-black font-semibold ${
                      editable ? "cursor-pointer hover:underline" : ""
                    }`}
                  >
                    : {item.value ? "Ada" : "Tidak Ada"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-full bg-[#F4622F]">
            <p className="text-center text-white py-2 font-semibold border-t-2  border-black">
              Hasil Inspeksi Kendaraan
            </p>
          </div>
        </div>

        <div className="w-full flex border-t-2 border-black">
          <div className="w-1/2 bg-[#B2BEB5] border-r-2 border-black h-48">
            <Image
              src={`${PHOTO_URL}/uploads/inspection-photos/${data.photos}`}
              alt="Tampak Depan"
              width={200}
              height={200}
              className="mx-auto w-[90%] h-full object-cover"
            />
          </div>
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Inspection Summary`,
                fieldName: `inspectionSummary`,
                oldValue: data.inspectionSummary.deskripsiKeseluruhan,
                subFieldName: "deskripsiKeseluruhan",
                type: "penilaian-array",
                onClose: () => {},
              })
            }
            className={`w-1/2 h-48 overflow-hidden ${
              editable ? "cursor-pointer group hover:bg-[#F4622F] " : ""
            }`}
          >
            <div
              ref={deskripsiRef}
              className={`text-left 
                ${editable ? "group-hover:text-white" : ""}
                text-black py-2 px-2 font-bold h-full overflow-hidden`}
              style={{ fontSize: `${fontSize}px` }}
            >
              Deskripsi:
              <br />
              {data.inspectionSummary.deskripsiKeseluruhan.length === 1 ? (
                <p className="text-justify mt-2 font-semibold">
                  {capitalizeFirstLetterOfSentences(
                    data.inspectionSummary.deskripsiKeseluruhan[0]
                  )}
                </p>
              ) : (
                <ol className="ml-2 list-disc list-inside font-semibold">
                  {data.inspectionSummary.deskripsiKeseluruhan.map(
                    (item: any, index: number) => (
                      <li key={index} className="font-semibold">
                        {capitalizeFirstLetterOfSentences(item)}
                      </li>
                    )
                  )}
                </ol>
              )}
            </div>
          </div>
        </div>

        <div className="text-black w-full flex border-t-2 border-black">
          <div className="pt-2 w-1/2  border-r-2 border-black">
            <div className="flex justify-center items-center gap-4">
              {check.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-[12px] mb-1">{item}</p>
                  <div
                    className={`w-12 h-12 bg-[#B2BEB5] rounded-full  flex items-center justify-center
                    ${editable ? "group hover:bg-[#F4622F]" : ""}`}
                  >
                    <p
                      onClick={() =>
                        editable &&
                        onClick({
                          label: `${item}`,
                          subFieldName: `${
                            item === "Kaki-Kaki"
                              ? "kakiKakiScore"
                              : `${item.toLowerCase()}Score`
                          }`,
                          oldValue: summaryScore[index]?.value,
                          fieldName: "inspectionSummary",
                          type: "penilaian-summary",
                          onClose: () => {},
                        })
                      }
                      className={`text-[32px] font-bold text-center text-black leading-none ${
                        editable
                          ? "cursor-pointer hover:underline group-hover:text-white"
                          : ""
                      }`}
                    >
                      {getGradeLabel(summaryScore[index]?.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center mt-2">
              <p className="text-[12px] mb-2">Penilaian Keseluruhan</p>
              <div
                className={`w-24 h-24 bg-[#B2BEB5] rounded-full flex items-center justify-center
                ${editable ? "group hover:bg-[#F4622F]" : ""}
                `}
              >
                <p
                  onClick={() =>
                    editable &&
                    onClick({
                      label: `Penilaian Keseluruhan`,
                      fieldName: `overallRating`,
                      oldValue: data?.overallRating,
                      subFieldName: "",
                      type: "penilaian-summary",
                      onClose: () => {},
                    })
                  }
                  className={`-mt-2 text-[64px] font-bold text-center text-black leading-none ${
                    editable ? "cursor-pointer group-hover:text-white" : ""
                  }`}
                >
                  {getGradeLabel(data?.overallRating)}
                </p>
              </div>
            </div>

            <p className="text-center text-[10px] my-2">
              *A = Sangat Baik, B = Baik, C = Sedang, D = Buruk
            </p>
          </div>
          <div className="w-1/2 flex">
            <div>
              <div className="w-25 h-10"></div>
              <div className="w-25 h-10"></div>
              <div className="w-25 h-10"></div>
            </div>
            <div className="flex flex-col justify-start text-[24px] font-bold text-left my-2 gap-3 mx-5 ">
              {data.inspectionSummary.indikasiTabrakan ? (
                <div
                  className={`flex gap-5 items-center ${
                    editable ? "group" : ""
                  }`}
                >
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Bekas Tabrakan`,
                        subFieldName: `indikasiTabrakan`,
                        oldValue: data.inspectionSummary.indikasiTabrakan,
                        fieldName: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/bekastabrak.png"
                    alt="ok"
                    className={` w-18 h-16
                      ${
                        editable
                          ? "transition group-hover:cursor-pointer hover:-translate-y-1"
                          : ""
                      }
                      `}
                  />
                  <p className="">
                    <span className="text-pink-600">
                      TERINDIKASI <br />
                    </span>
                    BEKAS TABRAKAN
                  </p>
                </div>
              ) : (
                <div
                  className={`flex gap-5 items-center ${
                    editable ? "group" : ""
                  }`}
                >
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Bekas Tabrakan`,
                        fieldName: `inspectionSummary`,
                        oldValue: data.inspectionSummary.indikasiTabrakan,
                        subFieldName: "indikasiTabrakan",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/tidakbekastabrak.png"
                    alt="ok"
                    className={`w-18 h-16
                      ${
                        editable
                          ? "transition group-hover:cursor-pointer hover:-translate-y-1"
                          : ""
                      }
                      `}
                  />
                  <p className="">
                    <span className="text-green-400">
                      TIDAK TERINDIKASI <br />
                    </span>{" "}
                    BEKAS TABRAKAN
                  </p>
                </div>
              )}

              {data.inspectionSummary.indikasiBanjir ? (
                <div className="flex gap-5  items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Bekas Banjir`,
                        subFieldName: `indikasiBanjir`,
                        oldValue: data.inspectionSummary.indikasiBanjir,
                        fieldName: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/bekasbanjir.png"
                    alt="ok"
                    className={` rounded-[20px] w-16 h-16
                      ${
                        editable
                          ? "transition group-hover:cursor-pointer hover:-translate-y-1"
                          : ""
                      }
                      `}
                  />
                  <p className="">
                    <span className="text-pink-600">
                      TERINDIKASI <br />
                    </span>{" "}
                    BEKAS BANJIR
                  </p>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Bekas Banjir`,
                        subFieldName: `indikasiBanjir`,
                        oldValue: data.inspectionSummary.indikasiBanjir,
                        fieldName: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/tidakbekasbanjir.png"
                    alt="ok"
                    className={`w-16 h-16
                      ${
                        editable
                          ? "transition group-hover:cursor-pointer hover:-translate-y-1"
                          : ""
                      }
                      `}
                  />
                  <p className="">
                    <span className="text-green-400">
                      TIDAK TERINDIKASI
                      <br />
                    </span>{" "}
                    BEKAS BANJIR
                  </p>
                </div>
              )}
              {data.inspectionSummary.indikasiOdometerReset ? (
                <div className="flex gap-5  items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Odometer Reset`,
                        subFieldName: `indikasiOdometerReset`,
                        oldValue: data.inspectionSummary.indikasiOdometerReset,
                        fieldName: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/odometerreset.png"
                    alt="ok"
                    className={` w-18 h-16 -ml-1
                      ${
                        editable
                          ? "transition group-hover:cursor-pointer hover:-translate-y-1"
                          : ""
                      }
                      `}
                  />
                  <p className="">
                    <span className="text-pink-600">
                      TERINDIKASI <br />{" "}
                    </span>{" "}
                    ODOMETER RESET
                  </p>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Odometer Reset`,
                        subFieldName: `indikasiOdometerReset`,
                        oldValue: data.inspectionSummary.indikasiOdometerReset,
                        fieldName: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/tidakodometer.png"
                    alt="ok"
                    className={`w-18 h-16 -ml-1
                      ${
                        editable
                          ? "transition group-hover:cursor-pointer hover:-translate-y-1"
                          : ""
                      }
                      `}
                  />
                  <p className="">
                    <span className="text-green-400">
                      TIDAK TERINDIKASI
                      <br />
                    </span>{" "}
                    ODOMETER RESET
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Halaman1;
