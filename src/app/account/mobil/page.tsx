"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Sparkles, Clock } from "lucide-react";

const MobilAnda = () => {
  return (
    <div className="-m-4 lg:-m-6 xl:-m-10 min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-12 text-center">
          {/* Icon Animation */}
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Car className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Data Kendaraan
          </h1>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-6 py-3 rounded-full mb-6">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Segera Hadir
            </span>
          </div>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Kelola data kendaraan dan riwayat kepemilikan Anda
            <br />
            <span className="text-orange-500 font-medium">
              sedang dalam pengembangan
            </span>
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-blue-600 font-bold">🚗</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Registrasi Mobil
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">📋</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Detail Spesifikasi
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-purple-600 font-bold">📝</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Riwayat Service
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobilAnda;
