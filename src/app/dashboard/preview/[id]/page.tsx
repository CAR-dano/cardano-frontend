"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
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
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showSearch, setShowSearch] = useState(false);

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

  // Enhanced print function with white background
  const handlePrint = () => {
    // Show instructions for optimal white background printing
    const printInstructions = `
Untuk hasil print dengan background putih bersih:

1. Background akan otomatis putih saat print
2. Semua konten dan warna tetap terlihat jelas
3. Tidak perlu mengaktifkan "Background graphics"
4. Hemat tinta dengan background putih

Print sekarang?
    `;

    if (confirm(printInstructions.trim())) {
      // Ensure white background for printing
      document.body.style.setProperty("background", "white", "important");

      // Add print class for white background
      document.documentElement.classList.add("printing");

      // Trigger print
      setTimeout(() => {
        window.print();

        // Clean up after print dialog closes
        setTimeout(() => {
          document.documentElement.classList.remove("printing");
        }, 1000);
      }, 100);
    }
  };

  // Function to scroll to specific section with enhanced animations
  const scrollToSection = (index: number) => {
    const element = sectionRefs.current[index];
    if (element) {
      setIsScrolling(true);
      setActiveSection(index);

      // Add highlight effect to target section
      element.classList.add("section-highlight");
      setTimeout(() => {
        element.classList.remove("section-highlight");
      }, 1000);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  // Zoom controls
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  // Intersection Observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -70% 0px",
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Function to set ref for each section
  const setSectionRef = (index: number) => (ref: HTMLDivElement | null) => {
    sectionRefs.current[index] = ref;
  };

  const getData = async (id: string) => {
    setIsLoading(true);
    setLoadingProgress(10);

    try {
      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 20;
        });
      }, 200);

      const response = await dispatch(getDataForPreview(id)).unwrap();
      setLoadingProgress(95);

      if (response) {
        setRawInspectionData(response); // Store the raw data
        preProcessData(response);
        setLoadingProgress(100);

        // Smooth transition out of loading state
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

        getChangeData(id); // Call getChangeData after initial data is processed
      } else {
        console.error("Failed to fetch data");
        setIsLoading(false);
      }

      clearInterval(progressInterval);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id) {
      getData(id);
    }

    // Check if mobile and adjust sidebar visibility
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarVisible(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const getImageTampakDepan = (data: any) => {
    // find in data.photos with displayInPdf filter
    const photo = data?.photos?.find(
      (item: any) => item.label === "Tampak Depan" && item.displayInPdf === true
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

    fotoGeneralWajib?.sort((a: any, b: any) => {
      const indexA = SortingGeneralData.indexOf(a.label);
      const indexB = SortingGeneralData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedFotoGeneral = [
      ...(fotoGeneralWajib || []),
      ...(fotoGeneralTambahan || []),
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

    exteriorWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingExteriorData.indexOf(a.label);
      const indexB = SortingExteriorData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedExteriorPhotos = [
      ...(exteriorWajibPhotos || []),
      ...(exteriorTambahanPhotos || []),
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

    interiorWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingInteriorData.indexOf(a.label);
      const indexB = SortingInteriorData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedInteriorPhotos = [
      ...(interiorWajibPhotos || []),
      ...(interiorTambahanPhotos || []),
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

    mesinWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingMesinData.indexOf(a.label);
      const indexB = SortingMesinData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedMesinPhotos = [
      ...(mesinWajibPhotos || []),
      ...(mesinTambahanPhotos || []),
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

    kakiKakiWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingKakiKakiData.indexOf(a.label);
      const indexB = SortingKakiKakiData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedKakiKakiPhotos = [
      ...(kakiKakiWajibPhotos || []),
      ...(kakiKakiTambahanPhotos || []),
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

    alatAlatWajibPhotos?.sort((a: any, b: any) => {
      const indexA = SortingAlatAlatData.indexOf(a.label);
      const indexB = SortingAlatAlatData.indexOf(b.label);
      return indexA - indexB;
    });

    const sortedAlatAlatPhotos = [
      ...(alatAlatWajibPhotos || []),
      ...(alatAlatTambahanPhotos || []),
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

    const paginatedFotoDokumenPhotos = [];
    for (let i = 0; i < (fotoDokumenPhotos || []).length; i += 2) {
      paginatedFotoDokumenPhotos.push(fotoDokumenPhotos.slice(i, i + 2));
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
      section: "Informasi Umum",
      component: <Halaman1 data={dataHalaman1} editable={false} />,
    },
    {
      id: 2,
      title: "Halaman 2",
      section: "Ringkasan Inspeksi",
      component: <Halaman2 data={dataHalaman2} editable={false} />,
    },
    {
      id: 3,
      title: "Halaman 3",
      section: "Detail Inspeksi",
      component: <Halaman3 data={dataHalaman3} editable={false} />,
    },
    {
      id: 4,
      title: "Halaman 4",
      section: "Detail Inspeksi",
      component: <Halaman4 data={dataHalaman4} editable={false} />,
    },
    {
      id: 5,
      title: "Halaman 5",
      section: "Detail Inspeksi",
      component: <Halaman5 data={dataHalaman5} editable={false} />,
    },
    {
      id: 6,
      title: "Halaman 6",
      section: "Foto General",
      component: <Halaman6 data={dataHalaman6} editable={false} />,
    },
    // Dynamically add HalamanGeneralPhoto pages
    ...dataHalamanGeneralPhotos.map((photosChunk, index) => ({
      id: 7 + index, // Adjust ID based on previous pages
      title: `Foto General - Part ${index + 1}`,
      section: "Foto General",
      component: (
        <HalamanGeneralPhoto data={{ photos: photosChunk }} editable={false} />
      ),
    })),
    // Dynamically add HalamanExteriorPhoto pages
    ...dataHalamanExteriorPhotos.map((photosChunk, index) => ({
      id: 7 + dataHalamanGeneralPhotos.length + index, // Adjust ID based on previous pages
      title: `Foto Eksterior - Part ${index + 1}`,
      section: "Foto Eksterior",
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
      title: `Foto Interior - Part ${index + 1}`,
      section: "Foto Interior",
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
      title: `Foto Mesin - Part ${index + 1}`,
      section: "Foto Mesin",
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
      title: `Foto Kaki-Kaki - Part ${index + 1}`,
      section: "Foto Kaki-Kaki",
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
      title: `Foto Alat-Alat - Part ${index + 1}`,
      section: "Foto Alat-Alat",
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
      title: `Foto Dokumen - Part ${index + 1}`,
      section: "Foto Dokumen",
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
      section: "Ketebalan Cat",
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
      section: "Ketebalan Cat",
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
      title: `Perlu Perhatian - Part ${index + 1}`,
      section: "Perlu Perhatian",
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
      section: "Glosarium",
      component: <HalamanGlosarium />,
    },
  ];

  // Filtered sections based on search
  const filteredSections = useMemo(() => {
    if (!searchTerm) return page;

    return page.filter((section) => {
      const sectionName = section.title || `Section ${section.id}`;
      const sectionGroup = section.section || "";
      return (
        sectionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sectionGroup.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [page, searchTerm]);

  // Group pages by section
  const groupedSections = page.reduce((acc: { [key: string]: any[] }, item) => {
    const section = item.section;
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {});

  // Create navigation items based on sections
  const navigationItems = Object.keys(groupedSections).map((sectionName) => ({
    sectionName,
    pages: groupedSections[sectionName],
  }));

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle sidebar with Ctrl+B (or Cmd+B on Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        setIsSidebarVisible(!isSidebarVisible);
      }

      // Navigate sections with arrow keys when focused
      if (e.target === document.body) {
        if (e.key === "ArrowUp" && activeSection > 0) {
          e.preventDefault();
          scrollToSection(activeSection - 1);
        } else if (e.key === "ArrowDown" && activeSection < page.length - 1) {
          e.preventDefault();
          scrollToSection(activeSection + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isSidebarVisible, activeSection, page.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-gray-600">
              Loading... {Math.round(loadingProgress)}%
            </p>
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && isSidebarVisible && (
        <div
          className="sidebar-overlay no-print"
          onClick={() => setIsSidebarVisible(false)}
        />
      )}

      {/* Toggle Button when sidebar is closed */}
      {!isSidebarVisible && (
        <button
          onClick={() => setIsSidebarVisible(true)}
          className="fixed left-3 top-3 w-10 h-10 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200 flex items-center justify-center z-50 no-print opacity-80 hover:opacity-100"
          title="Tampilkan navigasi (Ctrl+B)"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}

      {/* Navigation Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 shadow-lg border-r z-40 overflow-y-auto no-print sidebar-navigation transition-all duration-300 bg-white border-gray-200 ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Toggle Button attached to sidebar */}
        {isSidebarVisible && (
          <button
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
            className="absolute -right-10 top-4 w-10 h-10 bg-gray-700 text-white rounded-r-lg shadow-md hover:bg-gray-600 transition-all duration-200 flex items-center justify-center z-10 opacity-80 hover:opacity-100"
            title="Sembunyikan navigasi (Ctrl+B)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}

        <div className="p-4">
          <div className="flex items-center justify-between mb-4 border-b pb-3 border-gray-200">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Navigasi Laporan
              </h3>
              <div className="text-xs mt-1 text-gray-500">
                Section {activeSection + 1} dari {page.length}
              </div>
            </div>
            <button
              onClick={() => setIsSidebarVisible(false)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Tutup navigasi"
              title="Tutup navigasi (Ctrl+B)"
            >
              ×
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari section..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-8 transition-colors bg-white border-gray-200 text-gray-900 placeholder-gray-500"
              />
              <div className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-2.5 w-4 h-4 text-gray-400 hover:text-gray-600"
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            {searchTerm && (
              <div className="mt-2 text-xs text-gray-500">
                Ditemukan {filteredSections.length} dari {page.length} section
              </div>
            )}
          </div>

          {/* Zoom Controls */}
          <div className="mb-4 p-3 rounded-lg bg-gray-50">
            <div className="text-xs font-medium mb-2 text-gray-700">
              Zoom Level: {zoomLevel}%
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 50}
                className="flex-1 px-2 py-1.5 text-xs border rounded hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
              >
                <span className="text-lg">−</span>
              </button>
              <button
                onClick={handleZoomReset}
                className="flex-1 px-2 py-1.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
              >
                Reset
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 200}
                className="flex-1 px-2 py-1.5 text-xs border rounded hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
              >
                <span className="text-lg">+</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-4 space-y-2">
            <Button
              onClick={() => {
                window.history.back();
              }}
              className="w-full bg-blue-500 text-white hover:bg-blue-700 shadow-md"
              title="Kembali ke halaman sebelumnya"
            >
              <IoArrowBack className="mr-2" /> Back
            </Button>
            <Button
              onClick={handlePrint}
              className="w-full bg-orange-600 text-white hover:bg-orange-700 shadow-md"
              title="Download/Print Preview dengan warna yang akurat"
            >
              <IoMdDownload className="mr-2" /> Download Preview
            </Button>
          </div>

          {/* Progress Bar - Simplified */}
          <div className="mb-4">
            <div className="w-full rounded-full h-1.5 bg-gray-200">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: `${((activeSection + 1) / page.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="text-xs text-center mt-1 text-gray-500">
              {activeSection + 1} / {page.length}
            </div>
          </div>

          <div className="space-y-1">
            {searchTerm ? (
              // Search Results
              <div className="mb-4">
                <div className="font-semibold text-gray-800 text-sm mb-2 px-2 py-1 bg-yellow-50 rounded-md flex items-center justify-between">
                  <span>🔍 Hasil Pencarian</span>
                  <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded">
                    {filteredSections.length}
                  </span>
                </div>
                <div className="space-y-1 ml-2">
                  {filteredSections.map((pageItem) => {
                    const globalIndex = page.findIndex(
                      (p) => p.id === pageItem.id
                    );
                    const isActive = activeSection === globalIndex;
                    const isHovered = hoveredSection === globalIndex;

                    return (
                      <div key={pageItem.id} className="relative">
                        <button
                          onClick={() => {
                            scrollToSection(globalIndex);
                            if (isMobile) {
                              setIsSidebarVisible(false);
                            }
                          }}
                          onMouseEnter={() => setHoveredSection(globalIndex)}
                          onMouseLeave={() => setHoveredSection(null)}
                          className={`nav-button w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-300 flex items-center justify-between group ${
                            isActive
                              ? "bg-blue-100 text-blue-700 font-medium shadow-sm active scale-105"
                              : isHovered
                              ? "bg-blue-50 text-blue-600 shadow-sm transform scale-102"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm"
                          } ${isScrolling && isActive ? "animate-pulse" : ""}`}
                          title={`Pergi ke ${pageItem.title}`}
                        >
                          <span className="block truncate flex items-center">
                            {isActive && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                            )}
                            <div className="flex flex-col items-start">
                              <span className="text-sm">{pageItem.title}</span>
                              <span className="text-xs text-gray-400">
                                {pageItem.section}
                              </span>
                            </div>
                          </span>
                          <span
                            className={`text-xs ml-2 transition-all duration-200 ${
                              isActive
                                ? "text-blue-500 font-semibold"
                                : "opacity-50 group-hover:opacity-100"
                            }`}
                          >
                            {globalIndex + 1}
                          </span>
                        </button>

                        {/* Hover Tooltip Preview */}
                        {isHovered && !isMobile && (
                          <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap pointer-events-none animate-fadeIn">
                            <div className="text-sm font-medium">
                              {pageItem.title}
                            </div>
                            <div className="text-xs text-gray-300">
                              Section {pageItem.section}
                            </div>
                            <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Normal Navigation
              navigationItems.map((section, sectionIndex) => (
                <div key={section.sectionName} className="mb-4">
                  <div className="font-semibold text-gray-800 text-sm mb-2 px-2 py-1 bg-gray-50 rounded-md flex items-center justify-between">
                    <span>{section.sectionName}</span>
                    <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded">
                      {section.pages.length}
                    </span>
                  </div>
                  <div className="space-y-1 ml-2">
                    {section.pages.map((pageItem, pageIndex) => {
                      const globalIndex = page.findIndex(
                        (p) => p.id === pageItem.id
                      );
                      const isActive = activeSection === globalIndex;
                      const isHovered = hoveredSection === globalIndex;

                      return (
                        <div key={pageItem.id} className="relative">
                          <button
                            onClick={() => {
                              scrollToSection(globalIndex);
                              // Close sidebar on mobile after navigation
                              if (isMobile) {
                                setIsSidebarVisible(false);
                              }
                            }}
                            onMouseEnter={() => setHoveredSection(globalIndex)}
                            onMouseLeave={() => setHoveredSection(null)}
                            className={`nav-button w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-300 flex items-center justify-between group ${
                              isActive
                                ? "bg-blue-100 text-blue-700 font-medium shadow-sm active scale-105"
                                : isHovered
                                ? "bg-blue-50 text-blue-600 shadow-sm transform scale-102"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 hover:shadow-sm"
                            } ${
                              isScrolling && isActive ? "animate-pulse" : ""
                            }`}
                            title={`Pergi ke ${pageItem.title}`}
                          >
                            <span className="block truncate flex items-center">
                              {isActive && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                              )}
                              {pageItem.title}
                            </span>
                            <span
                              className={`text-xs ml-2 transition-all duration-200 ${
                                isActive
                                  ? "text-blue-500 font-semibold"
                                  : "opacity-50 group-hover:opacity-100"
                              }`}
                            >
                              {globalIndex + 1}
                            </span>
                          </button>

                          {/* Hover Tooltip Preview */}
                          {isHovered && !isMobile && (
                            <div className="absolute left-full ml-2 top-0 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg z-50 whitespace-nowrap pointer-events-none animate-fadeIn">
                              <div className="text-sm font-medium">
                                {pageItem.title}
                              </div>
                              <div className="text-xs text-gray-300">
                                Section {section.sectionName}
                              </div>
                              <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarVisible && !isMobile ? "main-content-with-sidebar" : "ml-0"
        }`}
      >
        <div
          className="sheet-outer A4"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "top center",
            transition: "transform 0.3s ease",
          }}
        >
          {page.map((item, index) => {
            const isActiveSection = index === activeSection;
            const isVisible = Math.abs(index - activeSection) <= 2; // Only render sections near active one for performance

            return (
              <div
                key={index}
                ref={setSectionRef(index)}
                className={`sheet padding-5mm transition-all duration-500 ${
                  isActiveSection
                    ? "scale-100 opacity-100"
                    : "scale-98 opacity-90"
                } ${isVisible ? "block" : "block"}`}
                id={`section-${index}`}
                style={{
                  transform: isActiveSection
                    ? "translateY(0)"
                    : "translateY(10px)",
                  boxShadow: isActiveSection
                    ? "0 20px 40px rgba(0, 0, 0, 0.1)"
                    : "0 8px 20px rgba(0, 0, 0, 0.05)",
                }}
              >
                {/* Section Label */}
                <div
                  className={`absolute top-2 left-2 z-10 transition-all duration-300 no-print ${
                    isActiveSection ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg">
                    {index + 1}
                  </span>
                </div>

                {item.component}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DataPage;
