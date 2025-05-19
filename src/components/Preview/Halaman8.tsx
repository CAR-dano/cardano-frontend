import React from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Halaman8Props {
  data: any;
  editable: boolean;
  onClick?: (data: any) => void;
}

const Halaman8: React.FC<Halaman8Props> = ({
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

        <div className="w-full relative mt-10 flex justify-center flex-col items-center mb-28">
          <img
            src="/assets/inspection/ketebalanKiri.svg"
            alt=""
            className="w-[90%]"
          />
          <div
            className="absolute transform -translate-x-1/2"
            style={{ top: "10%", left: "24%" }}
          >
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Cat Depan`,
                  fieldName: `bodyPaintThickness`,
                  oldValue: data?.bodyPaintThickness.left.frontFender,
                  subFieldName: "left.frontFender",
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
              {data.bodyPaintThickness.left.frontFender}mm
            </div>
          </div>
          <div
            className="absolute transform -translate-x-1/2"
            style={{ top: "4%", left: "44%" }}
          >
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Cat Depan`,
                  fieldName: `bodyPaintThickness`,
                  oldValue: data?.bodyPaintThickness.left.frontDoor,
                  subFieldName: "left.frontDoor",
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
              {data.bodyPaintThickness.left.frontDoor}mm
            </div>
          </div>
          <div
            className="absolute transform -translate-x-1/2"
            style={{ top: "4%", right: "30%" }}
          >
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Cat Depan`,
                  fieldName: `bodyPaintThickness`,
                  oldValue: data?.bodyPaintThickness.left.rearDoor,
                  subFieldName: "left.rearDoor",
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
              {data.bodyPaintThickness.left.rearDoor}mm
            </div>
          </div>
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Cat Depan`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.left.rearFender,
                subFieldName: "left.rearFender",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "10%", right: "4%" }}
          >
            <div
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.left.rearFender}mm
            </div>
          </div>
          <p className="font-bold">SAMPING KIRI</p>
        </div>

        <div className="relative w-full my-20 flex justify-center flex-col items-center">
          <img
            src="/assets/inspection/ketebalanKanan.svg"
            alt="Car diagram"
            className="w-[90%]"
          />
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Cat Depan`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.right.rearFender,
                subFieldName: "right.rearFender",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "12%", left: "9%" }}
          >
            <div
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.right.rearFender}mm
            </div>
          </div>
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Cat Depan`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.right.rearDoor,
                subFieldName: "right.rearDoor",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "-12%", left: "39%" }}
          >
            <div
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.right.rearDoor}mm
            </div>
          </div>
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Cat Depan`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.right.frontDoor,
                subFieldName: "right.frontDoor",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "-12%", right: "33%" }}
          >
            <div
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.right.frontDoor}mm
            </div>
          </div>
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Cat Depan`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.right.frontFender,
                subFieldName: "right.frontFender",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "0%", right: "12%" }}
          >
            <div
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.right.frontFender}mm
            </div>
          </div>
          <p className="font-bold">SAMPING KANAN</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Halaman8;
