import React from "react";
import { Button } from "../ui/button";
import { ExternalLink, Eye, Globe, Zap } from "lucide-react";

export interface CardanoScanViewButtonProps {
  /** Hash atau transaction ID yang ingin dilihat di Cardano Scan */
  hash?: string;
  /** Jenis data yang akan dilihat */
  type?: "tx" | "address" | "policy";
  /** Custom className */
  className?: string;
  /** Tampilan yang lebih prominent */
  prominent?: boolean;
  /** Ukuran button */
  size?: "default" | "sm" | "lg";
}

const CardanoScanViewButton: React.FC<CardanoScanViewButtonProps> = ({
  hash,
  type = "tx",
  className = "",
  prominent = false,
  size = "lg",
}) => {
  const getCardanoScanUrl = (hash: string, type: string) => {
    const baseUrl = "https://cardanoscan.io";

    switch (type) {
      case "tx":
        return `${baseUrl}/transaction/${hash}`;
      case "address":
        return `${baseUrl}/address/${hash}`;
      case "policy":
        return `${baseUrl}/tokenPolicy/${hash}`;
      default:
        return `${baseUrl}/transaction/${hash}`;
    }
  };

  const handleClick = () => {
    if (!hash) return;

    const url = getCardanoScanUrl(hash, type);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const isDisabled = !hash;

  if (prominent) {
    return (
      <Button
        onClick={handleClick}
        disabled={isDisabled}
        size={size}
        className={`
          relative overflow-hidden
          bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600
          hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700
          text-white font-bold
          shadow-2xl hover:shadow-3xl
          transform hover:scale-105 active:scale-95
          transition-all duration-300
          border-0
          ${
            size === "lg"
              ? "h-14 px-8 text-lg"
              : size === "sm"
              ? "h-10 px-4 text-sm"
              : "h-12 px-6 text-base"
          }
          ${className}
        `}
        title={
          isDisabled
            ? "Hash tidak tersedia"
            : `Buka di Cardano Scan: ${hash?.substring(0, 20)}...`
        }
      >
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />

        {/* Content */}
        <div className="relative flex items-center justify-center z-10">
          <Globe className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">Lihat di Cardano Scan</span>
          <ExternalLink className="h-4 w-4 ml-2 opacity-80" />
        </div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] animate-[shimmer_2s_ease-in-out_infinite] skew-x-12" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      variant="outline"
      size={size}
      className={`
        group relative
        bg-gradient-to-r from-blue-50 to-purple-50 
        hover:from-blue-100 hover:to-purple-100
        dark:from-blue-900/20 dark:to-purple-900/20 
        dark:hover:from-blue-900/40 dark:hover:to-purple-900/40
        border-2 border-blue-200 hover:border-purple-300
        dark:border-blue-700 dark:hover:border-purple-600
        text-blue-700 hover:text-purple-700
        dark:text-blue-300 dark:hover:text-purple-300
        font-semibold shadow-lg hover:shadow-xl
        transform hover:scale-105 active:scale-95
        transition-all duration-300
        ${className}
      `}
      title={
        isDisabled
          ? "Hash tidak tersedia"
          : `Buka di Cardano Scan: ${hash?.substring(0, 20)}...`
      }
    >
      <div className="flex items-center justify-center">
        <Eye className="h-4 w-4 mr-2 group-hover:animate-pulse" />
        <span>Lihat di Cardano Scan</span>
        <ExternalLink className="h-3 w-3 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
    </Button>
  );
};

export default CardanoScanViewButton;
