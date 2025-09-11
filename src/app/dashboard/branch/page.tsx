"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../lib/store";
import { fetchBranches } from "../../../lib/features/admin/adminSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Card, CardContent } from "../../../components/ui/card";
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
import { LoadingSkeleton } from "../../../components/Loading";
import { FaBuilding, FaSearch, FaPlus, FaMapMarkerAlt } from "react-icons/fa";
import { useToast } from "../../../components/ui/use-toast";
import apiClient from "@/lib/services/apiClient";

export default function BranchPage() {
  const dispatch = useAppDispatch();
  const { branches, loading, error } = useAppSelector((state) => state.admin);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<any>(null);
  const { toast } = useToast();

  // Form states
  const [formData, setFormData] = useState({
    city: "",
  });

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const filteredBranches = branches.filter(
    (branch) =>
      (branch.code &&
        branch.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (branch.city &&
        branch.city.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Show loading state
      const loadingToast = toast({
        title: "Creating Branch...",
        description: "Please wait while we create the new branch.",
      });

      const response = await apiClient.post("/inspection-branches", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Branch created:", response.data);

      // Success notification
      toast({
        title: "✅ Branch Added Successfully",
        description: `Branch in ${formData.city} has been created and is ready for operations.`,
        duration: 5000,
      });

      // Close drawer and reset form
      setIsDrawerOpen(false);
      setFormData({
        city: "",
      });

      // Refresh the branch list
      dispatch(fetchBranches());
    } catch (error: any) {
      console.error("Error creating branch:", error);

      // Extract error message
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred while creating the branch.";

      // Error notification
      toast({
        title: "❌ Failed to Create Branch",
        description: errorMessage,
        variant: "destructive",
        duration: 7000,
      });
    }
  };

  const handleDeleteBranch = async (branchId: string) => {
    if (!branchId) return;

    try {
      await apiClient.delete(`/inspection-branches/${branchId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast({
        title: "Branch Deleted",
        description: "The branch has been deleted successfully.",
        variant: "destructive",
      });

      // Refresh the branch list
      dispatch(fetchBranches());

      // Close dialog and reset state
      setIsDeleteDialogOpen(false);
      setBranchToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the branch.",
        variant: "destructive",
      });
    }
  };

  const openDeleteDialog = (branch: any) => {
    setBranchToDelete(branch);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setBranchToDelete(null);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 text-lg font-medium">
              Error Loading Branches
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{error}</p>
            <Button onClick={() => dispatch(fetchBranches())} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6  min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl shadow-lg">
            <FaBuilding className="text-3xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Branch Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage and monitor all inspection branches
            </p>
          </div>
        </div>

        {/* Add Branch Button with Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
              <FaPlus className="mr-2" />
              Add Branch
            </Button>
          </DrawerTrigger>
          <DrawerContent className="sm:max-w-[425px] fixed right-0 top-0 bottom-0 left-auto">
            <form onSubmit={handleSubmit}>
              <DrawerHeader>
                <DrawerTitle>Add New Branch</DrawerTitle>
                <DrawerDescription>
                  Create a new inspection branch by selecting a city.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 py-5 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto mb-10 ">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Create Branch
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Total Branches
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {branches.length}
                </p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <FaBuilding className="text-xl text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Cities
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(branches.map((b) => b.city).filter(Boolean)).size}
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <FaMapMarkerAlt className="text-xl text-white" />
              </div>
            </div>
          </CardContent>
        </Card> */}
        {/* 
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Cities
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(branches.map((b) => b.city).filter(Boolean)).size}
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <FaMapMarkerAlt className="text-xl text-white" />
              </div>
            </div>
          </CardContent>
        </Card> */}

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-6">
            {/* <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  This Month
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {
                    branches.filter((b) => {
                      if (!b.createdAt) return false;
                      const date = new Date(b.createdAt);
                      const now = new Date();
                      return (
                        date.getMonth() === now.getMonth() &&
                        date.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
              <div className="p-3 bg-orange-500 rounded-lg">
                <FaPlus className="text-xl text-white" />
              </div>
            </div> */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Cities
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(branches.map((b) => b.city).filter(Boolean)).size}
                </p>
              </div>
              <div className="p-3 bg-orange-500 rounded-lg">
                <FaMapMarkerAlt className="text-xl text-white" />
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
          placeholder="Cari berdasarkan nama, kode, atau kota..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900">
              {/* <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Branch Name
              </TableHead> */}
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Kode Cabang
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Kota
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Status
              </TableHead>

              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="p-6">
                  <LoadingSkeleton rows={5} />
                </TableCell>
              </TableRow>
            ) : filteredBranches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16">
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
                        Tidak ada cabang yang ditemukan
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Saat ini tidak ada akun cabang yang ditampilkan.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          Akun cabang baru akan muncul di sini setelah dibuat.
                        </p>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredBranches.map((branch, index) => (
                <TableRow
                  key={branch.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    index !== filteredBranches.length - 1
                      ? "border-b border-gray-100 dark:border-gray-700"
                      : ""
                  }`}
                >
                  {/* <TableCell className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <FaBuilding className="text-gray-400" />
                      {branch.name}
                    </div>
                  </TableCell> */}
                  <TableCell className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs font-medium">
                      {branch.code || "-"}
                    </span>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400 text-xs" />
                      {branch.city || "-"}
                    </div>
                  </TableCell>

                  <TableCell className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        branch.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {branch.status || "Active"}
                    </span>
                  </TableCell>

                  <TableCell className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openDeleteDialog(branch)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <FaTrash className="text-lg" />
              Hapus Branch
            </DialogTitle>
            <DialogDescription className="text-base">
              Apakah Anda yakin ingin menghapus branch ini? Tindakan ini tidak
              dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>

          {branchToDelete && (
            <div className="py-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                    <FaBuilding className="text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-red-900 dark:text-red-100">
                      {branchToDelete.city}
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Kode: {branchToDelete.code || "N/A"}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      Status: {branchToDelete.status || "Aktif"}
                    </p>
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
                        • Semua inspector yang ditugaskan ke branch ini akan
                        terpengaruh
                      </li>
                      <li>
                        • Branch ini tidak akan tersedia lagi untuk inspeksi
                        baru
                      </li>
                      <li>
                        • Data historis akan dipertahankan tetapi branch akan
                        dihapus
                      </li>
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
                branchToDelete && handleDeleteBranch(branchToDelete.id)
              }
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              <FaTrash className="mr-2 text-sm" />
              Hapus Branch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
