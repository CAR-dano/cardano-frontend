"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../lib/store";
import {
  fetchBranches,
  getAllInspectors,
} from "../../../lib/features/admin/adminSlice";
import { LoadingSkeleton } from "../../../components/Loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  FaUserTie,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaWhatsapp,
} from "react-icons/fa";
import { format } from "date-fns";
import apiClient from "@/lib/services/apiClient";
import { toast } from "@/hooks/use-toast";

const InspectorPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { inspectorList, isLoading, branches } = useAppSelector(
    (state) => state.admin
  );
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const branchs = useAppSelector((state) => state.admin.branches);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [inspectorToDelete, setInspectorToDelete] = useState<any>(null);
  const [selectedInspector, setSelectedInspector] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    whatsappNumber: "",
    inspectionBranchCityId: "",
  });

  // View/Edit form states
  const [viewFormData, setViewFormData] = useState({
    name: "",
    username: "",
    email: "",
    pin: "",
    status: "",
    createdAt: "",
    whatsappNumber: "",
  });

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllInspectors(accessToken));
      dispatch(fetchBranches());
    }
  }, [dispatch, accessToken]);

  const filteredInspectors = inspectorList.filter(
    (inspector) =>
      inspector.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspector.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inspector.branch &&
        inspector.branch.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Show loading state
      const loadingToast = toast({
        title: "Creating Inspector...",
        description: "Please wait while we create the new inspector account.",
      });

      // Format WhatsApp number to start with 62
      const formattedData = {
        ...formData,
        whatsappNumber: formData.whatsappNumber.startsWith("+62")
          ? formData.whatsappNumber
          : `+62${formData.whatsappNumber.replace(/^0+/, "")}`,
      };

      const response = await apiClient.post(
        "/admin/users/inspector",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Success notification
      toast({
        title: "✅ Inspektor Berhasil Ditambahkan",
        description: `Inspektur ${formData.name} telah dibuat dan sekarang dapat mulai bekerja`,
        duration: 5000,
      });

      // Close drawer and reset form
      setIsDrawerOpen(false);
      setFormData({
        name: "",
        username: "",
        email: "",
        whatsappNumber: "",
        inspectionBranchCityId: "",
      });

      // Refresh the inspector list
      if (accessToken) {
        dispatch(getAllInspectors(accessToken));
      }
    } catch (error: any) {
      console.error("Error creating inspector:", error);

      // Extract error message
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred while creating the inspector.";

      // Error notification
      toast({
        title: "❌ Failed to Create Inspector",
        description: errorMessage,
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  const handleViewInspector = (inspector: any) => {
    setSelectedInspector(inspector);
    setViewFormData({
      name: inspector.name || "",
      username: inspector.username || "",
      email: inspector.email || "",
      pin: inspector.pin || "****",
      status: inspector.status || "active",
      whatsappNumber: inspector.whatsappNumber || "",
      createdAt: inspector.createdAt
        ? format(new Date(inspector.createdAt), "dd MMM yyyy")
        : "-",
    });
    setIsEditing(false);
    setShowPin(false); // Reset PIN visibility when opening drawer
    setIsViewDrawerOpen(true);
  };

  const togglePinVisibility = () => {
    setShowPin(!showPin);
  };

  const handleEditMode = () => {
    console.log("Edit mode clicked"); // Debug log
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setShowPin(false); // Reset PIN visibility when canceling edit
    // Reset form data to original values
    if (selectedInspector) {
      setViewFormData({
        name: selectedInspector.name || "",
        username: selectedInspector.username || "",
        email: selectedInspector.email || "",
        pin: selectedInspector.pin || "****",
        status: selectedInspector.status || "active",
        whatsappNumber: selectedInspector.whatsappNumber || "",
        createdAt: selectedInspector.createdAt
          ? format(new Date(selectedInspector.createdAt), "dd MMM yyyy")
          : "-",
      });
    }
  };

  const handleUpdateInspector = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInspector) return;

    try {
      // Compare current form data with original inspector data to get only changed fields
      const changedData: any = {};

      if (viewFormData.name !== (selectedInspector.name || "")) {
        changedData.name = viewFormData.name;
      }

      if (viewFormData.username !== (selectedInspector.username || "")) {
        changedData.username = viewFormData.username;
      }

      if (viewFormData.email !== (selectedInspector.email || "")) {
        changedData.email = viewFormData.email;
      }

      if (viewFormData.pin !== (selectedInspector.pin || "****")) {
        changedData.pin = viewFormData.pin;
      }

      if (viewFormData.status !== (selectedInspector.status || "active")) {
        changedData.status = viewFormData.status;
      }

      if (
        viewFormData.whatsappNumber !== (selectedInspector.whatsappNumber || "")
      ) {
        // Format WhatsApp number to start with 62
        const formattedWhatsappNumber = viewFormData.whatsappNumber.startsWith(
          "+62"
        )
          ? viewFormData.whatsappNumber
          : `62${viewFormData.whatsappNumber.replace(/^0+/, "")}`;
        changedData.whatsappNumber = formattedWhatsappNumber;
      }

      // Only proceed if there are changes
      if (Object.keys(changedData).length === 0) {
        toast({
          title: "No Changes",
          description: "No changes were made to update.",
          variant: "default",
        });
        setIsEditing(false);
        return;
      }

      await apiClient.put(
        `/admin/users/inspector/${selectedInspector.id}`,
        changedData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast({
        title: "Inspektor Diperbarui",
        description: `Data inspektor telah berhasil diperbarui. ${
          Object.keys(changedData).length
        } field(s) changed.`,
      });

      setIsEditing(false);
      setIsViewDrawerOpen(false);

      // Refresh the inspector list
      if (accessToken) {
        dispatch(getAllInspectors(accessToken));
      }
    } catch (error) {
      console.error("Update error:", error);
      toast({
        title: "Pembaruan Gagal",
        description: "Gagal memperbarui data inspektor.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteInspector = async (inspectorId: string) => {
    if (!inspectorId) return;

    try {
      await apiClient.delete(`/admin/users/${inspectorId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast({
        title: "Inspector Deleted",
        description: "The inspector has been deleted successfully.",
        variant: "destructive",
      });

      // Refresh the inspector list
      if (accessToken) {
        dispatch(getAllInspectors(accessToken));
      }

      // Close dialog and reset state
      setIsDeleteDialogOpen(false);
      setInspectorToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the inspector.",
        variant: "destructive",
      });
    }
  };

  const openDeleteDialog = (inspector: any) => {
    setInspectorToDelete(inspector);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setInspectorToDelete(null);
  };

  const handleSendWhatsApp = () => {
    if (!selectedInspector || !selectedInspector.whatsappNumber) {
      toast({
        title: "Nomor WhatsApp Tidak Tersedia",
        description:
          "Inspector ini tidak memiliki nomor WhatsApp yang terdaftar.",
        variant: "destructive",
      });
      return;
    }

    // Format WhatsApp number - remove +62 if exists and ensure it starts with 62
    let phoneNumber = selectedInspector.whatsappNumber.toString();
    if (phoneNumber.startsWith("+62")) {
      phoneNumber = phoneNumber.substring(1); // Remove the + sign
    } else if (!phoneNumber.startsWith("62")) {
      phoneNumber = `62${phoneNumber.replace(/^0+/, "")}`;
    }

    // Create message template with inspector data
    const messageTemplate = `Halo ${selectedInspector.name || "Inspector"},

Berikut adalah data akun Inspector Anda:

📧 *Email:* ${selectedInspector.email || "-"}
🔐 *PIN:* ${selectedInspector.pin || "-"}

Silakan gunakan data di atas untuk login ke sistem Car-Dano Inspector.

Terima kasih.

---
*Pesan ini dikirim otomatis dari sistem Car-Dano Admin*`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(messageTemplate);

    // Create WhatsApp URL with pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className=" space-y-6  min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl shadow-lg">
            <FaUserTie className="text-3xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Manajemen Inspektor
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Kelola dan pantau semua personel inspeksi
            </p>
          </div>
        </div>

        {/* Add Inspector Button with Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
              <FaPlus className="mr-2" />
              Tambah Inspektor
            </Button>
          </DrawerTrigger>
          <DrawerContent className="sm:max-w-[425px] fixed right-0 top-0 bottom-0 left-auto">
            <form onSubmit={handleSubmit}>
              <DrawerHeader>
                <DrawerTitle>Tambah Inspektor Baru</DrawerTitle>
                <DrawerDescription>
                  Buat akun inspektor baru dengan detail yang diperlukan.
                </DrawerDescription>
              </DrawerHeader>
              <div className="mb-5  space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama inspektor"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Nama Pengguna</Label>
                  <Input
                    id="username"
                    placeholder="Masukkan username inspektor"
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="inspector@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Whatsapp</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        +62
                      </span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="8123456789"
                      value={formData.whatsappNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          whatsappNumber: e.target.value,
                        })
                      }
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    value={formData.inspectionBranchCityId}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        inspectionBranchCityId: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branchs.map((branch) => (
                        <SelectItem key={branch.id} value={branch.id}>
                          {branch.city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DrawerFooter>
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Buat Inspektor
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Batal
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <FaTrash className="text-lg" />
              Hapus Inspector
            </DialogTitle>
            <DialogDescription className="text-base">
              Apakah Anda yakin ingin menghapus inspector ini? Tindakan ini
              tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>

          {inspectorToDelete && (
            <div className="py-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                    <FaUserTie className="text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-red-900 dark:text-red-100">
                      {inspectorToDelete.name}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {inspectorToDelete.email}
                    </p>
                    {inspectorToDelete.branch && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Branch: {inspectorToDelete.branch}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5">
                    ⚠️
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                      Peringatan
                    </p>
                    <ul className="text-amber-800 dark:text-amber-200 space-y-1">
                      <li>
                        • Inspector ini tidak akan dapat mengakses sistem lagi
                      </li>
                      <li>• Semua riwayat inspeksi akan dipertahankan</li>
                      <li>• Tindakan ini tidak dapat dibatalkan</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={closeDeleteDialog}
              className="flex-1"
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                inspectorToDelete && handleDeleteInspector(inspectorToDelete.id)
              }
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <FaTrash className="mr-2 text-sm" />
              Hapus Inspector
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View/Edit Inspector Drawer */}
      <Drawer open={isViewDrawerOpen} onOpenChange={setIsViewDrawerOpen}>
        <DrawerContent className="sm:max-w-[425px] fixed right-0 top-0 bottom-0 left-auto">
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? "Edit Inspektor" : "Detail Inspektor"}
            </DrawerTitle>
            <DrawerDescription>
              {isEditing
                ? "Perbarui informasi inspektor di bawah."
                : "Lihat detail inspektor. Klik Edit untuk mengubah informasi."}
            </DrawerDescription>
          </DrawerHeader>

          {isEditing ? (
            <form onSubmit={handleUpdateInspector}>
              <div className="mb-5 space-y-4 px-4 my-10">
                <div className="space-y-2">
                  <Label htmlFor="view-name">Nama Lengkap</Label>
                  <Input
                    id="view-name"
                    value={viewFormData.name}
                    onChange={(e) =>
                      setViewFormData({ ...viewFormData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-username">Username</Label>
                  <Input
                    id="view-username"
                    value={viewFormData.username}
                    onChange={(e) =>
                      setViewFormData({
                        ...viewFormData,
                        username: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-email">Email</Label>
                  <Input
                    id="view-email"
                    type="email"
                    value={viewFormData.email}
                    onChange={(e) =>
                      setViewFormData({
                        ...viewFormData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-pin">PIN</Label>
                  <Input
                    id="view-pin"
                    type="text"
                    value={viewFormData.pin}
                    onChange={(e) =>
                      setViewFormData({ ...viewFormData, pin: e.target.value })
                    }
                    placeholder="Masukkan PIN"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-whatsapp">Nomor WhatsApp</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        +62
                      </span>
                    </div>
                    <Input
                      id="view-whatsapp"
                      type="tel"
                      value={viewFormData.whatsappNumber}
                      onChange={(e) =>
                        setViewFormData({
                          ...viewFormData,
                          whatsappNumber: e.target.value,
                        })
                      }
                      className="rounded-l-none"
                      placeholder="8123456789"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-status">Status</Label>
                  <Select
                    value={viewFormData.status}
                    onValueChange={(value) =>
                      setViewFormData({ ...viewFormData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Aktif</SelectItem>
                      <SelectItem value="inactive">Tidak Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-created">Dibuat Pada</Label>
                  <Input
                    id="view-created"
                    value={viewFormData.createdAt}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Perbarui Inspektor
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleCancelEdit}
                >
                  Batal
                </Button>
              </DrawerFooter>
            </form>
          ) : (
            <>
              <div className="mb-5 space-y-4 px-4 my-10">
                <div className="space-y-2">
                  <Label htmlFor="view-name">Nama Lengkap</Label>
                  <Input
                    id="view-name"
                    value={viewFormData.name}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-username">Username</Label>
                  <Input
                    id="view-username"
                    value={viewFormData.username}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-email">Email</Label>
                  <Input
                    id="view-email"
                    type="email"
                    value={viewFormData.email}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-pin">PIN</Label>
                  <div className="relative">
                    <Input
                      id="view-pin"
                      type={showPin ? "text" : "password"}
                      value={viewFormData.pin}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800 pr-10"
                    />
                    <button
                      type="button"
                      onClick={togglePinVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    >
                      {showPin ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-whatsapp-readonly">Nomor WhatsApp</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                        +62
                      </span>
                    </div>
                    <Input
                      id="view-whatsapp-readonly"
                      value={viewFormData.whatsappNumber}
                      readOnly
                      className="bg-gray-50 dark:bg-gray-800 rounded-l-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-status">Status</Label>
                  <Input
                    value={viewFormData.status}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800 capitalize"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-created">Dibuat Pada</Label>
                  <Input
                    id="view-created"
                    value={viewFormData.createdAt}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>
              <DrawerFooter className="flex flex-col gap-2">
                <Button
                  type="button"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleSendWhatsApp}
                >
                  <FaWhatsapp className="mr-2" />
                  Kirim Data
                </Button>
                <Button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleEditMode}
                >
                  <FaEdit className="mr-2" />
                  Edit Inspektor
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Tutup
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Total Inspektor
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {inspectorList.length}
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <FaUserTie className="text-xl text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari berdasarkan nama, email, atau cabang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900">
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Nama
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Email
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Status
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Dibuat Pada
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="p-6">
                  <LoadingSkeleton rows={5} />
                </TableCell>
              </TableRow>
            ) : filteredInspectors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 relative">
                        <svg
                          viewBox="0 0 96 96"
                          className="w-full h-full text-gray-300"
                          fill="currentColor"
                        >
                          <rect
                            x="8"
                            y="20"
                            width="80"
                            height="56"
                            rx="4"
                            className="fill-gray-200 dark:fill-gray-700"
                          />
                          <rect
                            x="12"
                            y="76"
                            width="4"
                            height="16"
                            className="fill-gray-300 dark:fill-gray-600"
                          />
                          <rect
                            x="80"
                            y="76"
                            width="4"
                            height="16"
                            className="fill-gray-300 dark:fill-gray-600"
                          />
                          <line
                            x1="8"
                            y1="32"
                            x2="88"
                            y2="32"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="8"
                            y1="44"
                            x2="88"
                            y2="44"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="8"
                            y1="56"
                            x2="88"
                            y2="56"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="8"
                            y1="68"
                            x2="88"
                            y2="68"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="24"
                            y1="20"
                            x2="24"
                            y2="76"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="48"
                            y1="20"
                            x2="48"
                            y2="76"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                          <line
                            x1="72"
                            y1="20"
                            x2="72"
                            y2="76"
                            strokeWidth="1"
                            className="stroke-gray-300 dark:stroke-gray-600"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700/50 rounded-full flex items-center justify-center">
                            <svg
                              className="w-4 h-4 text-gray-400 dark:text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center max-w-sm">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        Tidak ada inspektor ditemukan
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Saat ini tidak ada akun inspektor untuk ditampilkan.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          Akun inspektor baru akan muncul di sini setelah
                          dibuat.
                        </p>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredInspectors.map((inspector, index) => (
                <TableRow
                  key={inspector.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    index !== filteredInspectors.length - 1
                      ? "border-b border-gray-100 dark:border-gray-700"
                      : ""
                  }`}
                >
                  <TableCell className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    {inspector.name}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    {inspector.email}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        inspector.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {inspector.status || "active"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    {inspector.createdAt
                      ? format(new Date(inspector.createdAt), "dd MMM yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewInspector(inspector)}
                        className="inline-flex items-center px-3 py-1.5 border border-blue-300 dark:border-blue-600 shadow-sm text-xs font-medium rounded-md text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-800/20 hover:bg-blue-100 dark:hover:bg-blue-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <FaEye className="w-3 h-3 mr-1" />
                        Lihat
                      </button>
                      <button
                        onClick={() => openDeleteDialog(inspector)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
                        <FaTrash className="w-3 h-3 mr-1" />
                        Hapus
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InspectorPage;
