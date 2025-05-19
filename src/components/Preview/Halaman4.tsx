import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import PenilaianHasil from "./PenilaianHasil";

interface Halaman4Props {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
}

const Halaman4: React.FC<Halaman4Props> = ({
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

  return (
    <div className="px-[30px] font-poppins">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-6">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2  border-black">
              Hasil Inspeksi
            </p>
          </div>
        </div>

        <div className="w-full border-b-2 border-black py-2">
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {mesinKendaraan.map((item, index) => (
              <PenilaianHasil
                edit={editable}
                onClick={handleClick}
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

          <p className="text-[12px] px-2 mt-1 font-semibold">*Catatan:</p>
          <p className="text-[12px] px-3 min-h-[50px] mt-1 font-semibold">
            {data.hasilInspeksiMesin.catatan}
          </p>
        </div>

        <div className="w-full border-b-2 border-black py-2">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              2
            </p>
            <p className="">
              Interior Kendaraan (Dashboard, Kelistrikan, Instrumen, Jok & Trim)
            </p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {interiorKendaraan.map((item, index) => (
              <PenilaianHasil
                edit={editable}
                onClick={handleClick}
                key={index}
                warna="#FFFFFF"
                namaPart={item.namaPart}
                beban={item.beban.toString()}
                nilai={
                  data.hasilInspeksiInterior[item.part] != undefined
                    ? data.hasilInspeksiInterior[item.part].toString()
                    : "0"
                }
              />
            ))}
          </div>

          <p className="text-[12px] px-2  mt-1 font-semibold">*Catatan:</p>
          <p className="text-[12px] px-3 min-h-[50px] mt-1 font-semibold">
            {data.hasilInspeksiInterior.catatan}
          </p>
        </div>

        <div className="w-full  py-2 mb-2">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
            <p className="border-[1px] border-black rounded-full aspect-square w-5 h-5 flex items-center justify-center font-bold">
              2
            </p>
            <p className="">Eksterior Kendaraan</p>
          </div>
          <div className="pl-2 w-full flex flex-wrap gap-x-3 gap-y-2 items-center justify-start">
            {eksteriorKendaraan.map((item, index) => (
              <PenilaianHasil
                edit={editable}
                onClick={handleClick}
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Halaman4;

const mesinKendaraan = [
  { namaPart: "Bushing Besar", beban: 3, part: "bushingBesar" },
  { namaPart: "Bushing Besar", beban: 3, part: "bushingKecil" },
  { namaPart: "Tutup Radiator", beban: 1, part: "tutupRadiator" },
];

const interiorKendaraan = [
  { namaPart: "Stir", beban: 1, part: "stir" },
  { namaPart: "Rem Tangan", beban: 1, part: "remTangan" },
  { namaPart: "Pedal", beban: 1, part: "pedal" },
  { namaPart: "Switch Wiper", beban: 1, part: "switchWiper" },
  { namaPart: "Lampu Hazard", beban: 1, part: "lampuHazard" },
  { namaPart: "Panel Dashboard", beban: 1, part: "panelDashboard" },
  { namaPart: "Pembuka Kap Mesin", beban: 1, part: "pembukaKapMesin" },
  { namaPart: "Pembuka Bagasi", beban: 1, part: "pembukaBagasi" },
  { namaPart: "Jok Depan", beban: 1, part: "jokDepan" },
  { namaPart: "Aroma Interior", beban: 2, part: "aromaInterior" },
  { namaPart: "Handle Pintu", beban: 2, part: "handlePintu" },
  { namaPart: "Console Box", beban: 1, part: "consoleBox" },
  { namaPart: "Spion Tengah", beban: 1, part: "spionTengah" },
  { namaPart: "Tuas Persneling", beban: 1, part: "tuasPersneling" },
  { namaPart: "Jok Belakang", beban: 1, part: "jokBelakang" },
  { namaPart: "Panel Indikator", beban: 2, part: "panelIndikator" },
  { namaPart: "Switch Lampu", beban: 1, part: "switchLampu" },
  { namaPart: "Karpet Dasar", beban: 1, part: "karpetDasar" },
  { namaPart: "Klakson", beban: 1, part: "klakson" },
  { namaPart: "Sun Visor", beban: 1, part: "sunVisor" },
  { namaPart: "Tuas Tangki Bensin", beban: 1, part: "tuasTangkiBensin" },
  { namaPart: "Sabuk Pengaman", beban: 3, part: "sabukPengaman" },
  { namaPart: "Trim Interior", beban: 1, part: "trimInterior" },
  { namaPart: "Plafon", beban: 2, part: "plafon" },
];

const eksteriorKendaraan = [
  { namaPart: "Bumper Depan", beban: 1, part: "bumperDepan" },
  { namaPart: "Kap Mesin", beban: 2, part: "kapMesin" },
  { namaPart: "Lampu Utama", beban: 3, part: "lampuUtama" },
  { namaPart: "Panel Atap", beban: 1, part: "panelAtap" },
  { namaPart: "Grill", beban: 1, part: "grill" },
  { namaPart: "Lampu Foglamp", beban: 2, part: "lampuFoglamp" },
  { namaPart: "Kaca Belakang", beban: 2, part: "kacaBening" },
  { namaPart: "Wiper Belakang", beban: 1, part: "wiperBelakang" },
  { namaPart: "Bumper Belakang", beban: 1, part: "bumperBelakang" },
  { namaPart: "Lampu Belakang", beban: 3, part: "lampuBelakang" },
  { namaPart: "Trunklid", beban: 1, part: "trunklid" },
  { namaPart: "Kaca Depan", beban: 2, part: "kacaDepan" },
  { namaPart: "Fender Kanan", beban: 1, part: "fenderKanan" },
  { namaPart: "Quarter Panel Kanan", beban: 1, part: "quarterPanelKanan" },
  { namaPart: "Pintu Belakang Kanan", beban: 2, part: "pintuBelakangKanan" },
  { namaPart: "Spion Kanan", beban: 2, part: "spionKanan" },
  { namaPart: "Lisplang Kanan", beban: 1, part: "lisplangKanan" },
  { namaPart: "Side Skirt Kanan", beban: 1, part: "sideSkirtKanan" },
];
