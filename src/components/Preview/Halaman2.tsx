import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import PenilaianContoh from "./PenilaianContoh";

function Halaman2({ data }: any) {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="px-[30px] ">
      <Header />

      <div className="w-full border-2 border-black mt-12">
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
          <div className="w-1/4 min-h-[180px] border-black border-r-2  ">
            <p className="text-left text-[13px] text-black py-2 px-3 font-medium ">
              - {data.inspectionSummary.mesinNotes}
            </p>
          </div>
          <div className="w-1/4 min-h-[180px] border-black border-r-2">
            <p className="text-left text-[13px] text-black py-2 px-3 font-medium">
              - {data.inspectionSummary.kakiKakiNotes}
            </p>
          </div>
          <div className="w-1/4 min-h-[180px] border-black border-r-2">
            <p className="text-left text-[13px] text-black py-2 px-3 font-medium">
              - {data.inspectionSummary.interiorNotes}
            </p>
          </div>
          <div className="w-1/4 min-h-[180px] ">
            <p className="text-left text-[13px] text-black py-2 px-3 font-medium">
              - {data.inspectionSummary.exteriorNotes}
            </p>
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

        <div className="w-full flex border-b-2 border-black">
          <div className="w-[45%] min-h-[200px] border-black border-r-2  ">
            <div className="text-left text-[13px] text-black py-2 px-3 font-medium ">
              <ul className="list-none">
                {data.inspectionSummary.estimasiPerbaikan.map((item: any) => (
                  <li key={item.namaPart} className="">
                    {item.namaPart}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-[35%] min-h-[200px] border-black border-r-2">
            <p className="text-left text-[13px] text-black py-2 px-3 font-medium">
              <ul className="list-none">
                {data.inspectionSummary.estimasiPerbaikan.map((item: any) => (
                  <li key={item.harga} className="">
                    {formatPrice(item.harga)}
                  </li>
                ))}
              </ul>
            </p>
          </div>
          <div className="w-[20%] h-50 flex justify-center items-center">
            <p className="text-center text-[10px] text-black px-3 font-light -mt-10">
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

        <div className="w-full flex border-b-2 border-black py-8 items-center justify-between px-2">
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
          <div className="w-1/5 border-r-2  border-black">
            <p className="text-[12px] text-center text-black py-1 px-3 font-semibold border-b-2 border-black">
              Posisi Ban
            </p>
            <p className="text-center text-[12px] h-10 text-left text-black  font-semibold ">
              Depan <br /> Belakang
            </p>
          </div>
          <div className="w-1/5 border-r-2  border-black">
            <p className="text-[12px] text-center text-black py-1 px-3 font-semibold border-b-2 border-black">
              Merk
            </p>
            <p className="text-center text-[12px] h-10 text-left text-black  font-semibold flex items-center justify-center">
              {data.inspectionSummary.merekBanDepan ==
              data.inspectionSummary.merekBanBelakang ? (
                data.inspectionSummary.merekBanDepan
              ) : (
                <>
                  {data.inspectionSummary.merekBanDepan} <br />{" "}
                  {data.inspectionSummary.merekBanBelakang}
                </>
              )}
            </p>
          </div>
          <div className="w-1/5 border-r-2  border-black">
            <p className="text-[12px] text-center text-black py-1 px-3 font-semibold border-b-2 border-black">
              Tipe velg
            </p>
            <p className="text-center text-[12px] h-10 text-left text-black  font-semibold flex items-center justify-center">
              {data.inspectionSummary.tipeVelgDepan ==
              data.inspectionSummary.tipeVelgBelakang ? (
                data.inspectionSummary.tipeVelgDepan
              ) : (
                <>
                  {data.inspectionSummary.tipeVelgDepan} <br />{" "}
                  {data.inspectionSummary.tipeVelgBelakang}
                </>
              )}
            </p>
          </div>

          <div className="w-1/5">
            <p className="text-[12px] text-center text-black py-1 px-3 font-semibold border-b-2 border-black">
              Ketebalan
            </p>
            <p className="text-center text-[12px] h-10 text-left text-black  font-semibold flex items-center justify-center">
              {data.inspectionSummary.ketebalanBanDepan ==
              data.inspectionSummary.ketebalanBanBelakang ? (
                data.inspectionSummary.ketebalanBanDepan
              ) : (
                <>
                  {data.inspectionSummary.ketebalanBanDepan} <br />{" "}
                  {data.inspectionSummary.ketebalanBanBelakang}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Halaman2;
