import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Halaman7Props {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
}

const Halaman7: React.FC<Halaman7Props> = ({
  data,
  editable,
  onClick = () => {},
}) => {
  if (data == undefined || data == null) {
    return <div>Loading...</div>; // atau bisa return null
  }

  return (
    <div className="px-[30px] font-poppins">
      <Header />
      <div className="w-full border-2 border-black mt-12 mb-8">
        <div className="w-full flex">
          <div className="w-full bg-[#E95F37]">
            <p className="text-left text-white py-3 px-3 font-semibold border-b-2 border-black">
              Hasil Pengecekan Ketebalan Cat
            </p>
          </div>
        </div>

        <div className="w-full relative mt-10 flex justify-center flex-col items-center mb-20">
          <img
            src="/assets/inspection/ketebalanDepan.svg"
            alt=""
            className="w-[50%]"
          />
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Cat Depan`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.front,
                subFieldName: "front",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className={`absolute -top-5 left-1/2 transform -translate-x-1/2 text-black
                ${
                  editable
                    ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                    : "cursor-default"
                }
              `}
          >
            {data.bodyPaintThickness.front}mm
          </div>
          <p className="font-bold">DEPAN</p>
        </div>

        <div className="relative w-full my-10 flex justify-center flex-col items-center">
          <img
            src="/assets/inspection/ketebalanBelakang.svg"
            alt="Car diagram"
            className="w-[50%]"
          />
          <div
            className="absolute transform -translate-x-1/2"
            style={{ top: "-7%", left: "50%" }}
          >
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Cat Belakang Bumper`,
                  fieldName: `bodyPaintThickness`,
                  oldValue: data?.bodyPaintThickness.rear.bumper,
                  subFieldName: "rearBumper",
                  type: "normal-input",
                  onClose: () => {},
                })
              }
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.rear.bumper}mm
            </div>
          </div>
          <div
            className="absolute transform -translate-x-1/2"
            style={{ top: "8%", right: "15%" }}
          >
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Cat Belakang Pintu Bagasi`,
                  fieldName: `bodyPaintThickness`,
                  oldValue: data?.bodyPaintThickness.rear.trunk,
                  subFieldName: "rearTrunk",
                  type: "normal-input",
                  onClose: () => {},
                })
              }
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.rear.trunk}mm
            </div>
          </div>
          <p className="font-bold">BELAKANG</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Halaman7;
