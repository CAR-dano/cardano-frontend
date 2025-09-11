"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Mail,
  User,
  Wallet,
  Phone,
  Edit3,
  Shield,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import EditAccountModal from "@/components/Account/EditAccountModal";
import { User as UserType } from "@/utils/Auth";
import { toast } from "@/hooks/use-toast";
import { getUserProfile } from "@/lib/features/auth/authSlice";
import { editUserData } from "@/lib/features/user/userSlice";

const AccountDashboard = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: id });
    } catch (error) {
      return "Tanggal tidak valid";
    }
  };

  const getUserInitials = (
    name?: string | null,
    username?: string | null,
    email?: string
  ) => {
    if (name) return name.charAt(0).toUpperCase();
    if (username) return username.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return "U";
  };

  const getRoleColor = (role: string) => {
    switch (role?.toUpperCase()) {
      case "ADMIN":
        return "bg-red-100 text-red-800 border-red-200";
      case "CUSTOMER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "INSPECTOR":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleSaveProfile = async (updatedUser: Partial<UserType>) => {
    try {
      const resultAction = await dispatch(editUserData(updatedUser)).unwrap();

      // Refresh user profile data after successful update
      await dispatch(getUserProfile()).unwrap();

      // Handle successful API response
      toast({
        title: "Berhasil",
        description: "Profil berhasil diperbarui.",
        variant: "default",
      });

      // Close the modal after successful update
      setIsEditModalOpen(false);
    } catch (error: any) {
      // Handle API error response
      let errorMessage = "Terjadi kesalahan saat memperbarui profil.";

      // Handle different error types
      if (typeof error === "string") {
        errorMessage = error;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      toast({
        title: "Gagal",
        description: errorMessage,
        variant: "destructive",
      });

      console.error("Failed to update profile:", error);
    }
  };

  const handleOpenEditModal = () => {
    // setIsEditModalOpen(true);
    toast({
      title: "Coming Soon",
      description: "Fitur akan segera hadir.",
      variant: "default",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Data pengguna tidak ditemukan
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Silakan login ulang untuk mengakses data akun Anda.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="-m-4 lg:-m-6 xl:-m-10 min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Akun Saya
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola informasi profil dan pengaturan akun Anda
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {getUserInitials(user.name, user.username, user.email)}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">
                    {user.name || user.username || "Pengguna"}
                  </CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={`${getRoleColor(user.role)} text-xs`}>
                      <Shield className="w-3 h-3 mr-1" />
                      {user.role || "USER"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              {/* Left Column */}
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2">
                  Informasi Pribadi
                </h3>

                {/* Full Name */}
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Nama Lengkap
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {user.name || "Belum diisi"}
                    </p>
                  </div>
                </div>

                {/* Username */}
                <div className="flex items-start space-x-3">
                  <User className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Username
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {user.username || "Belum diisi"}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Email
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 break-all">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* WhatsApp Number */}
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Nomor WhatsApp
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {user.whatsappNumber || "Belum diisi"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="p-6 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b pb-2">
                  Informasi Akun
                </h3>

                {/* Wallet Address */}
                <div className="flex items-start space-x-3">
                  <Wallet className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Alamat Wallet
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 break-all text-sm">
                      {user.walletAddress ? (
                        <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {user.walletAddress}
                        </code>
                      ) : (
                        "Belum diisi"
                      )}
                    </p>
                  </div>
                </div>

                {/* Registration Date */}
                <div className="flex items-start space-x-3">
                  <CalendarDays className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Tanggal Bergabung
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>

                {/* User ID */}
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      ID Pengguna
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {user.id}
                      </code>
                    </p>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-start space-x-3">
                  <CalendarDays className="w-5 h-5 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Terakhir Diperbarui
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatDate(user.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={handleOpenEditModal}
          >
            <CardContent className="p-6 text-center">
              <Edit3 className="w-8 h-8 text-orange-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Edit Profil
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Perbarui informasi pribadi dan pengaturan akun Anda
              </p>
            </CardContent>
          </Card>

          <Card
            className="hover:shadow-lg transition-shadow"
            onClick={handleOpenEditModal}
          >
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Keamanan
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Kelola kata sandi dan pengaturan keamanan akun
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Edit Account Modal */}
        {user && (
          <EditAccountModal
            user={user}
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveProfile}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default AccountDashboard;
