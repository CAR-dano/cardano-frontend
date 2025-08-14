"use client";

import { useState } from "react";
import { Layout } from "../../components/layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import {
  Upload,
  Shield,
  CheckCircle,
  XCircle,
  FileText,
  Car,
  Link,
  Zap,
  Hash,
  ArrowRight,
  Database,
  Lock,
  Sparkles,
} from "lucide-react";
import apiClient from "@/lib/services/apiClient";
import CardanoScanButton from "../../components/Button/CardanoScanButton";
import CardanoScanViewButton from "../../components/Button/CardanoScanViewButton";

interface VerificationResult {
  numberPlate: string;
  uploadedHash: string;
  blockchainHash: string | null;
  isVerified: boolean;
  timestamp: string;
  isVehicleFound: boolean;
  errorMessage?: string;
}

const BlockchainConnectionVisualization = ({
  isVerified,
  uploadedHash,
  blockchainHash,
  isLoading,
  verificationResult,
}: {
  isVerified: boolean;
  uploadedHash?: string;
  blockchainHash?: string | null;
  isLoading: boolean;
  verificationResult?: VerificationResult | null;
}) => {
  const isVehicleNotFound =
    verificationResult && !verificationResult.isVehicleFound;

  return (
    <div className="relative w-full h-80 mb-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 rounded-2xl p-8 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {[...Array(144)].map((_, i) => (
            <div
              key={i}
              className="border border-blue-200 dark:border-blue-800"
            />
          ))}
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between h-full relative z-10">
        {/* Left Side - Input Hash */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300">
              <div className="relative">
                <Upload className="h-10 w-10 text-white animate-bounce" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-300 rounded-full animate-ping"></div>
              </div>
            </div>
            {/* Connecting Lines */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-orange-500 to-transparent"></div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
              INPUT HASH
            </h3>
            <div className="w-48 p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg backdrop-blur-sm border border-orange-200 dark:border-orange-700">
              <div className="flex items-center justify-center mb-2">
                <Hash className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-xs font-semibold text-orange-600">
                  DOKUMEN
                </span>
              </div>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
                {uploadedHash
                  ? uploadedHash.substring(0, 32) + "..."
                  : "Upload dokumen untuk generate hash"}
              </div>
            </div>
          </div>
        </div>

        {/* Center - Verification Animation */}
        <div className="flex-1 mx-8 relative">
          <div className="relative flex items-center justify-center h-32">
            {/* Flowing Data Animation */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              {/* Data Flow Particles - Left to Center */}
              {isLoading && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`left-${i}`}
                      className="absolute w-4 h-4 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full shadow-lg opacity-90"
                      style={{
                        animation: `flowLeftToCenter 2.5s linear infinite`,
                        animationDelay: `${i * 0.4}s`,
                        left: "-20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  ))}

                  {/* Data Flow Particles - Right to Center */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={`right-${i}`}
                      className="absolute w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full shadow-lg opacity-90"
                      style={{
                        animation: `flowRightToCenter 2.5s linear infinite`,
                        animationDelay: `${i * 0.4}s`,
                        right: "-20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  ))}

                  {/* Meeting Point Animation */}
                  <div
                    className="absolute w-12 h-12 bg-gradient-to-r from-orange-400 to-purple-500 rounded-full opacity-0 shadow-2xl"
                    style={{
                      animation: `meetingPoint 2.5s ease-in-out infinite`,
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />

                  {/* Sparkle Effects */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={`sparkle-${i}`}
                      className="absolute w-2 h-2 bg-white rounded-full opacity-0"
                      style={{
                        animation: `sparkleEffect 2.5s ease-in-out infinite`,
                        animationDelay: `${1.8 + i * 0.1}s`,
                        left: `${45 + Math.random() * 10}%`,
                        top: `${45 + Math.random() * 10}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Verification Result Display */}
            {!isLoading && verificationResult && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Connecting Lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Left Connection */}
                    <div
                      className={`absolute left-0 top-1/2 w-1/2 h-0.5 transform -translate-y-1/2 ${
                        isVehicleNotFound
                          ? "bg-gradient-to-r from-orange-400 to-gray-400"
                          : isVerified
                          ? "bg-gradient-to-r from-orange-400 to-green-400"
                          : "bg-gradient-to-r from-orange-400 to-red-400"
                      }`}
                      style={{
                        animation: `connectionLine 1s ease-out 0.5s both`,
                      }}
                    ></div>

                    {/* Right Connection */}
                    <div
                      className={`absolute right-0 top-1/2 w-1/2 h-0.5 transform -translate-y-1/2 ${
                        isVehicleNotFound
                          ? "bg-gradient-to-l from-gray-400 to-gray-400"
                          : isVerified
                          ? "bg-gradient-to-l from-purple-400 to-green-400"
                          : "bg-gradient-to-l from-purple-400 to-red-400"
                      }`}
                      style={{
                        animation: `connectionLine 1s ease-out 0.7s both`,
                      }}
                    ></div>
                  </div>

                  {/* Main Verification Icon - Centered on Lines */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl ${
                        isVehicleNotFound
                          ? "bg-gradient-to-br from-gray-400 to-slate-500"
                          : isVerified
                          ? "bg-gradient-to-br from-green-400 to-blue-500"
                          : "bg-gradient-to-br from-red-400 to-orange-500"
                      }`}
                      style={{
                        animation: `verificationPulse 2s ease-in-out infinite`,
                      }}
                    >
                      {isVehicleNotFound ? (
                        <XCircle className="h-8 w-8 text-white animate-pulse" />
                      ) : isVerified ? (
                        <CheckCircle className="h-8 w-8 text-white animate-pulse" />
                      ) : (
                        <XCircle className="h-8 w-8 text-white animate-pulse" />
                      )}

                      {/* Ripple Effect */}
                      <div
                        className={`absolute inset-0 rounded-full ${
                          isVehicleNotFound
                            ? "bg-gray-400"
                            : isVerified
                            ? "bg-green-400"
                            : "bg-red-400"
                        }`}
                        style={{
                          animation: `rippleEffect 3s ease-out infinite`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Verification Text - Below Icon */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-8">
                    <div className="text-center">
                      <h3
                        className={`text-lg font-bold ${
                          isVehicleNotFound
                            ? "text-gray-600 dark:text-gray-400"
                            : isVerified
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {isVehicleNotFound
                          ? "TIDAK DITEMUKAN"
                          : isVerified
                          ? "TERVERIFIKASI"
                          : "GAGAL"}
                      </h3>
                      <p
                        className={`text-xs ${
                          isVehicleNotFound
                            ? "text-gray-500"
                            : isVerified
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {isVehicleNotFound
                          ? "Kendaraan tidak ada di database"
                          : isVerified
                          ? "Dokumen terautentikasi"
                          : "Dokumen tidak terverifikasi"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status Indicator */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <div
              className={`px-4 py-2 rounded-full text-xs font-bold ${
                isVehicleNotFound
                  ? "bg-gray-100 text-gray-700 border border-gray-300"
                  : isVerified
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-purple-100 text-purple-700 border border-purple-300"
              }`}
            >
              {isLoading
                ? "MEMVERIFIKASI..."
                : isVehicleNotFound
                ? "KENDARAAN TIDAK DITEMUKAN"
                : isVerified
                ? "TERVERIFIKASI"
                : "TIDAK TERVERIFIKASI"}
            </div>
          </div>
        </div>

        {/* Right Side - Blockchain Hash */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div
              className={`w-24 h-24 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                isVehicleNotFound
                  ? "from-gray-500 to-slate-600"
                  : isVerified
                  ? "from-green-500 to-blue-600"
                  : "from-purple-500 to-pink-600"
              }`}
            >
              <div className="relative">
                {isVehicleNotFound ? (
                  <XCircle className="h-10 w-10 text-white animate-pulse" />
                ) : (
                  <Database className="h-10 w-10 text-white animate-pulse" />
                )}
                <div
                  className={`absolute -top-2 -right-2 w-4 h-4 rounded-full animate-ping ${
                    isVehicleNotFound
                      ? "bg-gray-300"
                      : isVerified
                      ? "bg-green-300"
                      : "bg-purple-300"
                  }`}
                ></div>
              </div>
            </div>
            {/* Connecting Lines */}
            <div
              className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b to-transparent ${
                isVehicleNotFound
                  ? "from-gray-500"
                  : isVerified
                  ? "from-green-500"
                  : "from-purple-500"
              }`}
            ></div>
          </div>

          <div className="text-center">
            <h3
              className={`text-lg font-bold mb-2 ${
                isVehicleNotFound
                  ? "text-gray-600 dark:text-gray-400"
                  : isVerified
                  ? "text-green-600 dark:text-green-400"
                  : "text-purple-600 dark:text-purple-400"
              }`}
            >
              {isVehicleNotFound
                ? "KENDARAAN TIDAK DITEMUKAN"
                : "BLOCKCHAIN HASH"}
            </h3>
            <div
              className={`w-48 p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg backdrop-blur-sm border ${
                isVehicleNotFound
                  ? "border-gray-200 dark:border-gray-700"
                  : isVerified
                  ? "border-green-200 dark:border-green-700"
                  : "border-purple-200 dark:border-purple-700"
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                {isVehicleNotFound ? (
                  <XCircle className="h-4 w-4 mr-2 text-gray-500" />
                ) : (
                  <Lock
                    className={`h-4 w-4 mr-2 ${
                      isVerified ? "text-green-500" : "text-purple-500"
                    }`}
                  />
                )}
                <span
                  className={`text-xs font-semibold ${
                    isVehicleNotFound
                      ? "text-gray-600"
                      : isVerified
                      ? "text-green-600"
                      : "text-purple-600"
                  }`}
                >
                  {isVehicleNotFound ? "TIDAK DITEMUKAN" : "CARDANO"}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400 break-all">
                {isVehicleNotFound
                  ? "Plat kendaraan tidak ditemukan di record blockchain"
                  : blockchainHash
                  ? blockchainHash.substring(0, 32) + "..."
                  : "Mengambil dari blockchain..."}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Result Overlay */}
      {!isLoading && uploadedHash && (blockchainHash || isVehicleNotFound) && (
        <div className="absolute top-4 right-4">
          <div
            className={`p-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ${
              isVehicleNotFound
                ? "bg-gradient-to-r from-gray-400 to-slate-500"
                : isVerified
                ? "bg-gradient-to-r from-green-400 to-blue-500"
                : "bg-gradient-to-r from-red-400 to-orange-500"
            }`}
          >
            {isVehicleNotFound ? (
              <XCircle className="h-6 w-6 text-white animate-pulse" />
            ) : isVerified ? (
              <CheckCircle className="h-6 w-6 text-white animate-pulse" />
            ) : (
              <XCircle className="h-6 w-6 text-white animate-pulse" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function CekValiditasPage() {
  // Add CSS keyframes for verification animations
  const verificationStyles = `
    @keyframes flowLeftToCenter {
      0% { 
        left: -20px; 
        transform: translateY(-50%) scale(0.5);
        opacity: 0;
      }
      25% {
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }
      75% {
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }
      100% { 
        left: 50%; 
        transform: translate(-50%, -50%) scale(0.3);
        opacity: 0;
      }
    }
    
    @keyframes flowRightToCenter {
      0% { 
        right: -20px; 
        transform: translateY(-50%) scale(0.5);
        opacity: 0;
      }
      25% {
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }
      75% {
        opacity: 1;
        transform: translateY(-50%) scale(1);
      }
      100% { 
        right: 50%; 
        transform: translate(50%, -50%) scale(0.3);
        opacity: 0;
      }
    }
    
    @keyframes meetingPoint {
      0%, 65% { 
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }
      75% { 
        opacity: 0.8;
        transform: translate(-50%, -50%) scale(1);
      }
      85% { 
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.3);
      }
      100% { 
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.5);
      }
    }
    
    @keyframes sparkleEffect {
      0%, 90% { 
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }
      95% { 
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      100% { 
        opacity: 0;
        transform: translate(-50%, -50%) scale(0);
      }
    }
    
    @keyframes verificationPulse {
      0%, 100% { 
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
      }
      50% { 
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
      }
    }
    
    @keyframes rippleEffect {
      0% { 
        transform: scale(1);
        opacity: 0.6;
      }
      50% { 
        transform: scale(1.5);
        opacity: 0.3;
      }
      100% { 
        transform: scale(2);
        opacity: 0;
      }
    }
    
    @keyframes connectionLine {
      0% { 
        transform: scaleX(0);
        opacity: 0;
      }
      100% { 
        transform: scaleX(1);
        opacity: 1;
      }
    }
    
    @keyframes blockBlink {
      0%, 80% { 
        opacity: 0.8; 
        transform: scale(1); 
      }
      40% { 
        opacity: 1; 
        transform: scale(1.05); 
      }
    }

    @keyframes shimmer {
      0% { transform: translateX(-200%) skewX(12deg); }
      100% { transform: translateX(200%) skewX(12deg); }
    }
  `;
  const [numberPlate, setNumberPlate] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] =
    useState<VerificationResult | null>(null);

  const calculateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  };

  const fetchBlockchainHash = async (
    numberPlate: string
  ): Promise<string | null> => {
    const platFormat = numberPlate.replace(/\s+/g, "").toUpperCase();
    try {
      const response = await apiClient.get(
        `/inspections/search?vehicleNumber=${platFormat}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.pdfFileHash) {
        return response.data.pdfFileHash;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const handleVerification = async () => {
    if (!numberPlate || !pdfFile) return;

    setIsLoading(true);
    try {
      const uploadedHash = await calculateHash(pdfFile);
      const blockchainHash = await fetchBlockchainHash(numberPlate);

      const result: VerificationResult = {
        numberPlate,
        uploadedHash,
        blockchainHash,
        isVerified: blockchainHash !== null && uploadedHash === blockchainHash,
        timestamp: new Date().toISOString(),
        isVehicleFound: blockchainHash !== null,
        errorMessage:
          blockchainHash === null
            ? "Vehicle plate not found in blockchain records"
            : undefined,
      };

      setVerificationResult(result);
    } catch (error) {
      console.error("Verification failed:", error);
      const result: VerificationResult = {
        numberPlate,
        uploadedHash: "",
        blockchainHash: null,
        isVerified: false,
        timestamp: new Date().toISOString(),
        isVehicleFound: false,
        errorMessage:
          "An error occurred during verification. Please try again.",
      };
      setVerificationResult(result);
    } finally {
      if (verificationResult) {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } else {
        setIsLoading(false);
      }
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

  return (
    <Layout>
      <style dangerouslySetInnerHTML={{ __html: verificationStyles }} />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-orange-900 dark:to-purple-900 py-12 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-twinkle opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:rotate-12 transition-all duration-300">
                    <Shield className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                  <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Verifikasi Blockchain
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Verifikasi keaslian dokumen inspeksi kendaraan Anda menggunakan
                teknologi blockchain Cardano
              </p>

              {/* Decorative Elements */}
              <div className="flex items-center justify-center mt-8 space-x-4">
                <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Input Form */}
            <Card className="mb-8 shadow-2xl border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-purple-400/10 to-pink-400/10 animate-pulse"></div>

              <CardHeader className="relative">
                <CardTitle className="flex items-center text-2xl">
                  <Car className="h-8 w-8 mr-3 text-orange-600 animate-bounce" />
                  <span className="bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                    Informasi Kendaraan
                  </span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Masukkan nomor plat kendaraan dan unggah dokumen inspeksi PDF
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* License Plate Input */}
                  <div className="space-y-4">
                    <Label
                      htmlFor="numberPlate"
                      className="text-lg font-semibold flex items-center"
                    >
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3 animate-pulse"></div>
                      Nomor Plat Kendaraan
                    </Label>
                    <div className="relative">
                      <Input
                        id="numberPlate"
                        type="text"
                        placeholder="Contoh: B 1234 ABC"
                        value={numberPlate}
                        onChange={(e) =>
                          setNumberPlate(e.target.value.toUpperCase())
                        }
                        className="h-14 text-xl font-mono border-2 border-orange-200 focus:border-orange-500 pl-6 pr-16 rounded-xl transition-all duration-300 focus:shadow-lg focus:shadow-orange-500/20"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div
                          className="w-8 h-8 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full flex items-center justify-center animate-spin"
                          style={{ animationDuration: "3s" }}
                        >
                          <Car className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div className="space-y-4">
                    <Label
                      htmlFor="pdfFile"
                      className="text-lg font-semibold flex items-center"
                    >
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
                      Dokumen Inspeksi PDF
                    </Label>
                    <div className="relative flex items-center">
                      <Input
                        id="pdfFile"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="h-14 w-full file:-mt-1 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-50 file:to-pink-50 file:text-purple-700 hover:file:from-purple-100 hover:file:to-pink-100 border-2 border-purple-200 focus:border-purple-500 rounded-xl transition-all duration-300 focus:shadow-lg focus:shadow-purple-500/20"
                      />
                      <Upload className="absolute -mt-2 right-4 top-1/2 -translate-y-1/2 h-6 w-6 text-purple-400 animate-bounce" />
                    </div>

                    {pdfFile && (
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-800 animate-fade-in">
                        <p className="text-sm text-green-700 dark:text-green-400 flex items-center">
                          <FileText className="h-5 w-5 mr-2 animate-pulse" />
                          <span className="font-semibold">{pdfFile.name}</span>
                          <span className="ml-2 text-green-600">
                            ({(pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Verification Button */}
                <Button
                  onClick={handleVerification}
                  disabled={!numberPlate || !pdfFile || isLoading}
                  className="w-full h-16 text-xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-pink-600 hover:from-orange-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:shadow-purple-500/30 transform hover:scale-105 relative overflow-hidden rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>

                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                      Melakukan verifikasi di Blockchain...
                    </>
                  ) : (
                    <>
                      <Zap className="h-6 w-6 mr-3 animate-pulse" />
                      Verifikasi Dokumen
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Blockchain Visualization */}
            {(verificationResult || isLoading) && (
              <div className="mb-8">
                <BlockchainConnectionVisualization
                  isVerified={verificationResult?.isVerified || false}
                  uploadedHash={verificationResult?.uploadedHash}
                  blockchainHash={verificationResult?.blockchainHash}
                  isLoading={isLoading}
                  verificationResult={verificationResult}
                />
              </div>
            )}

            {/* Verification Result */}
            {verificationResult && !isLoading && (
              <Card
                className={`shadow-2xl border-0 backdrop-blur-sm relative overflow-hidden ${
                  !verificationResult.isVehicleFound
                    ? "bg-gradient-to-br from-gray-50/90 to-slate-50/90 dark:from-gray-900/20 dark:to-slate-900/20"
                    : verificationResult.isVerified
                    ? "bg-gradient-to-br from-green-50/90 to-blue-50/90 dark:from-green-900/20 dark:to-blue-900/20"
                    : "bg-gradient-to-br from-red-50/90 to-orange-50/90 dark:from-red-900/20 dark:to-orange-900/20"
                }`}
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl flex items-center justify-center mb-4">
                    {!verificationResult.isVehicleFound ? (
                      <div className="flex items-center text-gray-600">
                        <XCircle className="h-10 w-10 mr-4 animate-pulse" />
                        <span className="bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                          KENDARAAN TIDAK DITEMUKAN
                        </span>
                      </div>
                    ) : verificationResult.isVerified ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-10 w-10 mr-4 animate-pulse" />
                        <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                          VERIFIKASI BERHASIL
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle className="h-10 w-10 mr-4 animate-pulse" />
                        <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                          VERIFIKASI GAGAL
                        </span>
                      </div>
                    )}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {!verificationResult.isVehicleFound
                      ? "Nomor plat kendaraan tidak ditemukan di record blockchain"
                      : verificationResult.isVerified
                      ? "Dokumen berhasil diverifikasi di blockchain Cardano"
                      : "Dokumen tidak dapat diverifikasi di jaringan blockchain"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/70 dark:bg-slate-800/70 rounded-xl backdrop-blur-sm border border-white/20">
                      <h4 className="text-lg font-bold mb-4 flex items-center">
                        <Car className="h-5 w-5 mr-2" />
                        Informasi Kendaraan
                      </h4>
                      <p className="text-2xl font-mono font-bold text-blue-600">
                        {verificationResult.numberPlate}
                      </p>
                    </div>
                    <div className="p-6 bg-white/70 dark:bg-slate-800/70 rounded-xl backdrop-blur-sm border border-white/20">
                      <h4 className="text-lg font-bold mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Status Verifikasi
                      </h4>
                      <p
                        className={`text-2xl font-bold ${
                          !verificationResult.isVehicleFound
                            ? "text-gray-600"
                            : verificationResult.isVerified
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {!verificationResult.isVehicleFound
                          ? "NOT FOUND"
                          : verificationResult.isVerified
                          ? "VERIFIED"
                          : "FAILED"}
                      </p>
                    </div>
                  </div>

                  {verificationResult.isVehicleFound ? (
                    <div className="p-6 bg-white/70 dark:bg-slate-800/70 rounded-xl backdrop-blur-sm border border-white/20">
                      <h4 className="text-lg font-bold mb-4">
                        Perbandingan Hash
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm font-semibold text-blue-600 mb-2">
                            Hash Dokumen yang Diunggah:
                          </p>
                          <p className="text-xs font-mono bg-blue-50 dark:bg-blue-900/20 p-3 rounded break-all">
                            {verificationResult.uploadedHash}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-purple-600 mb-2">
                            Blockchain Hash:
                          </p>
                          <p className="text-xs font-mono bg-purple-50 dark:bg-purple-900/20 p-3 rounded break-all">
                            {verificationResult.blockchainHash}
                          </p>
                        </div>
                      </div>

                      {/* Cardano Scan Button - Only show if verification is successful */}
                      {verificationResult.isVerified && (
                        <div className="flex justify-center pt-4 border-t border-slate-200 dark:border-slate-700">
                          <CardanoScanViewButton
                            hash={
                              verificationResult.blockchainHash || undefined
                            }
                            type="tx"
                            prominent={true}
                            size="lg"
                            className="min-w-[250px]"
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-6 bg-white/70 dark:bg-slate-800/70 rounded-xl backdrop-blur-sm border border-white/20">
                      <h4 className="text-lg font-bold mb-4 flex items-center">
                        <XCircle className="h-5 w-5 mr-2 text-gray-600" />
                        Detail Error
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Pesan Error:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {verificationResult.errorMessage}
                          </p>
                        </div>
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                            Hash Dokumen yang Diunggah:
                          </p>
                          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 break-all">
                            {verificationResult.uploadedHash}
                          </p>
                        </div>
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
                            Saran:
                          </p>
                          <ul className="text-sm text-yellow-600 dark:text-yellow-400 space-y-1">
                            <li>
                              • Periksa kembali format nomor plat kendaraan
                            </li>
                            <li>
                              • Pastikan kendaraan telah diperiksa dan terdaftar
                            </li>
                            <li>
                              • Hubungi layanan dukungan jika masalah berlanjut
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="text-center p-6 bg-white/70 dark:bg-slate-800/70 rounded-xl backdrop-blur-sm border border-white/20">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Diverifikasi pada:{" "}
                      {new Date(verificationResult.timestamp).toLocaleString(
                        "id-ID"
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
