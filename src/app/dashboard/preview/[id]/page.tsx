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
import {
  getDataEdited,
  getDataForPreview,
} from "../../../../lib/features/inspection/inspectionSlice";
import { Button } from "../../../../components/ui/button";
import { IoArrowBack } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import Halaman7 from "../../../../components/Preview/Halaman7";
import Halaman8 from "../../../../components/Preview/Halaman8";
import HalamanExteriorPhoto from "../../../../components/Preview/HalamanExteriorPhoto";
import HalamanInteriorPhoto from "../../../../components/Preview/HalamanInteriorPhoto";
import HalamanMesinPhoto from "../../../../components/Preview/HalamanMesinPhoto";
import HalamanKakiKakiPhoto from "../../../../components/Preview/HalamanKakiKakiPhoto";
import HalamanAlatAlatPhoto from "../../../../components/Preview/HalamanAlatAlatPhoto";
import HalamanGeneralPhoto from "../../../../components/Preview/HalamanGeneralPhoto";
import HalamanFotoDokumen from "../../../../components/Preview/HalamanFotoDokumen";

import {
  SortingGeneralData,
  SortingExteriorData,
  SortingInteriorData,
  SortingMesinData,
  SortingKakiKakiData,
  SortingAlatAlatData,
} from "../../../../components/Preview/SortingReference";
import HalamanPerluPerhatianPhoto from "../../../../components/Preview/HalamanPerluPerhatianPhoto";
import HalamanGlosarium from "../../../../components/Preview/HalamanGlosarium";

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
  const [dataHalamanMesinPhotos, setDataHalamanMesinPhotos] = useState<any[]>(
    []
  );
  const [dataHalamanKakiKakiPhotos, setDataHalamanKakiKakiPhotos] = useState<
    any[]
  >([]);
  const [dataHalamanAlatPhotos, setDataHalamanAlatPhotos] = useState<any[]>([]);
  const [dataHalamanGeneralPhotos, setDataHalamanGeneralPhotos] = useState<
    any[]
  >([]);
  const [dataHalamanFotoDokumenPhotos, setDataHalamanFotoDokumenPhotos] =
    useState<any[]>([]);
  const [dataHalamanPerluPerhatianPhotos, setDataHalamanPerluPerhatianPhotos] =
    useState<any[]>([]);
  const [rawInspectionData, setRawInspectionData] = useState<any>(null);
  const [status, setStatus] = React.useState(true);

  const getData = async (id: string) => {
    const response = await dispatch(getDataForPreview(id)).unwrap();
    if (response) {
      setRawInspectionData(response); // Store the raw data
      preProcessData(response);
      getChangeData(id); // Call getChangeData after initial data is processed
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

    // Filter and sort fotoGeneral - only include photos with displayInPdf = true
    const fotoGeneralWajib = data?.photos?.filter(
      (photo: any) =>
        photo.category === "General Wajib" && photo.displayInPdf === true
    );
    const fotoGeneralTambahan = data?.photos?.filter(
      (photo: any) =>
        photo.category === "General Tambahan" && photo.displayInPdf === true
    );
    const fotoGeneralNewPath = data?.photos?.filter(
      (photo: any) =>
        photo.category === "general" && photo.displayInPdf === true
    );

    fotoGeneralWajib?.sort((a: any, b: any) => {
      const indexA = SortingGeneralData.indexOf(a.label);
      const indexB = SortingGeneralData.indexOf(b.label);
      return indexA - indexB;
    });

    fotoGeneralNewPath?.sort((a: any, b: any) => {
      const indexA = SortingGeneralData.indexOf(a.label);
      const indexB = SortingGeneralData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedFotoGeneral = [
      ...(fotoGeneralWajib || []),
      ...(fotoGeneralTambahan || []),
      ...(fotoGeneralNewPath || []),
    ];

    const fotoGeneralHalaman6 = sortedFotoGeneral.slice(0, 6);
    const fotoGeneralTambahanUntukGeneralPhoto = sortedFotoGeneral.slice(6);

    setDataHalaman6({
      toolsTest: data?.detailedAssessment?.toolsTest,
      fotoGeneral: fotoGeneralHalaman6,
    });

    const paginatedGeneralPhotos = [];
    for (let i = 0; i < fotoGeneralTambahanUntukGeneralPhoto.length; i += 9) {
      paginatedGeneralPhotos.push(
        fotoGeneralTambahanUntukGeneralPhoto.slice(i, i + 9)
      );
    }
    setDataHalamanGeneralPhotos(paginatedGeneralPhotos);

    // Filter exterior photos and sort them - only include photos with displayInPdf = true
    const exteriorWajibPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Eksterior Wajib" && photo.displayInPdf === true
    );
    const exteriorTambahanPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Eksterior Tambahan" && photo.displayInPdf === true
    );
    const exteriorNewPathPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "exterior" && photo.displayInPdf === true
    );

    exteriorWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingExteriorData.indexOf(a.label);
      const indexB = SortingExteriorData.indexOf(b.label);
      return indexA - indexB;
    });

    exteriorNewPathPhotos?.sort((a: any, b: any) => {
      const indexA = SortingExteriorData.indexOf(a.label);
      const indexB = SortingExteriorData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedExteriorPhotos = [
      ...(exteriorWajibPhotos || []),
      ...(exteriorTambahanPhotos || []),
      ...(exteriorNewPathPhotos || []),
    ];

    const paginatedExteriorPhotos = [];
    for (let i = 0; i < sortedExteriorPhotos.length; i += 9) {
      paginatedExteriorPhotos.push(sortedExteriorPhotos.slice(i, i + 9));
    }
    setDataHalamanExteriorPhotos(paginatedExteriorPhotos);

    // Filter interior photos and sort them - only include photos with displayInPdf = true
    const interiorWajibPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Interior Wajib" && photo.displayInPdf === true
    );
    const interiorTambahanPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Interior Tambahan" && photo.displayInPdf === true
    );
    const interiorNewPathPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "interior" && photo.displayInPdf === true
    );

    interiorWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingInteriorData.indexOf(a.label);
      const indexB = SortingInteriorData.indexOf(b.label);
      return indexA - indexB;
    });

    interiorNewPathPhotos?.sort((a: any, b: any) => {
      const indexA = SortingInteriorData.indexOf(a.label);
      const indexB = SortingInteriorData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedInteriorPhotos = [
      ...(interiorWajibPhotos || []),
      ...(interiorTambahanPhotos || []),
      ...(interiorNewPathPhotos || []),
    ];

    const paginatedInteriorPhotos = [];
    for (let i = 0; i < sortedInteriorPhotos.length; i += 9) {
      paginatedInteriorPhotos.push(sortedInteriorPhotos.slice(i, i + 9));
    }
    setDataHalamanInteriorPhotos(paginatedInteriorPhotos);

    // Filter Mesin photos and sort them - only include photos with displayInPdf = true
    const mesinWajibPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Mesin Wajib" && photo.displayInPdf === true
    );
    const mesinTambahanPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Mesin Tambahan" && photo.displayInPdf === true
    );
    const mesinNewPathPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "engine" && photo.displayInPdf === true
    );

    mesinNewPathPhotos?.sort((a: any, b: any) => {
      const indexA = SortingMesinData.indexOf(a.label);
      const indexB = SortingMesinData.indexOf(b.label);
      return indexA - indexB;
    });

    mesinWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingMesinData.indexOf(a.label);
      const indexB = SortingMesinData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedMesinPhotos = [
      ...(mesinWajibPhotos || []),
      ...(mesinTambahanPhotos || []),
      ...(mesinNewPathPhotos || []),
    ];

    const paginatedMesinPhotos = [];
    for (let i = 0; i < sortedMesinPhotos.length; i += 9) {
      paginatedMesinPhotos.push(sortedMesinPhotos.slice(i, i + 9));
    }
    setDataHalamanMesinPhotos(paginatedMesinPhotos);

    // Filter KakiKaki photos and sort them - only include photos with displayInPdf = true
    const kakiKakiWajibPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Kaki-kaki Tambahan" && photo.displayInPdf === true
    );
    const kakiKakiTambahanPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "KakiKaki Tambahan" && photo.displayInPdf === true
    );
    const kakiKakiNewPathPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "chassis" && photo.displayInPdf === true
    );

    kakiKakiWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingKakiKakiData.indexOf(a.label);
      const indexB = SortingKakiKakiData.indexOf(b.label);
      return indexA - indexB;
    });

    kakiKakiNewPathPhotos?.sort((a: any, b: any) => {
      const indexA = SortingKakiKakiData.indexOf(a.label);
      const indexB = SortingKakiKakiData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedKakiKakiPhotos = [
      ...(kakiKakiWajibPhotos || []),
      ...(kakiKakiTambahanPhotos || []),
      ...(kakiKakiNewPathPhotos || []),
    ];

    const paginatedKakiKakiPhotos = [];
    for (let i = 0; i < sortedKakiKakiPhotos.length; i += 9) {
      paginatedKakiKakiPhotos.push(sortedKakiKakiPhotos.slice(i, i + 9));
    }
    setDataHalamanKakiKakiPhotos(paginatedKakiKakiPhotos);

    // Filter AlatAlat photos and sort them - only include photos with displayInPdf = true
    const alatAlatWajibPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Alat-alat Wajib" && photo.displayInPdf === true
    );
    const alatAlatTambahanPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Alat-alat Tambahan" && photo.displayInPdf === true
    );
    const alatAlatNewPathPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "tools" && photo.displayInPdf === true
    );

    alatAlatWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingAlatAlatData.indexOf(a.label);
      const indexB = SortingAlatAlatData.indexOf(b.label);
      return indexA - indexB;
    });

    alatAlatNewPathPhotos?.sort((a: any, b: any) => {
      const indexA = SortingAlatAlatData.indexOf(a.label);
      const indexB = SortingAlatAlatData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedAlatAlatPhotos = [
      ...(alatAlatWajibPhotos || []),
      ...(alatAlatTambahanPhotos || []),
      ...(alatAlatNewPathPhotos || []),
    ];

    const paginatedAlatAlatPhotos = [];
    for (let i = 0; i < sortedAlatAlatPhotos.length; i += 9) {
      paginatedAlatAlatPhotos.push(sortedAlatAlatPhotos.slice(i, i + 9));
    }
    setDataHalamanAlatPhotos(paginatedAlatAlatPhotos);

    setDataHalaman7({
      bodyPaintThickness: data?.bodyPaintThickness,
    });
    setDataHalaman8({
      bodyPaintThickness: data?.bodyPaintThickness,
    });

    // Filter Foto Dokumen photos - only include photos with displayInPdf = true
    const fotoDokumenPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "Foto Dokumen" && photo.displayInPdf === true
    );
    const newPathFotoDokumenPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.category === "document" && photo.displayInPdf === true
    );

    const combinedFotoDokumenPhotos = [
      ...(fotoDokumenPhotos || []),
      ...(newPathFotoDokumenPhotos || []),
    ];

    const paginatedFotoDokumenPhotos = [];
    for (let i = 0; i < (combinedFotoDokumenPhotos || []).length; i += 2) {
      paginatedFotoDokumenPhotos.push(
        combinedFotoDokumenPhotos.slice(i, i + 2)
      );
    }
    setDataHalamanFotoDokumenPhotos(paginatedFotoDokumenPhotos);

    // Filter photos where needAtention is true and displayInPdf is true
    const perluPerhatianPhotos = data?.photos?.filter(
      (photo: any) =>
        photo.needAttention === true && photo.displayInPdf === true
    );

    const paginatedPerluPerhatianPhotos = [];
    for (let i = 0; i < (perluPerhatianPhotos || []).length; i += 9) {
      paginatedPerluPerhatianPhotos.push(perluPerhatianPhotos.slice(i, i + 9));
    }
    setDataHalamanPerluPerhatianPhotos(paginatedPerluPerhatianPhotos);
  };

  const getChangeData = (id: string) => {
    if (!id || id === "review") return;

    dispatch(getDataEdited(id))
      .unwrap()
      .then((res) => {
        if (res) {
          updateData(res);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch edited data:", error);
      })
      .finally(() => {
        setStatus(false);
      });
  };

  const updateData = (editedItems: any[]) => {
    setRawInspectionData((prevRawData: any) => {
      if (!prevRawData) return prevRawData;

      let updatedData = { ...prevRawData };

      editedItems.forEach((item: any) => {
        const {
          inspectionId,
          fieldName,
          subFieldName,
          subsubfieldname,
          oldValue,
        } = item;
        let { newValue } = item;

        if (subsubfieldname) {
          updatedData = {
            ...updatedData,
            [fieldName]: {
              ...(updatedData[fieldName] || {}),
              [subFieldName]: {
                ...(updatedData[fieldName]?.[subFieldName] || {}),
                [subsubfieldname]: newValue,
              },
            },
          };
        } else if (subFieldName) {
          if (subFieldName === "estimasiPerbaikan") {
            // Handle special case for estimasiPerbaikan
            if (typeof newValue === "string") {
              try {
                const parsedValue = JSON.parse(newValue);
                if (Array.isArray(parsedValue)) {
                  newValue = parsedValue;
                }
              } catch (error) {
                // Not JSON or not an array, keep as string
              }
            }
          }

          updatedData = {
            ...updatedData,
            [fieldName]: {
              ...(updatedData[fieldName] || {}),
              [subFieldName]: newValue,
            },
          };
        } else {
          updatedData = {
            ...updatedData,
            [fieldName]: newValue,
          };
        }
      });
      preProcessData(updatedData); // Re-process data after update
      return updatedData;
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
    // Dynamically add HalamanGeneralPhoto pages
    ...dataHalamanGeneralPhotos.map((photosChunk, index) => ({
      id: 7 + index, // Adjust ID based on previous pages
      title: `Foto General - Bagian ${index + 1}`,
      component: (
        <HalamanGeneralPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    // Dynamically add HalamanExteriorPhoto pages
    ...dataHalamanExteriorPhotos.map((photosChunk, index) => ({
      id: 7 + dataHalamanGeneralPhotos.length + index, // Adjust ID based on previous pages
      title: `Foto Eksterior - Bagian ${index + 1}`,
      component: (
        <HalamanExteriorPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    // Dynamically add HalamanInteriorPhoto pages
    ...dataHalamanInteriorPhotos.map((photosChunk, index) => ({
      id:
        7 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        index, // Adjust ID based on previous pages and new exterior photo pages
      title: `Foto Interior - Bagian ${index + 1}`,
      component: (
        <HalamanInteriorPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    // Dynamically add HalamanMesinPhoto pages
    ...dataHalamanMesinPhotos.map((photosChunk, index) => ({
      id:
        7 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        dataHalamanInteriorPhotos.length +
        index,
      title: `Foto Mesin - Bagian ${index + 1}`,
      component: (
        <HalamanMesinPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    // Dynamically add HalamanKakiKakiPhoto pages
    ...dataHalamanKakiKakiPhotos.map((photosChunk, index) => ({
      id:
        7 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        dataHalamanInteriorPhotos.length +
        dataHalamanMesinPhotos.length +
        index,
      title: `Foto Kaki-Kaki - Bagian ${index + 1}`,
      component: (
        <HalamanKakiKakiPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    // Dynamically add HalamanAlatAlatPhoto pages
    ...dataHalamanAlatPhotos.map((photosChunk, index) => ({
      id:
        7 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        dataHalamanInteriorPhotos.length +
        dataHalamanMesinPhotos.length +
        dataHalamanKakiKakiPhotos.length +
        index,
      title: `Foto Alat-Alat - Bagian ${index + 1}`,
      component: (
        <HalamanAlatAlatPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    // Dynamically add HalamanFotoDokumen pages
    ...dataHalamanFotoDokumenPhotos.map((photosChunk, index) => ({
      id:
        7 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        dataHalamanInteriorPhotos.length +
        dataHalamanMesinPhotos.length +
        dataHalamanKakiKakiPhotos.length +
        dataHalamanAlatPhotos.length +
        index,
      title: `Foto Dokumen - Bagian ${index + 1}`,
      component: (
        <HalamanFotoDokumen data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    {
      id:
        7 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        dataHalamanInteriorPhotos.length +
        dataHalamanMesinPhotos.length +
        dataHalamanKakiKakiPhotos.length +
        dataHalamanAlatPhotos.length +
        dataHalamanFotoDokumenPhotos.length,
      title: "Halaman 7",
      component: <Halaman7 data={dataHalaman7} editable={false} />,
    },
    {
      id:
        8 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        dataHalamanInteriorPhotos.length +
        dataHalamanMesinPhotos.length +
        dataHalamanKakiKakiPhotos.length +
        dataHalamanAlatPhotos.length +
        dataHalamanFotoDokumenPhotos.length,
      title: "Halaman 8",
      component: <Halaman8 data={dataHalaman8} editable={false} />,
    },
    ...dataHalamanPerluPerhatianPhotos.map((photosChunk, index) => ({
      id:
        9 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        dataHalamanInteriorPhotos.length +
        dataHalamanMesinPhotos.length +
        dataHalamanKakiKakiPhotos.length +
        dataHalamanAlatPhotos.length +
        dataHalamanFotoDokumenPhotos.length +
        index,
      title: `Perlu Perhatian - Bagian ${index + 1}`,
      description: `Dokumentasi foto perlu perhatian bagian ${index + 1}`,
      component: (
        <HalamanPerluPerhatianPhoto
          data={{ photos: photosChunk }}
          editable={false}
        />
      ),
    })),
    {
      id:
        9 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        dataHalamanInteriorPhotos.length +
        dataHalamanMesinPhotos.length +
        dataHalamanKakiKakiPhotos.length +
        dataHalamanAlatPhotos.length +
        dataHalamanFotoDokumenPhotos.length +
        dataHalamanPerluPerhatianPhotos.length,
      title: "Glosarium",
      component: <HalamanGlosarium />,
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
          <IoArrowBack /> Kembali
        </Button>
      </div>
      <div className="absolute top-5 right-5 no-print">
        <Button
          onClick={() => {
            window.print();
          }}
          className="bg-orange-600 text-white hover:bg-orange-700"
        >
          <IoMdDownload /> Unduh Pratinjau
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
