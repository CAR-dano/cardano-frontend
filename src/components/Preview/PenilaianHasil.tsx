import React, { useRef, useState, useEffect } from "react";

type PenilaianHasilProps = {
  warna: string;
  nilai: string;
  namaPart: string;
  beban: string;
  edit?: boolean;
  subFieldName?: string;
  subSubFieldName?: string;
  onClick?: (data: any) => void;
};

const PenilaianHasil: React.FC<PenilaianHasilProps> = ({
  warna,
  nilai,
  namaPart,
  beban,
  edit = false,
  subFieldName,
  subSubFieldName,
  onClick = () => {},
}) => {
  const namaPartRef = useRef<HTMLDivElement>(null);
  const [currentFontSize, setCurrentFontSize] = useState(12); // Initial font size

  useEffect(() => {
    const adjustFontSize = () => {
      if (namaPartRef.current) {
        const containerWidth = namaPartRef.current.clientWidth;
        const textWidth = namaPartRef.current.scrollWidth;

        // If text overflows, reduce font size
        if (textWidth > containerWidth) {
          let newSize = currentFontSize;
          while (
            namaPartRef.current.scrollWidth > containerWidth &&
            newSize > 8
          ) {
            // Minimum font size 8px
            newSize -= 0.5; // Decrease by 0.5px
            setCurrentFontSize(newSize);
            namaPartRef.current.style.fontSize = `${newSize}px`; // Apply immediately for measurement
          }
        } else if (textWidth < containerWidth && currentFontSize < 12) {
          // Max font size 12px
          let newSize = currentFontSize;
          while (
            namaPartRef.current.scrollWidth < containerWidth &&
            newSize < 12
          ) {
            newSize += 0.5;
            setCurrentFontSize(newSize);
            namaPartRef.current.style.fontSize = `${newSize}px`;
          }
        }
      }
    };

    // Run adjustment on mount and when namaPart changes
    adjustFontSize();
    // Add a resize listener to adjust font size if the container width changes (e.g., window resize)
    window.addEventListener("resize", adjustFontSize);
    return () => window.removeEventListener("resize", adjustFontSize);
  }, [namaPart, currentFontSize]); // Re-run when namaPart or currentFontSize changes
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
    <div
      className={`
    transition-all font-poppins
        flex mx-1 ${
          edit
            ? "hover:outline hover:outline-2 hover:outline-[#F4622F] cursor-pointer "
            : ""
        }
    `}
      onClick={() =>
        edit &&
        onClick({
          label: `Inspection Summary`,
          fieldName: `detailedAssessment`,
          oldValue: nilai,
          subFieldName: subFieldName,
          subsubfieldname: subSubFieldName,
          type: "penilaian-summary",
          onClose: () => {},
        })
      }
    >
      <div className="flex flex-col items-center">
        <div
          className="w-7 h-7 border-[1.5px] border-black"
          style={{ backgroundColor: findColor(parseInt(nilai)) }}
        ></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-black font-bold w-7 h-7 border-y-[1.5px] border-black flex items-center justify-center">
          {nilai}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div
          ref={namaPartRef}
          className="text-black font-bold w-[125px] h-7 border-l-[1.5px] border-y-[1.5px] border-black flex items-center justify-start px-1.5"
          style={{
            fontSize: `${currentFontSize}px`,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {namaPart}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-black font-bold w-7 h-7 border-[1.5px] border-black flex items-center justify-center">
          {beban}
        </div>
      </div>
    </div>
  );
};

export default PenilaianHasil;
