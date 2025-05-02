import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Halaman1({ data }: any) {
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
      value: data.equipmentChecklist.bukuService ? "OK" : "",
    },
    {
      label: "Kunci Serep",
      value: data.equipmentChecklist.kunciSerep ? "OK" : "",
    },
    {
      label: "Buku Manual",
      value: data.equipmentChecklist.bukuManual ? "OK" : "",
    },
    {
      label: "Ban",
      value: data.equipmentChecklist.ban ? "OK" : "",
    },
    {
      label: "Serep",
      value: data.equipmentChecklist.serep ? "OK" : "",
    },
    {
      label: "BPKB",
      value: data.equipmentChecklist.bpkb ? "OK" : "",
    },
    {
      label: "Dongkrak",
      value: data.equipmentChecklist.dongkrak ? "OK" : "",
    },
    {
      label: "Toolkit",
      value: data.equipmentChecklist.toolkit ? "OK" : "",
    },
    {
      label: "No Rangka",
      value: data.equipmentChecklist.noRangka ? "OK" : "",
    },
    {
      label: "No Mesin",
      value: data.equipmentChecklist.noMesin ? "OK" : "",
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
        <p className="ml-[50px] text-[14px] font-semibold  leading-none">
          Tanggal : {formatDate(data.inspectionDate)}
        </p>
        <div className="flex flex-col items-end ">
          <h1 className="text-[16px] font-semibold text-[#F4622F] leading-none">
            VEHICLE INSPECTION
          </h1>
          <p className="text-[16px] font-semibold uppercase">
            {data.identityDetails.cabangInspeksi}
          </p>
        </div>
      </div>

      <div className="w-full bg-[#F4622F] mt-[10px] px-[50px] py-1 text-white rounded-lg font-medium text-[16px]">
        <p>Nama Customer : {data.identityDetails.namaCustomer}</p>
        <p>Nama Inspektor : {data.identityDetails.namaInspektor}</p>
        <p></p>
      </div>

      <div className="w-full border-2 border-black mt-2">
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
              {Array.from({ length: 10 }, (_, index) => (
                <div key={index} className="">
                  <p className="text-[14px]  text-black font-semibold">
                    : {dataKendaraan[index]?.value}
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
              {Array.from({ length: kelengkapan.length }, (_, index) => (
                <div key={index} className="">
                  <p className="text-[14px]  text-black font-semibold">
                    : {kelengkapan[index]?.value}
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
            <div className="text-[12px] text-left text-black py-2 px-2 font-bold">
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
                    <p className="text-[32px] font-bold text-center text-black leading-none">
                      {getGradeLabel(summaryScore[index]?.value)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center mt-2">
              <p className="text-[12px] mb-2">Penilaian Keseluruhan</p>
              <div className="w-24 h-24 bg-[#B2BEB5] rounded-full flex items-center justify-center">
                <p className="-mt-2 text-[72px] font-bold text-center text-black leading-none">
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
                <div className="flex gap-5">
                  <img
                    src="/assets/icon/bekastabrak.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">BEKAS TABRAKAN</p>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <img
                    src="/assets/icon/tidakindikasi.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">TIDAK INDIKASI BEKAS TABRAKAN</p>
                </div>
              )}

              {data.inspectionSummary.indikasiTabrakan ? (
                <div className="flex gap-5">
                  <img
                    src="/assets/icon/bekastabrak.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">BEKAS BANJIR</p>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <img
                    src="/assets/icon/tidakindikasi.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">TIDAK BEKAS BANJIR</p>
                </div>
              )}
              {data.inspectionSummary.indikasiTabrakan ? (
                <div className="flex gap-5">
                  <img
                    src="/assets/icon/bekastabrak.svg"
                    alt="ok"
                    className="w-16 h-16"
                  />
                  <p className="">INDIKASI ODOMETER RESET</p>
                </div>
              ) : (
                <div className="flex gap-5 items-center">
                  <img
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
}

export default Halaman1;
