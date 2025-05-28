import React from "react";

type PenilaianContohProps = {
  warna: string;
  nilai: string;
  namaPart: string;
  beban: string;
};

const PenilaianContoh: React.FC<PenilaianContohProps> = ({
  warna,
  nilai,
  namaPart,
  beban,
}) => {
  return (
    <div className="flex font-poppins">
      <div className="flex flex-col items-center">
        <p className="text-[10px]">Warna</p>
        <div
          className="w-8 h-8 border-[1.5px] border-black"
          style={{ backgroundColor: warna }}
        ></div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[10px]">Nilai</p>
        <div className="text-black font-bold w-8 h-8 -ml-[0.8px]  border-y-[1.5px] border-black flex items-center justify-center">
          {nilai}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[10px]">Nama Part</p>
        <div className="text-black font-bold w-[150px] h-8 border-l-[1.5px] border-y-[1.5px] border-black flex items-center justify-start text-[12px] font-bold px-2">
          {namaPart}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-[10px]">Beban</p>
        <div className="text-black font-bold w-8 h-8 border-[1.5px] border-black flex items-center justify-center">
          {beban}
        </div>
      </div>
    </div>
  );
};

export default PenilaianContoh;
