"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, FileText, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please upload a valid PDF file");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      alert("Please select a valid PDF file");
    }
  };

  const handleVerify = () => {
    if (pdfFile) {
      // Store the file in sessionStorage to be used in cek-validitas page
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = {
          name: pdfFile.name,
          type: pdfFile.type,
          size: pdfFile.size,
          data: e.target?.result as string,
        };
        sessionStorage.setItem("uploadedPdfFile", JSON.stringify(fileData));
        router.push("/cek-validitas");
      };
      reader.readAsDataURL(pdfFile);
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
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
            onClick={onClose}
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

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Batal
            </button>
            <button
              onClick={handleVerify}
              disabled={!pdfFile}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
                pdfFile
                  ? "bg-gradient-to-r from-orange-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:scale-105"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
            >
              Verifikasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
