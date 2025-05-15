"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

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
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatted;
  };

  const dataKendaraan = [
    {
      label: "Merk Kendaraan",
      value: data.vehicleData.merekKendaraan,
    },
    {
      label: "Tipe Kendaraan",
      value: data.vehicleData.tipeKendaraan,
    },
    {
      label: "Tahun",
      value: data.vehicleData.tahun,
    },
    {
      label: "Transmisi",
      value: data.vehicleData.transmisi,
    },
    {
      label: "Warna Kendaraan",
      value: data.vehicleData.warnaKendaraan,
    },
    {
      label: "Odo Meter",
      value: data.vehicleData.odometer,
    },
    {
      label: "Kepemilikan",
      value: data.vehicleData.kepemilikan,
    },
    {
      label: "Pajak 1 Tahun s.d.",
      value: data.vehicleData.pajak1Tahun,
    },
    {
      label: "Pajak 5 Tahun s.d.",
      value: data.vehicleData.pajak5Tahun,
    },
    {
      label: "Biaya Pajak",
      value: data.vehicleData.biayaPajak,
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
      label: "Kaki-Kaki",
      value: data.inspectionSummary.kakiKakiScore,
    },
    {
      label: "Mesin",
      value: data.inspectionSummary.mesinScore,
    },
  ];

  const checkOverall = (value: any) => {
    const result = overallCheck.find((item) => item.value === value);
    return result ? result : { label: "N/A" };
  };

  function getGradeLabel(score: number): string {
    const gradingScale: { [key: number]: string } = {
      0: "E",
      1: "D-",
      2: "D",
      3: "C-",
      4: "C",
      5: "B-",
      6: "B",
      7: "B+",
      8: "A-",
      9: "A",
      10: "A",
    };

    return gradingScale[score] ?? "Skor tidak valid";
  }

  return (
    <div className="px-[30px] ">
      <Header />

      <div className="flex justify-between items-end">
        <p
          onClick={() =>
            editable &&
            onClick({
              label: "Tanggal",
              inputFor: "inspectionDate",
              value: data.inspectionDate,
              section: "root",
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
            onClick={() =>
              editable &&
              onClick({
                label: "Lokasi Inspeksi",
                inputFor: "cabangInspeksi",
                value: data.identityDetails.cabangInspeksi,
                section: "identityDetails",
                type: "dropdown-lokasi",
                onClose: () => {},
              })
            }
            className={`ml-[50px] text-[14px] leading-none text-[16px] font-semibold uppercase ${
              editable
                ? "cursor-pointer hover:underline"
                : "cursor-default text-gray-500"
            }`}
          >
            {data.identityDetails.cabangInspeksi}
          </p>
        </div>
      </div>

      <div className="w-full bg-[#F4622F] mt-[10px] px-[50px] py-1 text-white rounded-lg font-medium text-[16px]">
        <p
          onClick={() =>
            editable &&
            onClick({
              label: "Nama Customer",
              inputFor: "namaCustomer",
              value: data.identityDetails.namaCustomer,
              section: "identityDetails",
              type: "normal-input",
              onClose: () => {},
            })
          }
          className={`${
            editable ? "cursor-pointer hover:underline" : "cursor-default"
          }`}
        >
          Nama Customer : {data.identityDetails.namaCustomer}
        </p>
        <p
          onClick={() =>
            editable &&
            onClick({
              label: "Nama Inspektor",
              inputFor: "namaInspektor",
              value: data.identityDetails.namaInspektor,
              section: "identityDetails",
              type: "dropdown-inspektor",
              onClose: () => {},
            })
          }
          className={`${
            editable ? "cursor-pointer hover:underline" : "cursor-default"
          }`}
        >
          Nama Inspektor : {data.identityDetails.namaInspektor}
        </p>
        <p></p>
      </div>

      <div className="w-full border-2 border-black mt-2 mb-8">
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
                        inputFor: item.label.toLowerCase().replace(/\s/g, ""),
                        value: item.value,
                        type: "normal-input",
                        section: "vehicleData",
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
                        inputFor: item.partName,
                        value: item.value,
                        section: "equipmentChecklist",
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
          <div className="w-1/2 bg-[#B2BEB5] border-r-2 border-black h-48"></div>
          <div className="w-1/2 ">
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Inspection Summary`,
                  inputFor: `inspectionSummary`,
                  value: data.inspectionSummary.deskripsiKeseluruhan,
                  section: "inspectionSummary",
                  type: "penilaian-array",
                  onClose: () => {},
                })
              }
              className="text-[12px] text-left text-black py-2 px-2 font-bold"
            >
              Deskripsi:
              <br />
              <ol className="ml-2 list-disc list-inside text-[12px] font-semibold">
                {data.inspectionSummary.deskripsiKeseluruhan.map(
                  (item: any, index: number) => (
                    <li key={index} className="text-[12px] font-semibold">
                      {item}
                    </li>
                  )
                )}
              </ol>
            </div>
          </div>
        </div>

        <div className="w-full flex border-t-2 border-black">
          <div className="w-1/2  border-r-2 border-black">
            <div className="flex justify-center items-center gap-4">
              {check.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="text-[12px] mb-1">{item}</p>
                  <div className="w-12 h-12 bg-[#B2BEB5] rounded-full  flex items-center justify-center">
                    <p
                      onClick={() =>
                        editable &&
                        onClick({
                          label: `${item}`,
                          inputFor: `${item.toLowerCase()}Score`,
                          value: summaryScore[index]?.value,
                          section: "inspectionSummary",
                          type: "penilaian-summary",
                          onClose: () => {},
                        })
                      }
                      className={`text-[32px] font-bold text-center text-black leading-none ${
                        editable ? "cursor-pointer hover:underline" : ""
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
              <div className="w-24 h-24 bg-[#B2BEB5] rounded-full flex items-center justify-center">
                <p
                  onClick={() =>
                    editable &&
                    onClick({
                      label: `Penilaian Keseluruhan`,
                      inputFor: `overallRating`,
                      value: data?.overallRating,
                      section: "root",
                      type: "penilaian-summary",
                      onClose: () => {},
                    })
                  }
                  className={`-mt-2 text-[64px] font-bold text-center text-black leading-none ${
                    editable ? "cursor-pointer hover:underline" : ""
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
                <div className="flex gap-5  items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Bekas Tabrakan`,
                        inputFor: `indikasiTabrakan`,
                        value: data.inspectionSummary.indikasiTabrakan,
                        section: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/bekastabrak.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">BEKAS TABRAKAN</p>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Bekas Tabrakan`,
                        inputFor: `indikasiTabrakan`,
                        value: data.inspectionSummary.indikasiTabrakan,
                        section: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/tidakindikasi.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">TIDAK INDIKASI BEKAS TABRAKAN</p>
                </div>
              )}

              {data.inspectionSummary.indikasiBanjir ? (
                <div className="flex gap-5  items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Bekas Banjir`,
                        inputFor: `indikasiBanjir`,
                        value: data.inspectionSummary.indikasiBanjir,
                        section: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/bekasbanjir.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">BEKAS BANJIR</p>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Bekas Banjir`,
                        inputFor: `indikasiBanjir`,
                        value: data.inspectionSummary.indikasiBanjir,
                        section: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/tidakindikasi.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">TIDAK BEKAS BANJIR</p>
                </div>
              )}
              {data.inspectionSummary.indikasiOdometerReset ? (
                <div className="flex gap-5  items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Odometer Reset`,
                        inputFor: `indikasiOdometerReset`,
                        value: data.inspectionSummary.indikasiOdometerReset,
                        section: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/odometerreset.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">INDIKASI ODOMETER RESET</p>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <img
                    onClick={() =>
                      editable &&
                      onClick({
                        label: `Indikasi Odometer Reset`,
                        inputFor: `indikasiOdometerReset`,
                        value: data.inspectionSummary.indikasiOdometerReset,
                        section: "inspectionSummary",
                        type: "select-2-input-indikasi",
                        onClose: () => {},
                      })
                    }
                    src="/assets/icon/tidakindikasi.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">TIDAK INDIKASI ODOMETER RESET</p>
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
