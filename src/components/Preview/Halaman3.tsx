import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PenilaianContoh from "./PenilaianContoh";
import PenilaianHasil from "./PenilaianHasil";

function Halaman3({ data }: any) {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  return (
    <div className="px-[30px] ">
      <Header />

      <div className="w-full border-2 border-black mt-8 mb-5">
        <div className="w-full flex">
          <div className="w-full bg-[#1e1240]">
            <p className="text-left text-white py-2 px-3 font-semibold border-b-2  border-black">
              CONTOH PENILAIAN
            </p>
          </div>
        </div>

        <div className="w-full flex py-2 border-b-2 border-black ">
          <div className="w-full flex flex-col gap-2">
            <div className="w-full flex">
              <PenilaianContoh
                warna="#f5e72f"
                nilai="5"
                namaPart="Shock Breaker"
                beban="3"
              />
              <div className="flex flex-col text-[11px] font-medium pr-5">
                <p>Arti Penilaian :</p>
                <p>
                  Shock breaker memiliki{" "}
                  <span className="font-bold">beban 3</span> karena merupakan
                  yang{" "}
                  <span className="font-bold">krusial /vital. Nilai 5</span>{" "}
                  berarti komponen tersebut{" "}
                  <span className="font-bold">PERLU PERHATIAN</span>
                </p>
              </div>
            </div>
            <div className="w-full flex">
              <PenilaianContoh
                warna="#fe0000"
                nilai="1"
                namaPart="Shock Breaker"
                beban="3"
              />
              <div className="flex flex-col text-[11px] font-medium pr-5">
                <p>Arti Penilaian :</p>
                <p>
                  Shock breaker memiliki{" "}
                  <span className="font-bold">beban 3</span> karena merupakan
                  yang{" "}
                  <span className="font-bold">krusial /vital. Nilai 1</span>{" "}
                  berarti komponen tersebut{" "}
                  <span className="font-bold">RUSAK/BURUK</span>
                </p>
              </div>
            </div>
            <div className="w-full flex">
              <PenilaianContoh
                warna="#15924e"
                nilai="9"
                namaPart="Shock Breaker"
                beban="3"
              />
              <div className="flex flex-col text-[11px] font-medium pr-5">
                <p>Arti Penilaian :</p>
                <p>
                  Shock breaker memiliki{" "}
                  <span className="font-bold">beban 3</span> karena merupakan
                  yang{" "}
                  <span className="font-bold">krusial /vital. Nilai 9</span>{" "}
                  berarti komponen tersebut{" "}
                  <span className="font-bold">BAIK</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex">
          <div className="w-full bg-[#F4622F]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2  border-black">
              Fitur
            </p>
          </div>
        </div>

        <div className="w-full border-b-2 border-black py-2">
          <div className="w-full flex flex-wrap gap-2 items-center mx-auto">
            <PenilaianHasil
              warna="#FFFFFF"
              namaPart="Airbag"
              beban="3"
              nilai={data.fitur.airbag.toString()}
            />
            <PenilaianHasil
              warna="#FFFFFF"
              namaPart="Sistem AC"
              beban="3"
              nilai={data.fitur.sistemAC.toString()}
            />
            <PenilaianHasil
              warna="#FFFFFF"
              namaPart="Electric Mirror"
              beban="1"
              nilai={
                data.fitur.electricMirror ? data.fitur.electricMirror : "0"
              }
            />
            <PenilaianHasil
              warna="#FFFFFF"
              namaPart="Sistem Audio"
              beban="1"
              nilai={data.fitur.sistemAudio ? data.fitur.sistemAudio : "0"}
            />
            <PenilaianHasil
              warna="#FFFFFF"
              namaPart="Central Lock"
              beban="1"
              nilai={data.fitur.centralLock ? data.fitur.centralLock : "0"}
            />
            <PenilaianHasil
              warna="#FFFFFF"
              namaPart="Rem ABS"
              beban="3"
              nilai={data.fitur.remABS ? data.fitur.remABS : "0"}
            />
            <PenilaianHasil
              warna="#FFFFFF"
              namaPart="Power Window"
              beban="1"
              nilai={data.fitur.powerWindow ? data.fitur.powerWindow : "0"}
            />
          </div>

          <p className="text-[12px] px-1 mt-1 font-semibold">*Catatan:</p>
          <p className="text-[12px] px-1 py-4 mt-1 font-semibold">
            {data.fitur.catatan}
          </p>
        </div>

        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2  border-black">
              Hasil Inspeksi
            </p>
          </div>
        </div>

        <div className="w-full  py-2 mb-5">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              1
            </p>
            <p className="">Mesin Kendaraan</p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2.5 items-center justify-start">
            {mesinKendaraan.map((item, index) => (
              <PenilaianHasil
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                beban={item.beban.toString()}
                nilai={
                  data.hasilInspeksiMesin[item.part] != undefined
                    ? data.hasilInspeksiMesin[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Halaman3;

const mesinKendaraan = [
  { namaPart: "Getaran Mesin", beban: 3, part: "getaranMesin" },

  { namaPart: "Suara Mesin", beban: 3, part: "suaraMesin" },
  { namaPart: "Transmisi", beban: 3, part: "transmisi" },
  { namaPart: "Pompa Power Steering", beban: 2, part: "pompaPowerSteering" },
  { namaPart: "Cover Timming Chain", beban: 1, part: "coverTimingChain" },
  { namaPart: "Oli Power Steering", beban: 2, part: "oliPowerSteering" },
  { namaPart: "Accu", beban: 3, part: "accu" },
  { namaPart: "Kompressor AC", beban: 3, part: "kompressorAC" },

  { namaPart: "Fan", beban: 2, part: "fan" },
  { namaPart: "Selang", beban: 3, part: "selang" },
  { namaPart: "Karter Oli", beban: 2, part: "karterOli" },
  { namaPart: "Oli Rem", beban: 2, part: "oliRem" },
  { namaPart: "Kabel", beban: 3, part: "kabel" },
  { namaPart: "Kondensor", beban: 3, part: "kondensor" },
  { namaPart: "Radiator", beban: 3, part: "radiator" },
  { namaPart: "Cylinder Head", beban: 3, part: "cylinderHead" },

  { namaPart: "Oli Mesin", beban: 2, part: "oliMesin" },
  { namaPart: "Air Radiator", beban: 1, part: "airRadiator" },
  { namaPart: "Cover Klep", beban: 1, part: "coverKlep" },
  { namaPart: "Alternator", beban: 3, part: "alternator" },
  { namaPart: "Water Pump", beban: 3, part: "waterPump" },
  { namaPart: "Belt", beban: 3, part: "belt" },
  { namaPart: "Oli Transmisi", beban: 2, part: "oliTransmisi" },
  { namaPart: "Cylinder Block", beban: 3, part: "cylinderBlock" },
];
