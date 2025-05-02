import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Halaman6({ data }: any) {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  console.log(data, "ini data halaman 6");

  return (
    <div className="px-[30px]">
      <Header />
      <div className="w-full border-2 border-black mt-4">
        <div className="w-full flex">
          <div className="w-full bg-[#F4622F]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Hasil Inspeksi
            </p>
          </div>
        </div>

        <div className="flex gap-1 text-[14px] px-2 mb-2 font-semibold mt-2">
          <p className="">Foto Kendaraan</p>
        </div>

        <div className="flex flex-wrap gap-3 px-4 pb-4 justify-around">
          {Array.from(
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
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Halaman6;
