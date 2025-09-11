"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../lib/store";
import { getAllInspectors } from "../../../lib/features/admin/adminSlice";
import { LoadingSkeleton } from "../../../components/Loading";
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
} from "react-icons/fa";
import { format } from "date-fns";
import { useToast } from "../../../components/ui/use-toast";
import apiClient from "@/lib/services/apiClient";

const InspectorPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { inspectorList, isLoading } = useAppSelector((state) => state.admin);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [selectedInspector, setSelectedInspector] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const { toast } = useToast();

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  // View/Edit form states
  const [viewFormData, setViewFormData] = useState({
    name: "",
    username: "",
    email: "",
    pin: "",
    status: "",
    createdAt: "",
  });

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllInspectors(accessToken));
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
    apiClient.post("/admin/users/inspector", formData, {}).then(() => {
      toast({
        title: "Inspector Added",
        description: "New inspector has been added successfully.",
      });
      setIsDrawerOpen(false);
      setFormData({
        name: "",
        username: "",
        email: "",
      });
    });
  };

  const handleViewInspector = (inspector: any) => {
    setSelectedInspector(inspector);
    setViewFormData({
      name: inspector.name || "",
      username: inspector.username || "",
      email: inspector.email || "",
      pin: inspector.pin || "****",
      status: inspector.status || "active",
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
        title: "Inspector Updated",
        description: `Inspector data has been updated successfully. ${
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
        title: "Update Failed",
        description: "Failed to update inspector data.",
        variant: "destructive",
      });
    }
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
              Inspector Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage and monitor all inspection personnel
            </p>
          </div>
        </div>

        {/* Add Inspector Button with Drawer */}
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
              <FaPlus className="mr-2" />
              Add Inspector
            </Button>
          </DrawerTrigger>
          <DrawerContent className="sm:max-w-[425px] fixed right-0 top-0 bottom-0 left-auto">
            <form onSubmit={handleSubmit}>
              <DrawerHeader>
                <DrawerTitle>Add New Inspector</DrawerTitle>
                <DrawerDescription>
                  Create a new inspector account with the required details.
                </DrawerDescription>
              </DrawerHeader>
              <div className="mb-5  space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter inspector name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter inspector username"
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

                {/* <div className="space-y-2">
                  <Label htmlFor="branch">Branch</Label>
                  <Select
                    value={formData.branch}
                    onValueChange={(value) =>
                      setFormData({ ...formData, branch: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jakarta">Jakarta</SelectItem>
                      <SelectItem value="surabaya">Surabaya</SelectItem>
                      <SelectItem value="bandung">Bandung</SelectItem>
                      <SelectItem value="medan">Medan</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
              </div>
              <DrawerFooter>
                <Button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  Create Inspector
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

      {/* View/Edit Inspector Drawer */}
      <Drawer open={isViewDrawerOpen} onOpenChange={setIsViewDrawerOpen}>
        <DrawerContent className="sm:max-w-[425px] fixed right-0 top-0 bottom-0 left-auto">
          <DrawerHeader>
            <DrawerTitle>
              {isEditing ? "Edit Inspector" : "Inspector Details"}
            </DrawerTitle>
            <DrawerDescription>
              {isEditing
                ? "Update inspector information below."
                : "View inspector details. Click Edit to modify information."}
            </DrawerDescription>
          </DrawerHeader>

          {isEditing ? (
            <form onSubmit={handleUpdateInspector}>
              <div className="mb-5 space-y-4 px-4">
                <div className="space-y-2">
                  <Label htmlFor="view-name">Full Name</Label>
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
                    placeholder="Enter PIN"
                  />
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
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-created">Created At</Label>
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
                  Update Inspector
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              </DrawerFooter>
            </form>
          ) : (
            <>
              <div className="mb-5 space-y-4 px-4">
                <div className="space-y-2">
                  <Label htmlFor="view-name">Full Name</Label>
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
                  <Label htmlFor="view-status">Status</Label>
                  <Input
                    value={viewFormData.status}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800 capitalize"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="view-created">Created At</Label>
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
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleEditMode}
                >
                  <FaEdit className="mr-2" />
                  Edit Inspector
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="w-full">
                    Close
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
                  Total Inspectors
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

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Active
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {inspectorList.filter((i) => i.status === "active").length}
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <FaUserTie className="text-xl text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Branches
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {
                    new Set(inspectorList.map((i) => i.branch).filter(Boolean))
                      .size
                  }
                </p>
              </div>
              <div className="p-3 bg-orange-500 rounded-lg">
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
          placeholder="Search by name, email, or branch..."
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
                Name
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Email
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Status
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Created At
              </TableHead>
              <TableHead className="text-center font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Actions
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
                        No inspectors found
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        There are no inspector accounts to display at this time.
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                        <p className="text-xs text-blue-800 dark:text-blue-200">
                          New inspector accounts will appear here after they are
                          created.
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
                        View
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                        <FaTrash className="w-3 h-3 mr-1" />
                        Delete
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
