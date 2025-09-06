import React from "react";
import { Button } from "../ui/button";
import { ExternalLink, Eye } from "lucide-react";

export interface CardanoScanButtonProps {
  /** Hash atau transaction ID yang ingin dilihat di Cardano Scan */
  hash?: string;
  /** Jenis data yang akan dilihat (tx untuk transaction, address untuk address) */
  type?: "tx" | "address" | "policy";
  /** Variant button */
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  /** Ukuran button */
  size?: "default" | "sm" | "lg" | "icon";
  /** Custom className */
  className?: string;
  /** Custom children, jika tidak ada akan menggunakan default text */
  children?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

const CardanoScanButton: React.FC<CardanoScanButtonProps> = ({
  hash,
  type = "tx",
  variant = "outline",
  size = "default",
  className = "",
  children,
  disabled = false,
}) => {
  // Base URL untuk Cardano Scan (mainnet)
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
    if (!hash || disabled) return;

    const url = getCardanoScanUrl(hash, type);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const defaultText =
    type === "tx"
      ? "Lihat di Cardano Scan"
      : type === "address"
      ? "Lihat Address di Cardano Scan"
      : "Lihat Policy di Cardano Scan";

  const isDisabled = disabled || !hash;

  return (
    <Button
      variant={variant}
      size={size}
      className={`transition-all duration-300 hover:scale-105 ${className}`}
      onClick={handleClick}
      disabled={isDisabled}
      title={
        isDisabled
          ? "Hash tidak tersedia"
          : `Buka ${getCardanoScanUrl(hash || "", type)}`
      }
    >
      <Eye className="h-4 w-4 mr-2" />
      {children || defaultText}
      <ExternalLink className="h-3 w-3 ml-2 opacity-70" />
    </Button>
  );
};

export default CardanoScanButton;
