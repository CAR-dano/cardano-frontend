import React from "react";

type PenilaianHasilProps = {
  warna: string;
  nilai: string;
  namaPart: string;
  beban: string;
};

const PenilaianHasil: React.FC<PenilaianHasilProps> = ({
  warna,
  nilai,
  namaPart,
  beban,
}) => {
  const dataColor = [
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
  ];

  const findColor = (val: number) => {
    const color = dataColor.find((item) => item.val === val);
    return color ? color.color : "#000000"; // default color if not found
  };

  return (
    <div className="flex mx-1">
      <div className="flex flex-col items-center">
        <div
          className="w-7 h-7 border-[1.5px] border-black"
          style={{ backgroundColor: findColor(parseInt(nilai)) }}
        ></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold w-7 h-7 border-y-[1.5px] border-black flex items-center justify-center">
          {nilai}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold w-[125px] h-7 border-l-[1.5px] border-y-[1.5px] border-black flex items-center justify-start text-[10px] font-bold px-1.5">
          {namaPart}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="font-bold w-7 h-7 border-[1.5px] border-black flex items-center justify-center">
          {beban}
        </div>
      </div>
    </div>
  );
};

export default PenilaianHasil;
