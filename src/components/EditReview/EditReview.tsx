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
import { useTheme } from "@/contexts/ThemeContext";

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
  const [currentPage, setCurrentPage] = useState(1);
  const { isDarkModeEnabled } = useTheme();

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
        <Halaman6 data={dataHalaman6} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 7,
      title: "Ketebalan Cat - Part 1",
      description: "Pengukuran ketebalan cat bagian pertama",
      component: (
        <Halaman7 data={dataHalaman7} editable={true} onClick={onClick} />
      ),
    },
    {
      id: 8,
      title: "Ketebalan Cat - Part 2",
      description: "Pengukuran ketebalan cat bagian kedua",
      component: (
        <Halaman8 data={dataHalaman8} editable={true} onClick={onClick} />
      ),
    },
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
          <div className="flex overflow-x-auto">
            {pages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => goToPage(page.id)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
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
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {page.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 hidden lg:block">
                      {page.description}
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
            <div className="flex items-center justify-between">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md transition-colors duration-200 ${
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

              {/* Page Progress */}
              <div className="flex items-center space-x-2">
                {pages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index + 1 === currentPage
                        ? "bg-blue-500 dark:bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === pages.length}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md transition-colors duration-200 ${
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
