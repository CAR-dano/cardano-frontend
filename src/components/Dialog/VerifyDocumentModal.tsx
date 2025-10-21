"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, FileText, CheckCircle, Loader2, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { extractPlateFromPdf, type PlateResult } from "@/lib/extractPlate";

interface VerifyDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VerifyDocumentModal({
  isOpen,
  onClose,
}: VerifyDocumentModalProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState<string>("");
  const [plateResult, setPlateResult] = useState<PlateResult | null>(null);
  const [editedPlate, setEditedPlate] = useState<string>("");
  const [isEditingPlate, setIsEditingPlate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPlateResult(null);
      setEditedPlate("");

      // Auto-extract plate number
      await extractPlateNumber(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPlateResult(null);
      setEditedPlate("");

      // Auto-extract plate number
      await extractPlateNumber(file);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const extractPlateNumber = async (file: File) => {
    setIsExtracting(true);
    setExtractionProgress("Mengekstrak teks dari PDF...");

    try {
      const result = await extractPlateFromPdf(file, {
        ocr: true,
        ocrTimeoutMs: 30000,
        regexStrict: false,
        normalizeSpacing: true,
        validateIndonesiaFormat: true,
        onProgress: (stage, percent) => {
          if (stage === "extracting") {
            setExtractionProgress("Mengekstrak teks dari PDF...");
          } else if (stage === "ocr") {
            setExtractionProgress(`Melakukan OCR... ${percent || 0}%`);
          } else if (stage === "matching") {
            setExtractionProgress("Mencari pola plat nomor...");
          }
        },
      });

      console.log("Plate extraction result:", result);

      setPlateResult(result);

      if (result.found && result.normalized) {
        setEditedPlate(result.normalized);
      }

      setExtractionProgress("");
    } catch (error) {
      console.error("Plate extraction error:", error);
      setExtractionProgress("");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleVerify = async () => {
    if (pdfFile) {
      try {
        // Calculate hash of the PDF file
        const buffer = await pdfFile.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const calculatedHash = hashArray
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");

        // Store only the hash and metadata (not the entire file)
        const fileData = {
          name: pdfFile.name,
          size: pdfFile.size,
          hash: calculatedHash,
        };
        sessionStorage.setItem("uploadedPdfData", JSON.stringify(fileData));

        // Store extracted or edited plate number
        if (editedPlate) {
          sessionStorage.setItem("extractedPlateNumber", editedPlate);
        }

        router.push("/cek-validitas");
      } catch (error) {
        console.error("Error calculating hash:", error);
        alert("Terjadi kesalahan saat memproses file. Silakan coba lagi.");
      }
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleClose = () => {
    // Reset all states when closing modal
    setPdfFile(null);
    setPlateResult(null);
    setEditedPlate("");
    setIsEditingPlate(false);
    setIsExtracting(false);
    setExtractionProgress("");
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
      }}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden relative"
        style={{ zIndex: 100000 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-3 rounded-xl">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Verifikasi Dokumen
              </h2>
              <p className="text-white/80 text-sm">
                Upload dokumen inspeksi untuk verifikasi
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Drag and Drop Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClickUpload}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                : "border-gray-300 dark:border-gray-600 hover:border-orange-400 hover:bg-orange-50/50 dark:hover:bg-orange-900/10"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            {pdfFile ? (
              <div className="flex flex-col items-center space-y-3">
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    File Terpilih:
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 break-all">
                    {pdfFile.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {(pdfFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPdfFile(null);
                    setPlateResult(null);
                    setEditedPlate("");
                    setIsEditingPlate(false);
                  }}
                  className="text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  Hapus File
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-3">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-full">
                  <FileText className="h-12 w-12 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    Drag & Drop file PDF di sini
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    atau klik untuk memilih file
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Extraction Progress */}
          {isExtracting && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                    Mengekstrak Plat Nomor...
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {extractionProgress || "Memproses..."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Plate Extraction Result */}
          {plateResult && !isExtracting && (
            <div
              className={`border-2 rounded-xl p-4 ${
                plateResult.found
                  ? "border-green-300 bg-green-50 dark:bg-green-900/20"
                  : "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20"
              }`}
            >
              {plateResult.found ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-semibold text-green-800 dark:text-green-200">
                        Plat Nomor Terdeteksi
                      </p>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      {plateResult.source === "text" ? "Dari Text" : "Dari OCR"}{" "}
                      • {Math.round(plateResult.confidence || 0)}%
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {isEditingPlate ? (
                      <>
                        <input
                          type="text"
                          value={editedPlate}
                          onChange={(e) =>
                            setEditedPlate(e.target.value.toUpperCase())
                          }
                          className="flex-1 px-3 py-2 border-2 border-green-300 rounded-lg text-lg font-bold text-center uppercase focus:outline-none focus:ring-2 focus:ring-green-400"
                          placeholder="AAA 1234 AAA"
                        />
                        <button
                          onClick={() => setIsEditingPlate(false)}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 px-4 py-3 bg-white dark:bg-slate-700 rounded-lg border-2 border-green-300">
                          <p className="text-2xl font-bold text-center text-green-800 dark:text-green-200 tracking-wider">
                            {editedPlate || plateResult.normalized}
                          </p>
                        </div>
                        <button
                          onClick={() => setIsEditingPlate(true)}
                          className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                          title="Edit plat nomor"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-green-700 dark:text-green-300 text-center">
                    Klik tombol edit jika plat nomor tidak sesuai
                  </p>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                    Plat Nomor Tidak Terdeteksi
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    Anda dapat memasukkan plat nomor secara manual di halaman
                    berikutnya
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Privacy Notice */}
          {pdfFile && (
            <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                🔒 <span className="font-semibold">Privasi Terjaga:</span> Semua
                proses dilakukan di browser Anda. File tidak diunggah ke server.
              </p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Batal
            </button>
            <button
              onClick={handleVerify}
              disabled={!pdfFile || isExtracting}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                pdfFile && !isExtracting
                  ? "bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              {isExtracting ? "Memproses..." : "Verifikasi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
