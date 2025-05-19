"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Halaman1 from "@/components/Preview/Halaman1";
import Halaman2 from "@/components/Preview/Halaman2";
import Halaman3 from "@/components/Preview/Halaman3";
import Halaman4 from "@/components/Preview/Halaman4";
import Halaman5 from "@/components/Preview/Halaman5";
import Halaman6 from "@/components/Preview/Halaman6";
import Halaman8 from "../Preview/Halaman8";
import Halaman7 from "../Preview/Halaman7";

interface EditReviewComponentsProps {
  onClick: (data: any) => void; // Fungsi yang dipanggil saat klik
  data: any; // Data yang akan diproses
}

const EditReviewComponents: React.FC<EditReviewComponentsProps> = ({
  onClick,
  data,
}) => {
  const [dataHalaman1, setDataHalaman1] = useState<any>(null);
  const [dataHalaman2, setDataHalaman2] = useState<any>(null);
  const [dataHalaman3, setDataHalaman3] = useState<any>(null);
  const [dataHalaman4, setDataHalaman4] = useState<any>(null);
  const [dataHalaman5, setDataHalaman5] = useState<any>(null);
  const [dataHalaman6, setDataHalaman6] = useState<any>(null);
  const [dataHalaman7, setDataHalaman7] = useState<any>(null);
  const [dataHalaman8, setDataHalaman8] = useState<any>(null);

  useEffect(() => {
    if (data) {
      preProcessData(data);
    }
  }, [data]);

  const preProcessData = (data: any) => {
    setDataHalaman1({
      vehicleData: data?.vehicleData,
      equipmentChecklist: data?.equipmentChecklist,
      inspectionSummary: data?.inspectionSummary,
      identityDetails: data?.identityDetails,
      overallRating: data?.overallRating,
      vehiclePlateNumber: data?.vehiclePlateNumber,
      inspectionDate: data?.inspectionDate,
    });

    setDataHalaman2({
      inspectionSummary: data?.inspectionSummary,
    });

    setDataHalaman3({
      fitur: data?.detailedAssessment?.fitur,
      hasilInspeksiMesin: data?.detailedAssessment?.hasilInspeksiMesin,
    });

    setDataHalaman4({
      hasilInspeksiMesin: data?.detailedAssessment?.hasilInspeksiMesin,
      hasilInspeksiInterior: data?.detailedAssessment?.hasilInspeksiInterior,
      hasilInspeksiEksterior: data?.detailedAssessment?.hasilInspeksiEksterior,
    });

    setDataHalaman5({
      hasilInspeksiEksterior: data?.detailedAssessment?.hasilInspeksiEksterior,
      banDanKakiKaki: data?.detailedAssessment?.banDanKakiKaki,
      testDrive: data?.detailedAssessment?.testDrive,
    });

    setDataHalaman6({
      toolsTest: data?.detailedAssessment?.toolsTest,
      photo: data?.photoPaths,
    });
    setDataHalaman7({
      bodyPaintThickness: data?.bodyPaintThickness,
    });
    setDataHalaman8({
      bodyPaintThickness: data?.bodyPaintThickness,
    });
  };

  const page = [
    {
      id: 1,
      title: "Halaman 1",
      component: (
        <Halaman1 data={dataHalaman1} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 2,
      title: "Halaman 2",
      component: (
        <Halaman2 data={dataHalaman2} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 3,
      title: "Halaman 3",
      component: (
        <Halaman3 data={dataHalaman3} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 4,
      title: "Halaman 4",
      component: (
        <Halaman4 data={dataHalaman4} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 5,
      title: "Halaman 5",
      component: (
        <Halaman5 data={dataHalaman5} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 6,
      title: "Halaman 6",
      component: (
        <Halaman6 data={dataHalaman6} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 7,
      title: "Halaman 7",
      component: (
        <Halaman7 data={dataHalaman7} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 8,
      title: "Halaman 8",
      component: (
        <Halaman8 data={dataHalaman7} editable={true} onClick={onClick} />
      ),
    },
  ];

  return (
    <>
      <div className="sheet-outer A4 font-poppins">
        {page.map((item, index) => (
          <div key={index} className="sheet padding-5mm">
            {item.component}
          </div>
        ))}
      </div>
    </>
  );
};

export default EditReviewComponents;
