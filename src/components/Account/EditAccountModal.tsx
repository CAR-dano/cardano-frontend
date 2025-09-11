"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { User } from "@/utils/Auth";

interface EditAccountModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: Partial<User>) => Promise<void>;
  isLoading?: boolean;
}

const EditAccountModal: React.FC<EditAccountModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
  isLoading: externalLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    whatsappNumber: user.whatsappNumber || "",
    walletAddress: user.walletAddress || "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Use external loading state or internal loading state
  const loading = externalLoading || isLoading;

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        whatsappNumber: user.whatsappNumber || "",
        walletAddress: user.walletAddress || "",
      });
      setErrors({});
    }
  }, [isOpen, user]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (
      formData.whatsappNumber &&
      !/^[\+]?[0-9\-\(\)\s]+$/.test(formData.whatsappNumber)
    ) {
      newErrors.whatsappNumber = "Format nomor WhatsApp tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Filter out unchanged values
    const updatedFields: Partial<User> = {};

    if (formData.name !== user.name) updatedFields.name = formData.name || null;
    if (formData.username !== user.username)
      updatedFields.username = formData.username || null;
    if (formData.email !== user.email) updatedFields.email = formData.email;
    if (formData.whatsappNumber !== user.whatsappNumber)
      updatedFields.whatsappNumber = formData.whatsappNumber || null;
    if (formData.walletAddress !== user.walletAddress)
      updatedFields.walletAddress = formData.walletAddress || null;

    // Check if there are any changes
    if (Object.keys(updatedFields).length === 0) {
      setErrors({ form: "Tidak ada perubahan yang perlu disimpan." });
      return;
    }

    setIsLoading(true);
    try {
      await onSave(updatedFields);
      // Don't close modal here - let the parent component handle it after successful API call
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-xl font-bold">Edit Akun</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form-level Error */}
            {errors.form && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{errors.form}</p>
              </div>
            )}
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={errors.username ? "border-red-500" : ""}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan alamat email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* WhatsApp Number Field */}
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">Nomor WhatsApp</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                placeholder="Masukkan nomor WhatsApp (contoh: +62812345678)"
                value={formData.whatsappNumber}
                onChange={(e) =>
                  handleInputChange("whatsappNumber", e.target.value)
                }
                className={errors.whatsappNumber ? "border-red-500" : ""}
              />
              {errors.whatsappNumber && (
                <p className="text-sm text-red-500">{errors.whatsappNumber}</p>
              )}
              <p className="text-xs text-gray-500">
                Format: +62812345678 atau 0812345678
              </p>
            </div>

            {/* Wallet Address Field */}
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Alamat Wallet</Label>
              <Input
                id="walletAddress"
                type="text"
                placeholder="Masukkan alamat wallet Cardano"
                value={formData.walletAddress}
                onChange={(e) =>
                  handleInputChange("walletAddress", e.target.value)
                }
                className={`${
                  errors.walletAddress ? "border-red-500" : ""
                } font-mono text-sm`}
              />
              {errors.walletAddress && (
                <p className="text-sm text-red-500">{errors.walletAddress}</p>
              )}
              <p className="text-xs text-gray-500">
                Alamat wallet Cardano untuk transaksi dan verifikasi
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return typeof window !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
};

export default EditAccountModal;
