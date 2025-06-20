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

        <div className="w-full relative mt-16 flex justify-center flex-col items-center mb-28 ">
          <img
            src="/assets/inspection/ketebalanKiri.svg"
            alt=""
            className="w-[80%]"
          />
          <div
            className="absolute transform -translate-x-1/2"
            style={{ top: "-11%", left: "13%" }}
          >
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Cat Depan`,
                  fieldName: `bodyPaintThickness`,
                  oldValue: data?.bodyPaintThickness.left.frontFender,
                  subFieldName: "left",
                  subsubfieldname: "frontFender",
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
            style={{ top: "-11%", left: "34%" }}
          >
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Cat Depan`,
                  fieldName: `bodyPaintThickness`,
                  oldValue: data?.bodyPaintThickness.left.frontDoor,
                  subFieldName: "left",
                  subsubfieldname: "frontDoor",
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
            style={{ top: "-11%", right: "30%" }}
          >
            <div
              onClick={() =>
                editable &&
                onClick({
                  label: `Ketebalan Cat Depan`,
                  fieldName: `bodyPaintThickness`,
                  oldValue: data?.bodyPaintThickness.left.rearDoor,
                  subFieldName: "left",
                  subsubfieldname: "rearDoor",
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
                subFieldName: "left",
                subsubfieldname: "rearFender",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "-11%", right: "5%" }}
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
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Sideskirt Kiri`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.left.sideSkirt,
                subFieldName: "left",
                subsubfieldname: "sideSkirt",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "77%", right: "40%" }}
          >
            <div
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.left.sideSkirt}mm
            </div>
          </div>
          <p className="text-black  font-bold mt-10">SAMPING KIRI</p>
        </div>

        <div className="relative w-full mt-16 mb-10  flex justify-center flex-col items-center">
          <img
            src="/assets/inspection/ketebalanKanan.svg"
            alt="Car diagram"
            className="w-[80%]"
          />
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Cat Depan`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.right.rearFender,
                subFieldName: "right",
                subsubfieldname: "rearFender",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "-10%", left: "14%" }}
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
                subFieldName: "right",
                subsubfieldname: "rearDoor",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "-10%", left: "35%" }}
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
                subFieldName: "right",
                subsubfieldname: "frontDoor",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "-10%", right: "33%" }}
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
                subFieldName: "right",
                subsubfieldname: "frontFender",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "-10%", right: "12%" }}
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
          <div
            onClick={() =>
              editable &&
              onClick({
                label: `Ketebalan Sideskirt Kanan`,
                fieldName: `bodyPaintThickness`,
                oldValue: data?.bodyPaintThickness.right.sideSkirt,
                subFieldName: "right",
                subsubfieldname: "sideSkirt",
                type: "normal-input",
                onClose: () => {},
              })
            }
            className="absolute transform -translate-x-1/2"
            style={{ top: "79%", right: "40%" }}
          >
            <div
              className={`text-black ${
                editable
                  ? "cursor-pointer hover:text-white hover:bg-orange-600 px-2 py-1 rounded-full"
                  : "cursor-default"
              }`}
            >
              {data.bodyPaintThickness.right.sideSkirt}mm
            </div>
          </div>
          <p className="text-black font-bold mt-10">SAMPING KANAN</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Halaman8;
