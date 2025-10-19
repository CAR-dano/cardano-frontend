"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import Halaman1 from "../../components/Preview/Halaman1";
import Halaman2 from "../../components/Preview/Halaman2";
import Halaman3 from "../../components/Preview/Halaman3";
import Halaman4 from "../../components/Preview/Halaman4";
import Halaman5 from "../../components/Preview/Halaman5";
import Halaman6 from "../../components/Preview/Halaman6";
import Halaman8 from "../Preview/Halaman8";
import Halaman7 from "../Preview/Halaman7";
import HalamanExteriorPhoto from "../Preview/HalamanExteriorPhoto";
import HalamanInteriorPhoto from "../Preview/HalamanInteriorPhoto";
import HalamanMesinPhoto from "../Preview/HalamanMesinPhoto";
import HalamanKakiKakiPhoto from "../Preview/HalamanKakiKakiPhoto";
import HalamanAlatAlatPhoto from "../Preview/HalamanAlatAlatPhoto";
import HalamanGeneralPhoto from "../Preview/HalamanGeneralPhoto";
import HalamanFotoDokumen from "../Preview/HalamanFotoDokumen";
import HalamanPerluPerhatianPhoto from "../Preview/HalamanPerluPerhatianPhoto";
import {
  SortingGeneralData,
  SortingExteriorData,
  SortingInteriorData,
  SortingMesinData,
  SortingKakiKakiData,
  SortingAlatAlatData,
} from "../Preview/SortingReference";
import { useTheme } from "../../contexts/ThemeContext";
import { useToast } from "../../hooks/use-toast";
import apiClient from "@/lib/services/apiClient";

interface EditReviewComponentsProps {
  onClick: (data: any) => void;
  data: any;
  inspectionId?: string; // Add inspectionId prop
}

const EditReviewComponents: React.FC<EditReviewComponentsProps> = ({
  onClick: parentOnClick, // Renamed to avoid conflict with local onClick logic
  data,
  inspectionId = "",
}) => {
  const [dataHalaman1, setDataHalaman1] = useState<any>(null);
  const { toast } = useToast();

  const onClick = async (actionData: any) => {
    if (actionData.type === "add_new_photo") {
      const { file, needAttention, label, category } = actionData;

      const metadata = [
        {
          needAttention: needAttention || false,
          // Default to false if not provided
          label: label || "",
          category: category || "General Wajib", // Default to "General Wajib" if not provided
        },
      ];

      const formData = new FormData();
      formData.append("metadata", JSON.stringify(metadata));
      formData.append("photos", file); // 'photos' is the field name for the file

      try {
        const response = await apiClient.post(
          `${process.env.NEXT_PUBLIC_API_URL}/inspections/${inspectionId}/photos/multiple`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (!response) {
          throw new Error("Failed to upload photo");
        }
        //       // Add authorization header if needed
        //       // 'Authorization': `Bearer ${yourAuthToken}`,
        //     },
        //     body: formData,
        //   }
        // );

        const result = await response.data;
        toast({
          title: "Success",
          description: "Photo uploaded successfully.",
          variant: "default",
        });
        // Optionally, you might want to refetch data or update state here
        // to show the newly added photo.
        parentOnClick?.({ type: "photo_added", newPhotoData: result }); // Notify parent of new photo
      } catch (error) {
        console.error("Error uploading photo:", error);
        toast({
          title: "Error",
          description: "Failed to upload photo. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      parentOnClick?.(actionData); // Pass other actions to the original onClick
    }
  };
  const [dataHalaman2, setDataHalaman2] = useState<any>(null);
  const [dataHalaman3, setDataHalaman3] = useState<any>(null);
  const [dataHalaman4, setDataHalaman4] = useState<any>(null);
  const [dataHalaman5, setDataHalaman5] = useState<any>(null);
  const [dataHalaman6, setDataHalaman6] = useState<any>(null);
  const [dataHalaman7, setDataHalaman7] = useState<any>(null);
  const [dataHalaman8, setDataHalaman8] = useState<any>(null);
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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (data) {
      preProcessData(data);
    }
  }, [data]);

  const getImageTampakDepan = (data: any) => {
    const photo = data?.photos?.find(
      (item: any) => item.label === "Tampak Depan"
    );
    return photo ? photo : "";
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
      id: data?.id,
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

    // Filter and sort fotoGeneral
    const fotoGeneralWajib = data?.photos?.filter(
      (photo: any) => photo.category === "General Wajib"
    );
    const fotoGeneralTambahan = data?.photos?.filter(
      (photo: any) => photo.category === "General Tambahan"
    );
    const fotoGeneralNewPath = data?.photos?.filter(
      (photo: any) => photo.category === "General"
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

    console.log("Sorted Foto General:", sortedFotoGeneral);

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
    // Tambahkan halaman kosong jika halaman terakhir penuh (9 foto) atau tidak ada halaman sama sekali
    if (
      paginatedGeneralPhotos.length === 0 ||
      paginatedGeneralPhotos[paginatedGeneralPhotos.length - 1].length === 9
    ) {
      paginatedGeneralPhotos.push([]);
    }
    setDataHalamanGeneralPhotos(paginatedGeneralPhotos);

    // Filter exterior photos and sort them
    const exteriorWajibPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Eksterior Wajib"
    );
    const exteriorTambahanPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Eksterior Tambahan"
    );
    const exteriorNewPathPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "exterior"
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
    // Tambahkan halaman kosong jika halaman terakhir penuh (9 foto) atau tidak ada halaman sama sekali
    if (
      paginatedExteriorPhotos.length === 0 ||
      paginatedExteriorPhotos[paginatedExteriorPhotos.length - 1].length === 9
    ) {
      paginatedExteriorPhotos.push([]);
    }
    setDataHalamanExteriorPhotos(paginatedExteriorPhotos);

    // Filter interior photos and sort them
    const interiorWajibPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Interior Wajib"
    );
    const interiorTambahanPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Interior Tambahan"
    );
    const interiorNewPathPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "interior"
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
    // Tambahkan halaman kosong jika halaman terakhir penuh (9 foto) atau tidak ada halaman sama sekali
    if (
      paginatedInteriorPhotos.length === 0 ||
      paginatedInteriorPhotos[paginatedInteriorPhotos.length - 1].length === 9
    ) {
      paginatedInteriorPhotos.push([]);
    }
    setDataHalamanInteriorPhotos(paginatedInteriorPhotos);

    // Filter Mesin photos and sort them
    const mesinWajibPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Mesin Wajib"
    );
    const mesinTambahanPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Mesin Tambahan"
    );
    const mesinNewPathPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "engine"
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
    // Tambahkan halaman kosong jika halaman terakhir penuh (9 foto) atau tidak ada halaman sama sekali
    if (
      paginatedMesinPhotos.length === 0 ||
      paginatedMesinPhotos[paginatedMesinPhotos.length - 1].length === 9
    ) {
      paginatedMesinPhotos.push([]);
    }
    setDataHalamanMesinPhotos(paginatedMesinPhotos);

    // Filter KakiKaki photos and sort them
    const kakiKakiWajibPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Kaki-kaki Tambahan"
    );
    const kakiKakiTambahanPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "KakiKaki Tambahan"
    );
    const kakiKakiNewPathPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "chassis"
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
    // Tambahkan halaman kosong jika halaman terakhir penuh (9 foto) atau tidak ada halaman sama sekali
    if (
      paginatedKakiKakiPhotos.length === 0 ||
      paginatedKakiKakiPhotos[paginatedKakiKakiPhotos.length - 1].length === 9
    ) {
      paginatedKakiKakiPhotos.push([]);
    }
    setDataHalamanKakiKakiPhotos(paginatedKakiKakiPhotos);

    // Filter AlatAlat photos and sort them
    const alatAlatWajibPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Alat-alat Wajib"
    );
    const alatAlatTambahanPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Alat-alat Tambahan"
    );
    const alatAlatNewPathPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "tools"
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
    // Tambahkan halaman kosong jika halaman terakhir penuh (9 foto) atau tidak ada halaman sama sekali
    if (
      paginatedAlatAlatPhotos.length === 0 ||
      paginatedAlatAlatPhotos[paginatedAlatAlatPhotos.length - 1].length === 9
    ) {
      paginatedAlatAlatPhotos.push([]);
    }
    setDataHalamanAlatPhotos(paginatedAlatAlatPhotos);

    setDataHalaman7({
      bodyPaintThickness: data?.bodyPaintThickness,
    });
    setDataHalaman8({
      bodyPaintThickness: data?.bodyPaintThickness,
    });

    // Filter Foto Dokumen photos
    const fotoDokumenPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "Foto Dokumen"
    );
    const newPathFotoDokumenPhotos = data?.photos?.filter(
      (photo: any) => photo.category === "document"
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
    // Tambahkan halaman kosong jika halaman terakhir penuh (2 foto) atau tidak ada halaman sama sekali
    if (
      paginatedFotoDokumenPhotos.length === 0 ||
      paginatedFotoDokumenPhotos[paginatedFotoDokumenPhotos.length - 1]
        .length === 2
    ) {
      paginatedFotoDokumenPhotos.push([]);
    }
    setDataHalamanFotoDokumenPhotos(paginatedFotoDokumenPhotos);

    // Filter photos where needAtention is true
    const perluPerhatianPhotos = data?.photos?.filter(
      (photo: any) => photo.needAttention === true
    );

    const paginatedPerluPerhatianPhotos = [];
    for (let i = 0; i < (perluPerhatianPhotos || []).length; i += 9) {
      paginatedPerluPerhatianPhotos.push(perluPerhatianPhotos.slice(i, i + 9));
    }
    setDataHalamanPerluPerhatianPhotos(paginatedPerluPerhatianPhotos);
  };

  // Handler untuk update foto general di halaman 6
  const handlePhotoUpdate = (photoId: string, updateData: any) => {
    // Update foto di dataHalaman6
    setDataHalaman6((prev: any) => {
      if (!prev || !prev.fotoGeneral) return prev;

      const updatedFotoGeneral = prev.fotoGeneral.map((photo: any) => {
        if (photo.id === photoId) {
          return {
            ...photo,
            label: updateData.label,
            needAttention: updateData.needAttention,
            displayInPdf: updateData.displayInPdf,
            path: updateData.newPath || photo.path,
          };
        }
        return photo;
      });

      return {
        ...prev,
        fotoGeneral: updatedFotoGeneral,
      };
    });

    // Juga update data global jika diperlukan untuk sinkronisasi
    // dengan halaman lain yang menggunakan foto yang sama
    console.log("Photo updated:", photoId, updateData);
  };

  const pages = [
    {
      id: 1,
      title: "Data Kendaraan",
      description: "Informasi dasar kendaraan dan identitas customer",
      component: (
        <Halaman1 data={dataHalaman1} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 2,
      title: "Ringkasan Inspeksi",
      description: "Overview hasil inspeksi keseluruhan",
      component: (
        <Halaman2 data={dataHalaman2} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 3,
      title: "Fitur & Mesin",
      description: "Detail inspeksi fitur dan mesin kendaraan",
      component: (
        <Halaman3 data={dataHalaman3} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 4,
      title: "Interior & Eksterior",
      description: "Penilaian kondisi interior dan eksterior",
      component: (
        <Halaman4 data={dataHalaman4} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 5,
      title: "Ban & Test Drive",
      description: "Inspeksi ban, kaki-kaki, dan hasil test drive",
      component: (
        <Halaman5 data={dataHalaman5} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 6,
      title: "Tools Test & Foto",
      description: "Hasil tes tools dan dokumentasi foto",
      component: (
        <Halaman6
          data={dataHalaman6}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
          onPhotoUpdate={handlePhotoUpdate}
        />
      ),
    },
    // Dynamically add HalamanGeneralPhoto pages
    ...dataHalamanGeneralPhotos.map((photosChunk, index) => ({
      id: 7 + index, // Adjust ID based on previous pages
      title: `Foto General - Part ${index + 1}`,
      description: `Dokumentasi foto general bagian ${index + 1}`,
      component: (
        <HalamanGeneralPhoto
          data={{ photos: photosChunk }}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
        />
      ),
    })),
    // Dynamically add HalamanExteriorPhoto pages
    ...dataHalamanExteriorPhotos.map((photosChunk, index) => ({
      id: 7 + dataHalamanGeneralPhotos.length + index, // Adjust ID based on previous pages
      title: `Foto Eksterior - Part ${index + 1}`,
      description: `Dokumentasi foto eksterior bagian ${index + 1}`,
      component: (
        <HalamanExteriorPhoto
          data={{ photos: photosChunk }}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
        />
      ),
    })),
    // Dynamically add HalamanInteriorPhoto pages
    ...dataHalamanInteriorPhotos.map((photosChunk, index) => ({
      id:
        7 +
        dataHalamanGeneralPhotos.length +
        dataHalamanExteriorPhotos.length +
        index, // Adjust ID based on previous pages
      title: `Foto Interior - Part ${index + 1}`,
      description: `Dokumentasi foto interior bagian ${index + 1}`,
      component: (
        <HalamanInteriorPhoto
          data={{ photos: photosChunk }}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
        />
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
      title: `Foto Mesin - Part ${index + 1}`,
      description: `Dokumentasi foto mesin bagian ${index + 1}`,
      component: (
        <HalamanMesinPhoto
          data={{ photos: photosChunk }}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
        />
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
      title: `Foto Kaki-Kaki - Part ${index + 1}`,
      description: `Dokumentasi foto kaki-kaki bagian ${index + 1}`,
      component: (
        <HalamanKakiKakiPhoto
          data={{ photos: photosChunk }}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
        />
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
      title: `Foto Alat-Alat - Part ${index + 1}`,
      description: `Dokumentasi foto alat-alat bagian ${index + 1}`,
      component: (
        <HalamanAlatAlatPhoto
          data={{ photos: photosChunk }}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
        />
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
      title: `Foto Dokumen - Part ${index + 1}`,
      description: `Dokumentasi foto dokumen bagian ${index + 1}`,
      component: (
        <HalamanFotoDokumen
          data={{ photos: photosChunk }}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
        />
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
        dataHalamanFotoDokumenPhotos.length, // Adjust ID based on previous pages and new photo pages
      title: "Ketebalan Cat - Part 1",
      description: "Pengukuran ketebalan cat bagian pertama",
      component: (
        <Halaman7 data={dataHalaman7} editable={true} onClick={onClick} />
      ),
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
        dataHalamanFotoDokumenPhotos.length, // Adjust ID based on previous pages and new photo pages
      title: "Ketebalan Cat - Part 2",
      description: "Pengukuran ketebalan cat bagian kedua",
      component: (
        <Halaman8 data={dataHalaman8} editable={true} onClick={onClick} />
      ),
    },
    // Dynamically add HalamanPerluPerhatianPhoto pages
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
      title: `Perlu Perhatian - Part ${index + 1}`,
      description: `Dokumentasi foto perlu perhatian bagian ${index + 1}`,
      component: (
        <HalamanPerluPerhatianPhoto
          data={{ photos: photosChunk }}
          editable={true}
          onClick={onClick}
          inspectionId={inspectionId}
        />
      ),
    })),
  ];

  const nextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentPageData = pages[currentPage - 1];

  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Edit Review
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {currentPageData?.title} - {currentPageData?.description}
                </p>
              </div>
            </div>

            {/* Page Counter */}
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Halaman {currentPage} dari {pages.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => goToPage(page.id)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  currentPage === page.id
                    ? "border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      currentPage === page.id
                        ? "bg-blue-500 dark:bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {page.id}
                  </span>
                  <div className="text-left whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {page.title}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Page Content */}
          <div className="p-6">
            <div className="sheet-outer A4 font-poppins">
              <div className="sheet padding-5mm">
                {currentPageData?.component}
              </div>
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex-shrink-0 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md transition-colors duration-200 ${
                  currentPage === 1
                    ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                }`}
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Sebelumnya
              </button>

              {/* Page Progress - Hidden on small screens when many pages */}
              <div className="flex items-center space-x-2 overflow-hidden">
                {pages.length <= 15 ? (
                  pages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index + 1 === currentPage
                          ? "bg-blue-500 dark:bg-blue-600"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))
                ) : (
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {currentPage} / {pages.length}
                  </span>
                )}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === pages.length}
                className={`flex-shrink-0 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md transition-colors duration-200 ${
                  currentPage === pages.length
                    ? "text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                }`}
              >
                Selanjutnya
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReviewComponents;
