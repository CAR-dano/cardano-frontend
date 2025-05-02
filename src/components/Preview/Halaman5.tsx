import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PenilaianHasil from "./PenilaianHasil";

function Halaman5({ data }: any) {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  return (
    <div className="px-[30px] ">
      <Header />
      <div className="w-full border-2 border-black mt-4">
        <div className="w-full flex">
          <div className="w-full bg-[#F4622F]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2  border-black">
              Hasil Inspeksi
            </p>
          </div>
        </div>

        <div className="w-full border-b-2 border-black py-2">
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {eksteriorKendaraan.map((item, index) => (
              <PenilaianHasil
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                beban={item.beban.toString()}
                nilai={
                  data.hasilInspeksiEksterior[item.part] != undefined
                    ? data.hasilInspeksiEksterior[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>

          <p className="text-[12px] px-2 mt-1 font-semibold">*Catatan:</p>
          <p className="text-[12px] px-1 py-3 mt-1 font-semibold">
            {data.hasilInspeksiEksterior.catatan}
          </p>
        </div>

        <div className="w-full border-b-2 border-black py-2">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              4
            </p>
            <p className="">Ban dan Kaki-Kaki</p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {banDanKakiKaki.map((item, index) => (
              <PenilaianHasil
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                beban={item.beban.toString()}
                nilai={
                  data.banDanKakiKaki[item.part] != undefined
                    ? data.banDanKakiKaki[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>

          <p className="text-[12px] px-2  mt-1 font-semibold">*Catatan:</p>
          <p className="text-[12px] px-1 py-3 mt-1 font-semibold">
            {data.banDanKakiKaki.catatan}
          </p>
        </div>

        <div className="w-full  py-2 mb-2 border-b-2 border-black">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              5
            </p>
            <p className="">Test Drive</p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {testDrive.map((item, index) => (
              <PenilaianHasil
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                beban={item.beban.toString()}
                nilai={
                  data.testDrive[item.part] != undefined
                    ? data.testDrive[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>

          <p className="text-[12px] px-2  mt-1 font-semibold">*Catatan:</p>
          <p className="text-[12px] px-1 py-2 mt-1 font-semibold">
            {data.testDrive.catatan}
          </p>
        </div>

        <div className="w-full  py-2 mb-2">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              5
            </p>
            <p className="">Tools Test</p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {toolsTest.map((item, index) => (
              <PenilaianHasil
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
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
          <p className="text-[12px] px-1 py-2 mt-1 font-semibold">
            {data.toolsTest.catatan}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Halaman5;

const eksteriorKendaraan = [
  { namaPart: "Fender kiri", beban: 1, part: "fenderKiri" },
  { namaPart: "Pintu Belakang Kiri", beban: 1, part: "pintuBelakangKiri" },
  { namaPart: "Lisplang Kiri", beban: 1, part: "lisplangKiri" },
  { namaPart: "Quarter Panel Kiri", beban: 1, part: "quarterPanelKiri" },
  { namaPart: "Spion Kiri", beban: 2, part: "spionKiri" },
  { namaPart: "Side Skirt Kiri", beban: 1, part: "sideSkirtKiri" },
];

const banDanKakiKaki = [
  { namaPart: "Ban Depan", beban: 2, part: "banDepan" },
  { namaPart: "Ban Belakang", beban: 2, part: "banBelakang" },
  { namaPart: "Racksteer", beban: 3, part: "racksteer" },
  { namaPart: "Velg Depan", beban: 2, part: "velgDepan" },
  { namaPart: "Velg Belakang", beban: 2, part: "velgBelakang" },
  { namaPart: "Karet Boot", beban: 2, part: "karetBoot" },
  { namaPart: "Disc Brake", beban: 3, part: "discBrake" },
  { namaPart: "Brake Pad", beban: 3, part: "brakePad" },
  { namaPart: "Upper-Lower Arm", beban: 3, part: "upperLowerArm" },
  { namaPart: "Master Rem", beban: 3, part: "masterRem" },
  { namaPart: "Crossmember", beban: 2, part: "crossmember" },
  { namaPart: "Shock Breaker", beban: 3, part: "shockBreaker" },
  { namaPart: "Tie Rod", beban: 3, part: "tieRod" },
  { namaPart: "Knalpot", beban: 1, part: "knalpot" },
  { namaPart: "Link Stabilizer", beban: 3, part: "linkStabilizer" },
  { namaPart: "Gardan", beban: 3, part: "gardan" },
  { namaPart: "Balljoint", beban: 3, part: "balljoint" },
];

const testDrive = [
  { namaPart: "Bunyi/Getaran", beban: 3, part: "bunyiGetaran" },
  { namaPart: "Stir Balance", beban: 2, part: "stirBalance" },
  { namaPart: "Performa Kopling", beban: 3, part: "performaKopling" },
  { namaPart: "Performa Stir", beban: 2, part: "performaStir" },
  { namaPart: "Performa Suspensi", beban: 3, part: "performaSuspensi" },
  { namaPart: "RPM", beban: 3, part: "rpm" },
  { namaPart: "Perpindahan Transmisi", beban: 3, part: "perpindahanTransmisi" },
];

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
  { namaPart: "Test ACCU ( ON & OFF )", beban: 3, part: "testAccu" },
  { namaPart: "Temperatur AC Mobil", beban: 2, part: "temperaturACMobil" },
  { namaPart: "OBD Scanner", beban: 3, part: "obdScanner" },
];
