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

  return (
    <div className="px-[30px] font-poppins">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-8">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Hasil Inspeksi
            </p>
          </div>
        </div>

        <div className="w-full  py-2 mb-2 border-b-2 border-black">
          <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold">
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
          <p className="text-[12px] px-3 min-h-[45px] mt-1 font-semibold">
            {data.toolsTest.catatan}
          </p>
        </div>

        <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold mt-2">
          <p className="">Foto Kendaraan</p>
        </div>

        <div className="flex flex-wrap gap-3 px-4 pb-4 justify-around">
          {/* {data.photo.length > 0 ? (
            Array.from(
              { length: data.photo.length },
              (_, index) =>
                data.photo[index] && (
                  <img
                    key={index}
                    src={`http://31.220.81.182/uploads/inspection-photos/${data.photo[index]}`}
                    alt={`Foto ${index + 1}`}
                    className="w-[210px] h-[140px] object-cover border border-gray-300"
                  />
                )
            )
          ) : (
            <p className="text-center text-gray-500">Tidak ada foto</p>
          )} */}
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
  { namaPart: "Test ACCU ( ON & OFF )", beban: 3, part: "testAccu" },
  { namaPart: "Temperatur AC Mobil", beban: 2, part: "temperaturACMobil" },
  { namaPart: "OBD Scanner", beban: 3, part: "obdScanner" },
];
