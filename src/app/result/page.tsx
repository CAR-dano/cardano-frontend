"use client";
import CardData from "../../components/ui/Card/CardData";
import SearchBar from "../../components/ui/SearchBar";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useState, useEffect } from "react";
import CardHasil from "../../components/ui/Card/CardHasil";
import Image from "next/image";
import CustomButton from "../../components/ui/CustomButton";
import MadeByCardano from "../../components/ui/MadeByCardano";
import { useDispatch, useSelector } from "react-redux";
import {
  searchByVehiclePlat,
  clearUnauthorizedState,
} from "../../lib/features/inspection/inspectionSlice";
import { AppDispatch, RootState } from "../../lib/store";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import Link from "next/link";
import { useLoginRedirect } from "../../hooks/useLoginRedirect";

function ResultPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { review, isLoading, error, isUnauthorized } = useSelector(
    (state: RootState) => state.inspection
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPlatNomor = searchParams.get("platNomor");
  const [platNomorInput, setPlatNomorInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [hasReSearchedAfterAuth, setHasReSearchedAfterAuth] = useState(false);
  const [wasUnauthorizedBeforeAuth, setWasUnauthorizedBeforeAuth] =
    useState(false);

  // Initial search effect - only runs once
  useEffect(() => {
    if (initialPlatNomor && !hasSearched) {
      setPlatNomorInput(initialPlatNomor);
      dispatch(searchByVehiclePlat(initialPlatNomor));
      setHasSearched(true);
    }
  }, [initialPlatNomor, hasSearched, dispatch]);

  // Track when we become unauthorized
  useEffect(() => {
    if (isUnauthorized) {
      setWasUnauthorizedBeforeAuth(true);
    }
  }, [isUnauthorized]);

  // Re-search when user becomes authenticated after being unauthorized
  useEffect(() => {
    // Only re-search if:
    // 1. User is authenticated
    // 2. We previously were in an unauthorized state
    // 3. We have a plate number
    // 4. Initial search was done
    // 5. We haven't already re-searched after auth
    if (
      isAuthenticated &&
      wasUnauthorizedBeforeAuth &&
      initialPlatNomor &&
      hasSearched &&
      !hasReSearchedAfterAuth
    ) {
      // Set flags first to prevent multiple calls
      setHasReSearchedAfterAuth(true);
      setWasUnauthorizedBeforeAuth(false);

      // Clear unauthorized state immediately to prevent re-triggering
      dispatch(clearUnauthorizedState());

      // Small delay to ensure auth header is set
      setTimeout(() => {
        dispatch(searchByVehiclePlat(initialPlatNomor));
      }, 100);
    }
  }, [
    isAuthenticated,
    wasUnauthorizedBeforeAuth,
    initialPlatNomor,
    hasSearched,
    hasReSearchedAfterAuth,
    dispatch,
  ]);

  // Reset flags when user logs out
  useEffect(() => {
    if (!isAuthenticated) {
      setHasReSearchedAfterAuth(false);
      setWasUnauthorizedBeforeAuth(false);
    }
  }, [isAuthenticated]);

  function formatPlatNomor(plat: string | null) {
    if (!plat) return "";
    return plat.replace(/([A-Z]+)(\d+)([A-Z]+)/, "$1 $2 $3");
  }

  function formatInspectionDate(dateString: string | undefined) {
    if (!dateString) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  const PDF_URL = process.env.NEXT_PUBLIC_PDF_URL;

  // Use the login redirect hook
  const handleLoginRedirect = useLoginRedirect();

  return (
    <div className="font-rubik w-full relative flex flex-col items-center px-4 lg:px-10 mb-20">
      {isLoading && <LoadingFullScreen />}
      <div className="w-full flex flex-col items-center mb-10">
        {/* <input
          type="text"
          value={platNomorInput}
          onChange={(e) => setPlatNomorInput(e.target.value)}
          placeholder="Enter Plate Number"
          className="border p-2 rounded mb-4 w-full max-w-md text-center"
        />
        <CustomButton
          onClick={handleSearch}
          className="text-[clamp(16px,3vw,28px)] font-white font-light rounded-full gradient-details text-white"
        >
          Search
        </CustomButton> */}
        <SearchBar value={platNomorInput} />
      </div>
      {error && !isUnauthorized && (
        <div className="text-red-500 mb-4">{error}</div>
      )}{" "}
      {review ? (
        <div className={`w-full ${isUnauthorized ? "relative" : ""}`}>
          {/* Blur overlay for unauthorized users */}
          {isUnauthorized && (
            <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex items-center justify-center">
              <div className="absolute top-0 bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 text-center border">
                {/* Premium badge */}
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold mb-4">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  KONTEN PREMIUM
                </div>
                {/* Lock icon */}
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Login untuk Akses Penuh
                </h3>
                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Data inspeksi untuk kendaraan ini tersedia! Login untuk
                  melihat detail lengkap laporan inspeksi, termasuk:
                </p>
                {/* Feature list */}
                <div className="text-left text-sm text-gray-700 mb-6 space-y-2">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Detail kondisi kendaraan lengkap
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Laporan PDF 19 halaman
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Foto-foto inspeksi detail
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Rating dan analisis komprehensif
                  </div>
                </div>{" "}
                {/* Login button */}
                <CustomButton
                  className="w-full text-base font-medium rounded-lg gradient-details text-white px-6 py-3 mb-3"
                  onClick={handleLoginRedirect}
                >
                  <div className="flex items-center justify-center">
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
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Login Sekarang
                  </div>
                </CustomButton>{" "}
                {/* Register link */}
                <p className="text-xs text-gray-500">
                  Belum punya akun?{" "}
                  <button
                    onClick={handleLoginRedirect}
                    className="text-orange-600 hover:text-orange-700 font-medium underline bg-transparent border-none cursor-pointer"
                  >
                    Daftar di sini
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Content with conditional blur */}
          <div className={isUnauthorized ? "blur-md pointer-events-none" : ""}>
            {/* Data kendaraan */}
            <div className="w-full flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-end text-neutral-900 font-light mb-2 lg:mb-5">
              <p className="text-[clamp(24px,3vw,36px)]">Data Kendaraan</p>
              <p className="text-[clamp(16px,3vw,24px)]">
                *Tanggal Inspeksi:
                <span className="text-[clamp(16px,3vw,24px)] font-medium">
                  {" "}
                  {formatInspectionDate(review?.inspectionDate)}
                </span>
              </p>
            </div>

            {/* Card Data Kendaraan */}
            <CardData
              platNomor={formatPlatNomor(review?.vehiclePlateNumber)}
              data={review}
            />

            {/* Hasil Inspeksi */}
            <div className="w-full flex justify-between items-end text-neutral-900 font-light mt-10 mb-0 lg:mb-5">
              <p className="text-[clamp(32px,3vw,36px)]">Hasil Inspeksi</p>
            </div>

            {/* Card Hasil Inspeksi */}
            <CardHasil
              urlPdf={review.urlPdf}
              inspectionSummary={review.inspectionSummary}
              overallRating={review.overallRating}
            />

            {/* Download data */}
            <div className="w-full flex justify-center lg:justify-between items-end text-neutral-900 font-light mt-5 lg:mt-10 mb-5">
              <p className="hidden lg:block w-1/2 text-4xl">
                Unduh laporan inspeksi lengkap <br /> (PDF)
              </p>
              <div className="z-10 flex flex-wrap justify-start items-center gap-3 sm:gap-5 mt-4 sm:mt-5">
                <Image
                  src="/assets/logo/pdf.svg"
                  width={48}
                  height={48}
                  alt="PDF Icon"
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain"
                />
                <CustomButton className="text-[clamp(16px,3vw,28px)] font-white font-light rounded-full gradient-details text-white">
                  <a href={`${PDF_URL}${review.urlPdf}`} download>
                    Unduh Detail (PDF)
                  </a>
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      ) : initialPlatNomor && !isLoading && !isUnauthorized ? (
        <div className="w-full max-w-2xl mx-auto text-center mt-10 px-4">
          {/* Custom Car Illustration */}
          <div className="mb-8 relative">
            <div className="relative mx-auto w-64 h-40 mb-6">
              {/* Car Body */}
              <svg
                viewBox="0 0 256 160"
                className="w-full h-full text-gray-300"
                fill="currentColor"
              >
                {/* Car outline */}
                <path d="M50 120 L50 100 Q50 90 60 90 L90 90 L100 70 Q105 60 115 60 L140 60 Q150 60 155 70 L165 90 L195 90 Q205 90 205 100 L205 120 L220 120 Q230 120 230 130 L230 140 Q230 150 220 150 L200 150 Q190 150 190 140 L190 135 L65 135 L65 140 Q65 150 55 150 L35 150 Q25 150 25 140 L25 130 Q25 120 35 120 Z" />
                {/* Windows */}
                <rect
                  x="105"
                  y="70"
                  width="45"
                  height="15"
                  rx="2"
                  className="fill-blue-100"
                />
                {/* Wheels */}
                <circle cx="80" cy="135" r="12" className="fill-gray-400" />
                <circle cx="175" cy="135" r="12" className="fill-gray-400" />
                <circle cx="80" cy="135" r="6" className="fill-gray-600" />
                <circle cx="175" cy="135" r="6" className="fill-gray-600" />
                {/* Headlights */}
                <circle cx="210" cy="105" r="4" className="fill-yellow-200" />
                <circle cx="45" cy="105" r="4" className="fill-red-200" />
              </svg>

              {/* Question mark overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Kendaraan Tidak Ditemukan
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Data inspeksi untuk plat nomor{" "}
              <span className="font-semibold text-orange-600 px-2 py-1 bg-orange-50 rounded">
                {formatPlatNomor(initialPlatNomor)}
              </span>{" "}
              tidak ditemukan dalam sistem kami.
            </p>
          </div>

          {/* Suggestions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Saran Pencarian
            </h4>
            <ul className="text-blue-800 text-sm space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Pastikan format plat nomor sudah benar (contoh: B1234XYZ)
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Periksa kembali ejaan huruf dan angka pada plat nomor
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Kendaraan mungkin belum pernah diinspeksi dalam sistem kami
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                // Reset search and focus input
                setPlatNomorInput("");
                const desktopInput = document.querySelector(
                  'input[name="search"]'
                ) as HTMLInputElement;
                if (desktopInput) {
                  desktopInput.value = "";
                  desktopInput.focus();
                }
              }}
              className="inline-flex items-center px-6 py-3 border border-orange-300 rounded-lg text-orange-700 bg-orange-50 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Coba Lagi
            </button>

            <CustomButton className="text-base font-medium rounded-lg gradient-details text-white px-6 py-3">
              <Link href="/" className="flex items-center">
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Kembali ke Beranda
              </Link>
            </CustomButton>
          </div>

          {/* Additional Help */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Perlu bantuan? Hubungi tim customer service kami untuk informasi
              lebih lanjut tentang inspeksi kendaraan.
            </p>
          </div>
        </div>
      ) : null}
      {/* Made by Cardano */}
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <ResultPageContent />
    </Suspense>
  );
}
