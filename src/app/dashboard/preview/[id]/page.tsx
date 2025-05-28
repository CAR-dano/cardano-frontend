"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Halaman1 from "../../../../components/Preview/Halaman1";
import Halaman2 from "../../../../components/Preview/Halaman2";
import Halaman3 from "../../../../components/Preview/Halaman3";
import Halaman4 from "../../../../components/Preview/Halaman4";
import Halaman5 from "../../../../components/Preview/Halaman5";
import Halaman6 from "../../../../components/Preview/Halaman6";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../lib/store";
import { getDataForPreview } from "../../../../lib/features/inspection/inspectionSlice";
import { Button } from "../../../../components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import Halaman7 from "../../../../components/Preview/Halaman7";
import Halaman8 from "../../../../components/Preview/Halaman8";
import HalamanExteriorPhoto from "../../../../components/Preview/HalamanExteriorPhoto";
import HalamanInteriorPhoto from "../../../../components/Preview/HalamanInteriorPhoto";

function DataPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [dataHalaman1, setDataHalaman1] = useState<any>(null);
  const [dataHalaman2, setDataHalaman2] = useState<any>(null);
  const [dataHalaman3, setDataHalaman3] = useState<any>(null);
  const [dataHalaman4, setDataHalaman4] = useState<any>(null);
  const [dataHalaman5, setDataHalaman5] = useState<any>(null);
  const [dataHalaman6, setDataHalaman6] = useState<any>(null);
  const [dataHalaman7, setDataHalaman7] = useState<any>(null);
  const [dataHalaman8, setDataHalaman8] = useState<any>(null);
  const [dataHalaman9, setDataHalaman9] = useState<any>(null);
  const [dataHalamanExteriorPhotos, setDataHalamanExteriorPhotos] = useState<
    any[]
  >([]);
  const [dataHalamanInteriorPhotos, setDataHalamanInteriorPhotos] = useState<
    any[]
  >([]);

  const getData = async (id: string) => {
    const response = await dispatch(getDataForPreview(id)).unwrap();
    if (response) {
      console.log("response", response);
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

  const getImageTampakDepan = (data: any) => {
    // find in data.photos
    const photo = data?.photos?.find(
      (item: any) => item.label === "Tampak Depan"
    );
    return photo ? photo.path : "";
  };

  const preProcessData = (data: any) => {
    setDataHalaman1({
      vehicleData: data?.vehicleData,
      equipmentChecklist: data?.equipmentChecklist,
      inspectionSummary: data?.inspectionSummary,
      identityDetails: data?.identityDetails,
      overallRating: data?.overallRating,
      vehiclePlateNumber: data?.vehiclePlateNumber,
      inspectionDate: data?.inspectionDate,
      photos: getImageTampakDepan(data),
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
      fotoGeneral: data?.photos,
    });

    // Filter exterior photos and paginate them
    const exteriorPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Eksterior"
    );
    const paginatedExteriorPhotos = [];
    for (let i = 0; i < exteriorPhotos.length; i += 9) {
      paginatedExteriorPhotos.push(exteriorPhotos.slice(i, i + 9));
    }
    setDataHalamanExteriorPhotos(paginatedExteriorPhotos);

    // Filter interior photos and paginate them
    const interiorPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Interior"
    );
    const paginatedInteriorPhotos = [];
    for (let i = 0; i < interiorPhotos.length; i += 9) {
      paginatedInteriorPhotos.push(interiorPhotos.slice(i, i + 9));
    }
    setDataHalamanInteriorPhotos(paginatedInteriorPhotos);

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
      component: <Halaman1 data={dataHalaman1} editable={false} />,
    },
    {
      id: 2,
      title: "Halaman 2",
      component: <Halaman2 data={dataHalaman2} editable={false} />,
    },
    {
      id: 3,
      title: "Halaman 3",
      component: <Halaman3 data={dataHalaman3} editable={false} />,
    },
    {
      id: 4,
      title: "Halaman 4",
      component: <Halaman4 data={dataHalaman4} editable={false} />,
    },
    {
      id: 5,
      title: "Halaman 5",
      component: <Halaman5 data={dataHalaman5} editable={false} />,
    },
    {
      id: 6,
      title: "Halaman 6",
      component: <Halaman6 data={dataHalaman6} editable={false} />,
    },
    // Dynamically add HalamanExteriorPhoto pages
    ...dataHalamanExteriorPhotos.map((photosChunk, index) => ({
      id: 7 + index, // Adjust ID based on previous pages
      title: `Foto Eksterior - Part ${index + 1}`,
      component: (
        <HalamanExteriorPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    // Dynamically add HalamanInteriorPhoto pages
    ...dataHalamanInteriorPhotos.map((photosChunk, index) => ({
      id: 7 + dataHalamanExteriorPhotos.length + index, // Adjust ID based on previous pages and new exterior photo pages
      title: `Foto Interior - Part ${index + 1}`,
      component: (
        <HalamanInteriorPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    {
      id:
        7 + dataHalamanExteriorPhotos.length + dataHalamanInteriorPhotos.length,
      title: "Halaman 7",
      component: <Halaman7 data={dataHalaman7} editable={false} />,
    },
    {
      id:
        8 + dataHalamanExteriorPhotos.length + dataHalamanInteriorPhotos.length,
      title: "Halaman 8",
      component: <Halaman8 data={dataHalaman8} editable={false} />,
    },
  ];

  return (
    <>
      <div className="absolute top-5 left-5 no-print">
        <Button
          onClick={() => {
            window.history.back();
          }}
          className="bg-blue-500 text-white hover:bg-blue-700"
        >
          <IoArrowBack /> Back
        </Button>
      </div>
      <div className="absolute top-5 right-5 no-print">
        <Button
          onClick={() => {
            window.print();
          }}
          className="bg-orange-600 text-white hover:bg-orange-700"
        >
          <IoMdDownload /> Download Preview
        </Button>
      </div>
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
