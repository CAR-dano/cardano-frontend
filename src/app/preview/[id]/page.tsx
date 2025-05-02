"use client";
import React, { useEffect } from "react";
import "./style.css";
import Halaman1 from "@/components/Preview/Halaman1";
import Halaman2 from "@/components/Preview/Halaman2";
import Halaman3 from "@/components/Preview/Halaman3";
import Halaman4 from "@/components/Preview/Halaman4";
import Halaman5 from "@/components/Preview/Halaman5";
import Halaman6 from "@/components/Preview/Halaman6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { getDataForPreview } from "@/lib/features/inspection/inspectionSlice";

function DataPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [dataHalaman1, setDataHalaman1] = React.useState<any>(null);
  const [dataHalaman2, setDataHalaman2] = React.useState<any>(null);
  const [dataHalaman3, setDataHalaman3] = React.useState<any>(null);
  const [dataHalaman4, setDataHalaman4] = React.useState<any>(null);
  const [dataHalaman5, setDataHalaman5] = React.useState<any>(null);
  const [dataHalaman6, setDataHalaman6] = React.useState<any>(null);

  const getData = async (id: string) => {
    const response = await dispatch(getDataForPreview(id)).unwrap();
    if (response) {
      preProcessData(response);
    } else {
      console.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id) {
      getData(id);
    }
  }, []);

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
      toolsTest: data?.detailedAssessment?.toolsTest,
    });

    setDataHalaman6({
      photo: data?.photoPaths,
    });
  };

  const page = [
    {
      id: 1,
      title: "Halaman 1",
      component: <Halaman1 data={dataHalaman1} />,
    },
    {
      id: 2,
      title: "Halaman 2",
      component: <Halaman2 data={dataHalaman2} />,
    },
    {
      id: 3,
      title: "Halaman 3",
      component: <Halaman3 data={dataHalaman3} />,
    },
    {
      id: 4,
      title: "Halaman 4",
      component: <Halaman4 data={dataHalaman4} />,
    },
    {
      id: 5,
      title: "Halaman 5",
      component: <Halaman5 data={dataHalaman5} />,
    },
    {
      id: 6,
      title: "Halaman 6",
      component: <Halaman6 data={dataHalaman6} />,
    },
  ];

  return (
    <>
      <div className="sheet-outer A4">
        {page.map((item, index) => (
          <div key={index} className="sheet padding-5mm">
            {item.component}
          </div>
        ))}
      </div>
    </>
  );
}

export default DataPage;
