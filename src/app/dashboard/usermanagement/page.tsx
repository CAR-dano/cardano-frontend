"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { AppDispatch, useAppSelector } from "../../../lib/store";
import {
  createAdminUser,
  createInspectorUser,
  deleteUser,
  generateInspectorPin,
  getAllBranches,
  getAllUsers,
  updateInspector,
  updateRole,
  updateUser,
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
  FaUsers,
  FaSearch,
  FaPlus,
  FaEye,
  FaTrash,
  FaUserShield,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import { useToast } from "../../../components/ui/use-toast";
import { DeleteConfirmationDialog } from "../../../components/Dialog/DeleteConfirmationDialog";
import { InspectorPinDialog } from "../../../components/Dialog/InspectorPinDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

interface AdminUser {
  id: string;
  email: string | null;
  username: string | null;
  name: string | null;
  walletAddress: string | null;
  whatsappNumber?: string | null;
  role: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  inspectionBranchCity?: {
    id: string;
    city?: string | null;
    code?: string | null;
  } | null;
}

const UserManagementPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userList, isLoading, error, branchList } = useAppSelector(
    (state) => state.admin
  );
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const authUser = useAppSelector((state) => state.auth.user);
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [showPinDialog, setShowPinDialog] = useState(false);
  const [isPinConfirmOpen, setIsPinConfirmOpen] = useState(false);
  const [newInspectorData, setNewInspectorData] = useState<any>(null);

  const [createFormData, setCreateFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    walletAddress: "",
    whatsappNumber: "",
    inspectionBranchCityId: "",
  });

  const [viewFormData, setViewFormData] = useState({
    name: "",
    username: "",
    email: "",
    walletAddress: "",
    whatsappNumber: "",
    inspectionBranchCityId: "",
    isActive: true,
    pin: "",
  });

  const canCreateAdmin = authUser?.role === "SUPERADMIN";
  const availableCreateRoles = useMemo(() => {
    if (canCreateAdmin) {
      return ["ADMIN", "SUPERADMIN", "INSPECTOR"];
    }
    if (authUser?.role === "ADMIN") {
      return ["INSPECTOR"];
    }
    return [] as string[];
  }, [authUser?.role, canCreateAdmin]);

  const roleOptions = useMemo(() => {
    const roles = new Set<string>();
    (userList as AdminUser[]).forEach((user) => {
      if (user.role) roles.add(user.role);
    });
    return Array.from(roles).sort();
  }, [userList]);

  const branchOptions = useMemo(() => {
    return branchList
      .filter((branch) => branch.status === "active" || !branch.status)
      .map((branch) => ({
        id: branch.id,
        label: branch.city || branch.name || branch.id,
        code: branch.code,
      }));
  }, [branchList]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getAllUsers(accessToken));
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (
      (isCreateDrawerOpen || isViewDrawerOpen) &&
      branchList.length === 0 &&
      accessToken
    ) {
      dispatch(getAllBranches(accessToken));
    }
  }, [isCreateDrawerOpen, isViewDrawerOpen, branchList.length, accessToken, dispatch]);

  useEffect(() => {
    if (!createFormData.role && availableCreateRoles.length > 0) {
      setCreateFormData((prev) => ({
        ...prev,
        role: availableCreateRoles[0],
      }));
    }
  }, [availableCreateRoles, createFormData.role]);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const fromDate = dateFrom ? new Date(dateFrom).getTime() : null;
    const toDate = dateTo ? new Date(dateTo).getTime() : null;
    return (userList as AdminUser[]).filter((user) => {
      const matchesTerm =
        (user.name || "").toLowerCase().includes(term) ||
        (user.email || "").toLowerCase().includes(term) ||
        (user.username || "").toLowerCase().includes(term) ||
        (user.role || "").toLowerCase().includes(term);

      const matchesRole =
        roleFilter === "all" || (user.role || "").toLowerCase() === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? user.isActive : !user.isActive);

      const matchesBranch =
        branchFilter === "all" ||
        user.inspectionBranchCity?.id === branchFilter;

      const createdAtTime = user.createdAt
        ? new Date(user.createdAt).getTime()
        : null;

      const matchesDateRange =
        (!fromDate || (createdAtTime !== null && createdAtTime >= fromDate)) &&
        (!toDate || (createdAtTime !== null && createdAtTime <= toDate + 86400000));

      return (
        matchesTerm &&
        matchesRole &&
        matchesStatus &&
        matchesBranch &&
        matchesDateRange
      );
    });
  }, [userList, searchTerm, roleFilter, statusFilter, branchFilter, dateFrom, dateTo]);

  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers];
    const getValue = (user: AdminUser) => {
      switch (sortKey) {
        case "name":
          return user.name || "";
        case "email":
          return user.email || "";
        case "role":
          return user.role || "";
        case "status":
          return user.isActive ? 1 : 0;
        case "createdAt":
          return user.createdAt ? new Date(user.createdAt).getTime() : 0;
        case "updatedAt":
          return user.updatedAt ? new Date(user.updatedAt).getTime() : 0;
        default:
          return user.createdAt ? new Date(user.createdAt).getTime() : 0;
      }
    };

    sorted.sort((a, b) => {
      const aVal = getValue(a);
      const bVal = getValue(b);

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return sorted;
  }, [filteredUsers, sortKey, sortOrder]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(sortedUsers.length / pageSize));
  }, [sortedUsers.length, pageSize]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const activeUserCount = useMemo(() => {
    return (userList as AdminUser[]).filter((user) => user.isActive).length;
  }, [userList]);

  const adminUserCount = useMemo(() => {
    return (userList as AdminUser[]).filter((user) =>
      ["ADMIN", "SUPERADMIN"].includes(user.role)
    ).length;
  }, [userList]);

  const getRoleBadgeStyle = (role: string) => {
    switch (role?.toLowerCase()) {
      case "superadmin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "admin":
        return "bg-red-100 text-red-800 border-red-200";
      case "reviewer":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "inspector":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;

    try {
      if (createFormData.role === "INSPECTOR") {
        if (!createFormData.inspectionBranchCityId) {
          toast({
            title: "Branch Required",
            description: "Please select a branch for the inspector.",
            variant: "destructive",
          });
          return;
        }
        const payload = await dispatch(
          createInspectorUser({
            token: accessToken,
            data: {
              name: createFormData.name,
              username: createFormData.username,
              email: createFormData.email,
              inspectionBranchCityId: createFormData.inspectionBranchCityId,
              walletAddress: createFormData.walletAddress || undefined,
              whatsappNumber: createFormData.whatsappNumber || undefined,
            },
          })
        ).unwrap();

        setNewInspectorData(payload);
        setShowPinDialog(true);
      } else if (["ADMIN", "SUPERADMIN"].includes(createFormData.role)) {
        if (!createFormData.password) {
          toast({
            title: "Password Required",
            description: "Please provide a password for the admin user.",
            variant: "destructive",
          });
          return;
        }
        await dispatch(
          createAdminUser({
            token: accessToken,
            data: {
              username: createFormData.username,
              email: createFormData.email,
              password: createFormData.password,
              role: createFormData.role,
            },
          })
        ).unwrap();

        toast({
          title: "User Created",
          description: "Admin user has been created successfully.",
        });
      } else {
        toast({
          title: "Unsupported Role",
          description: "Selected role cannot be created from this page.",
          variant: "destructive",
        });
        return;
      }

      setIsCreateDrawerOpen(false);
      setCreateFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        role: availableCreateRoles[0] || "",
        walletAddress: "",
        whatsappNumber: "",
        inspectionBranchCityId: "",
      });
      dispatch(getAllUsers(accessToken));
    } catch (err: any) {
      toast({
        title: "Error",
        description: err || "Failed to create user.",
        variant: "destructive",
      });
    }
  };

  const handleViewUser = (user: AdminUser) => {
    setSelectedUser(user);
    setSelectedRole(user.role || "");
    setViewFormData({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      walletAddress: user.walletAddress || "",
      whatsappNumber: user.whatsappNumber || "",
      inspectionBranchCityId: user.inspectionBranchCity?.id || "",
      isActive: user.isActive ?? true,
      pin: "",
    });
    setIsEditing(false);
    setIsViewDrawerOpen(true);
  };

  const handleCancelEdit = () => {
    if (!selectedUser) return;
    setViewFormData({
      name: selectedUser.name || "",
      username: selectedUser.username || "",
      email: selectedUser.email || "",
      walletAddress: selectedUser.walletAddress || "",
      whatsappNumber: selectedUser.whatsappNumber || "",
      inspectionBranchCityId: selectedUser.inspectionBranchCity?.id || "",
      isActive: selectedUser.isActive ?? true,
      pin: "",
    });
    setSelectedRole(selectedUser.role || "");
    setIsEditing(false);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !accessToken) return;

    const willBeInspector = selectedRole === "INSPECTOR";
    const userUpdates: Record<string, any> = {};
    const inspectorUpdates: Record<string, any> = {};

    if (willBeInspector && !viewFormData.inspectionBranchCityId) {
      toast({
        title: "Branch Required",
        description: "Please select a branch for the inspector.",
        variant: "destructive",
      });
      return;
    }

    const nameChanged = viewFormData.name !== (selectedUser.name || "");
    const usernameChanged = viewFormData.username !== (selectedUser.username || "");
    const emailChanged = viewFormData.email !== (selectedUser.email || "");
    const walletChanged = viewFormData.walletAddress !== (selectedUser.walletAddress || "");

    if (willBeInspector) {
      if (nameChanged) inspectorUpdates.name = viewFormData.name;
      if (usernameChanged) inspectorUpdates.username = viewFormData.username;
      if (emailChanged) inspectorUpdates.email = viewFormData.email;
      if (walletChanged) inspectorUpdates.walletAddress = viewFormData.walletAddress;
    } else {
      if (nameChanged) userUpdates.name = viewFormData.name;
      if (usernameChanged) userUpdates.username = viewFormData.username;
      if (emailChanged) userUpdates.email = viewFormData.email;
      if (walletChanged) userUpdates.walletAddress = viewFormData.walletAddress;
    }

    if (viewFormData.pin) {
      if (viewFormData.pin.length < 6) {
        toast({
          title: "Invalid PIN",
          description: "PIN must be at least 6 characters.",
          variant: "destructive",
        });
        return;
      }
      userUpdates.pin = viewFormData.pin;
    }

    if (willBeInspector) {
      if (
        viewFormData.whatsappNumber !== (selectedUser.whatsappNumber || "")
      ) {
        inspectorUpdates.whatsappNumber = viewFormData.whatsappNumber || undefined;
      }
      if (
        viewFormData.inspectionBranchCityId !==
        (selectedUser.inspectionBranchCity?.id || "")
      ) {
        inspectorUpdates.inspectionBranchCityId = viewFormData.inspectionBranchCityId;
      }
      if ((selectedUser.isActive ?? true) !== viewFormData.isActive) {
        inspectorUpdates.isActive = viewFormData.isActive;
      }
    }

    try {
      if (selectedRole && selectedRole !== selectedUser.role) {
        await dispatch(
          updateRole({ id: selectedUser.id, role: selectedRole, token: accessToken })
        ).unwrap();
      }

      if (Object.keys(inspectorUpdates).length > 0 && willBeInspector) {
        await dispatch(
          updateInspector({ id: selectedUser.id, data: inspectorUpdates, token: accessToken })
        ).unwrap();
      }

      if (Object.keys(userUpdates).length > 0 && !willBeInspector) {
        await dispatch(
          updateUser({ id: selectedUser.id, data: userUpdates, token: accessToken })
        ).unwrap();
      }

      if (Object.keys(userUpdates).length > 0 && willBeInspector) {
        await dispatch(
          updateUser({ id: selectedUser.id, data: userUpdates, token: accessToken })
        ).unwrap();
      }

      toast({
        title: "User Updated",
        description: "User profile has been updated successfully.",
      });
      setViewFormData((prev) => ({ ...prev, pin: "" }));
      setIsEditing(false);
      setIsViewDrawerOpen(false);
      dispatch(getAllUsers(accessToken));
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err || "Failed to update user.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateInspectorPin = async () => {
    if (!selectedUser || !accessToken) return;
    try {
      const payload = await dispatch(
        generateInspectorPin({ id: selectedUser.id, token: accessToken })
      ).unwrap();
      setNewInspectorData(payload);
      setShowPinDialog(true);
      toast({
        title: "PIN Generated",
        description: "A new PIN has been generated for this inspector.",
      });
    } catch (err: any) {
      toast({
        title: "PIN Generation Failed",
        description: err || "Failed to generate PIN.",
        variant: "destructive",
      });
    }
  };

  const InfoTooltip = ({ text }: { text: string }) => (
    <span className="relative inline-flex items-center ml-2 group">
      <button
        type="button"
        aria-label={text}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
      >
        <FaInfoCircle className="w-4 h-4" />
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 z-50 w-56 rounded-md bg-gray-900 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition"
      >
        {text}
      </span>
    </span>
  );

  const handleDeleteClick = (user: AdminUser) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete || !accessToken) return;
    try {
      await dispatch(deleteUser({ id: userToDelete.id, token: accessToken })).unwrap();
      toast({
        title: "User Deleted",
        description: "User account has been deleted successfully.",
      });
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      dispatch(getAllUsers(accessToken));
    } catch (err: any) {
      toast({
        title: "Delete Failed",
        description: err || "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 text-lg font-medium">
              Error Loading Users
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{error}</p>
            <Button
              onClick={() => accessToken && dispatch(getAllUsers(accessToken))}
              className="mt-4"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">
      <InspectorPinDialog
        isOpen={showPinDialog}
        onClose={() => setShowPinDialog(false)}
        inspectorData={newInspectorData}
      />

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemName={userToDelete?.name || userToDelete?.email || "user"}
        itemType="user"
        isLoading={isLoading}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg">
            <FaUsers className="text-3xl text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage user access, roles, and profiles
            </p>
          </div>
        </div>

        <Drawer open={isCreateDrawerOpen} onOpenChange={setIsCreateDrawerOpen}>
          <DrawerTrigger asChild>
            <Button
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg"
              disabled={availableCreateRoles.length === 0}
            >
              <FaPlus className="mr-2" />
              Create User
            </Button>
          </DrawerTrigger>
          <DrawerContent className="sm:max-w-[480px] fixed right-0 top-0 bottom-0 left-auto">
            <form onSubmit={handleCreateSubmit}>
              <DrawerHeader>
                <DrawerTitle>Create New User</DrawerTitle>
                <DrawerDescription>
                  Add a new admin or inspector account.
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="create-role">Role</Label>
                  <Select
                    value={createFormData.role}
                    onValueChange={(value) =>
                      setCreateFormData({ ...createFormData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCreateRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {createFormData.role === "INSPECTOR" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Inspector name"
                        value={createFormData.name}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="inspector_username"
                        value={createFormData.username}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            username: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="inspector@company.com"
                        value={createFormData.email}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp Number</Label>
                      <Input
                        id="whatsapp"
                        placeholder="+6281234567890"
                        value={createFormData.whatsappNumber}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            whatsappNumber: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wallet">Wallet Address</Label>
                      <Input
                        id="wallet"
                        placeholder="addr1..."
                        value={createFormData.walletAddress}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            walletAddress: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch">Branch City</Label>
                      <Select
                        value={createFormData.inspectionBranchCityId}
                        onValueChange={(value) =>
                          setCreateFormData({
                            ...createFormData,
                            inspectionBranchCityId: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? (
                            <SelectItem value="loading" disabled>
                              Loading branches...
                            </SelectItem>
                          ) : branchList.length > 0 ? (
                            branchList
                              .filter(
                                (branch) =>
                                  branch.status === "active" || !branch.status
                              )
                              .map((branch) => (
                                <SelectItem key={branch.id} value={branch.id}>
                                  {branch.city || branch.name} {branch.code && `(${branch.code})`}
                                </SelectItem>
                              ))
                          ) : (
                            <SelectItem value="no-branches" disabled>
                              No branches available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="admin_username"
                        value={createFormData.username}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            username: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@company.com"
                        value={createFormData.email}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Minimum 8 characters"
                        value={createFormData.password}
                        onChange={(e) =>
                          setCreateFormData({
                            ...createFormData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </>
                )}
              </div>
              <DrawerFooter>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Create User
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

      {/* View/Edit Drawer */}
      <Drawer open={isViewDrawerOpen} onOpenChange={setIsViewDrawerOpen}>
        <DrawerContent className="sm:max-w-[480px] fixed right-0 top-0 bottom-0 left-auto">
          {selectedUser && (
            <form onSubmit={handleUpdateUser}>
              <DrawerHeader>
                <DrawerTitle>{isEditing ? "Edit User" : "User Details"}</DrawerTitle>
                <DrawerDescription>
                  {selectedUser.email || selectedUser.username}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-5 max-h-[calc(100vh-220px)] overflow-y-auto">
                <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white flex items-center justify-center font-semibold">
                      {(selectedUser.name || selectedUser.username || "U")
                        .split(" ")
                        .map((word) => word && word[0])
                        .filter(Boolean)
                        .join("")
                        .toUpperCase()
                        .slice(0, 2) || "U"}
                    </div>
                    <div>
                      <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {selectedUser.name || "Name not set"}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedUser.email || selectedUser.username}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs border ${getRoleBadgeStyle(
                          selectedUser.role || "USER"
                        )}`}
                      >
                        {selectedUser.role || "USER"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
                  <div className="text-xs uppercase text-gray-400 tracking-wider">Profile</div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-name" className="flex items-center">
                      Full Name
                      <InfoTooltip text="The user's full display name. Used for reports and dashboard." />
                    </Label>
                    <Input
                      id="edit-name"
                      value={viewFormData.name}
                      onChange={(e) =>
                        setViewFormData({ ...viewFormData, name: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-username" className="flex items-center">
                      Username
                      <InfoTooltip text="Unique username used for login (min 3 characters)." />
                    </Label>
                    <Input
                      id="edit-username"
                      value={viewFormData.username}
                      onChange={(e) =>
                        setViewFormData({
                          ...viewFormData,
                          username: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email" className="flex items-center">
                      Email
                      <InfoTooltip text="Primary email address for notifications and access." />
                    </Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={viewFormData.email}
                      onChange={(e) =>
                        setViewFormData({
                          ...viewFormData,
                          email: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-id" className="flex items-center">
                      User ID
                      <InfoTooltip text="System-generated unique identifier (read-only)." />
                    </Label>
                    <Input id="edit-id" value={selectedUser?.id || ""} disabled />
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
                  <div className="text-xs uppercase text-gray-400 tracking-wider">Access & Contact</div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-wallet" className="flex items-center">
                      Wallet Address
                      <InfoTooltip text="Cardano wallet address linked to this user (optional)." />
                    </Label>
                    <Input
                      id="edit-wallet"
                      value={viewFormData.walletAddress}
                      onChange={(e) =>
                        setViewFormData({
                          ...viewFormData,
                          walletAddress: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-updated" className="flex items-center">
                      Last Updated
                      <InfoTooltip text="Timestamp for the latest update (read-only)." />
                    </Label>
                    <Input
                      id="edit-updated"
                      value={
                        selectedUser?.updatedAt
                          ? format(new Date(selectedUser.updatedAt), "dd MMM yyyy, HH:mm")
                          : "-"
                      }
                      disabled
                    />
                  </div>

                  {(selectedUser.role === "INSPECTOR" || selectedRole === "INSPECTOR") && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="edit-whatsapp" className="flex items-center">
                          WhatsApp Number
                          <InfoTooltip text="Must start with +62 and be 12–16 digits." />
                        </Label>
                        <Input
                          id="edit-whatsapp"
                          value={viewFormData.whatsappNumber}
                          onChange={(e) =>
                            setViewFormData({
                              ...viewFormData,
                              whatsappNumber: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-pin" className="flex items-center">
                          Inspector PIN (new)
                          <InfoTooltip text="Set a new 6-digit PIN for inspector login. Leave blank to keep current PIN." />
                        </Label>
                        <Input
                          id="edit-pin"
                          type="password"
                          placeholder="Enter new PIN (6 digits)"
                          value={viewFormData.pin}
                          onChange={(e) =>
                            setViewFormData({
                              ...viewFormData,
                              pin: e.target.value,
                            })
                          }
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-branch" className="flex items-center">
                          Branch City
                          <InfoTooltip text="Select the inspection branch assigned to this inspector." />
                        </Label>
                        <Select
                          value={viewFormData.inspectionBranchCityId}
                          onValueChange={(value) =>
                            setViewFormData({
                              ...viewFormData,
                              inspectionBranchCityId: value,
                            })
                          }
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {isLoading ? (
                              <SelectItem value="loading" disabled>
                                Loading branches...
                              </SelectItem>
                            ) : branchList.length > 0 ? (
                              branchList
                                .filter(
                                  (branch) =>
                                    branch.status === "active" || !branch.status
                                )
                                .map((branch) => (
                                  <SelectItem key={branch.id} value={branch.id}>
                                    {branch.city || branch.name} {branch.code && `(${branch.code})`}
                                  </SelectItem>
                                ))
                            ) : (
                              <SelectItem value="no-branches" disabled>
                                No branches available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-status" className="flex items-center">
                          Status
                          <InfoTooltip text="Active users can access the system. Inactive users are blocked." />
                        </Label>
                        <Select
                          value={viewFormData.isActive ? "active" : "inactive"}
                          onValueChange={(value) =>
                            setViewFormData({
                              ...viewFormData,
                              isActive: value === "active",
                            })
                          }
                          disabled={!isEditing}
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
                    </>
                  )}
                </div>

                <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 space-y-4">
                  <div className="text-xs uppercase text-gray-400 tracking-wider">Role</div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-role" className="flex items-center">
                      Role
                      <InfoTooltip text="Controls permissions within the dashboard." />
                    </Label>
                    <Select
                      value={selectedRole}
                      onValueChange={setSelectedRole}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {["SUPERADMIN", "ADMIN", "REVIEWER", "INSPECTOR", "CUSTOMER", "DEVELOPER"].map(
                          (role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DrawerFooter>
                {isEditing ? (
                  <>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                      Save Changes
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    {(selectedUser.role === "INSPECTOR" || selectedRole === "INSPECTOR") && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsPinConfirmOpen(true)}
                      >
                        Generate New PIN
                      </Button>
                    )}
                    <Button
                      type="button"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit User
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline" className="w-full">
                        Close
                      </Button>
                    </DrawerClose>
                  </>
                )}
              </DrawerFooter>
            </form>
          )}
        </DrawerContent>
      </Drawer>

      <AlertDialog open={isPinConfirmOpen} onOpenChange={setIsPinConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Generate new PIN?</AlertDialogTitle>
            <AlertDialogDescription>
              This will invalidate the current PIN and immediately replace it.
              The new PIN must be shared securely with the inspector. Continue
              only if you understand the risk.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsPinConfirmOpen(false);
                handleGenerateInspectorPin();
              }}
            >
              Generate PIN
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Total Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userList.length}
                </p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <FaUsers className="text-xl text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeUserCount}
                </p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <FaCheckCircle className="text-xl text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Admin Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {adminUserCount}
                </p>
              </div>
              <div className="p-3 bg-orange-500 rounded-lg">
                <FaUserShield className="text-xl text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/80 backdrop-blur">
        <CardContent className="p-4 md:p-6 space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-lg">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, role, or username..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setRoleFilter("all");
                  setStatusFilter("all");
                  setBranchFilter("all");
                  setDateFrom("");
                  setDateTo("");
                  setPage(1);
                }}
              >
                Reset Filters
              </Button>
              <div className="min-w-[130px]">
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Rows" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20, 50].map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size} / page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label className="text-xs text-gray-500">Role</Label>
              <Select
                value={roleFilter}
                onValueChange={(value) => {
                  setRoleFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roleOptions.length > 0
                    ? roleOptions.map((role) => (
                        <SelectItem key={role} value={role.toLowerCase()}>
                          {role}
                        </SelectItem>
                      ))
                    : [
                        "SUPERADMIN",
                        "ADMIN",
                        "REVIEWER",
                        "INSPECTOR",
                        "CUSTOMER",
                        "DEVELOPER",
                      ].map((role) => (
                        <SelectItem key={role} value={role.toLowerCase()}>
                          {role}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-gray-500">Status</Label>
              <Select
                value={statusFilter}
                onValueChange={(value) => {
                  setStatusFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-gray-500">Branch</Label>
              <Select
                value={branchFilter}
                onValueChange={(value) => {
                  setBranchFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {branchOptions.length > 0 ? (
                    branchOptions.map((branch) => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.label} {branch.code ? `(${branch.code})` : ""}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No branches available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-gray-500">From</Label>
                <Input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => {
                    setDateFrom(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">To</Label>
                <Input
                  type="date"
                  value={dateTo}
                  onChange={(e) => {
                    setDateTo(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {paginatedUsers.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No users found
          </div>
        ) : (
          paginatedUsers.map((user, index) => (
            <Card key={user.id} className="border-0 shadow-md">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {(user.name || user.username || "U")
                      .split(" ")
                      .map((word) => word && word[0])
                      .filter(Boolean)
                      .join("")
                      .toUpperCase()
                      .slice(0, 2) || "U"}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {user.name || "Name not set"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email || "No email"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                  <span className={`px-2 py-1 rounded-full border ${getRoleBadgeStyle(user.role || "USER")}`}>
                    {user.role || "USER"}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                  <span>
                    #{(page - 1) * pageSize + index + 1}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Created: {user.createdAt ? format(new Date(user.createdAt), "dd MMM yyyy") : "-"}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleViewUser(user)}
                  >
                    View
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Table */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900">
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6 w-[70px]">
                #
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2"
                  onClick={() => toggleSort("name")}
                >
                  User
                  <span className="text-xs text-gray-400">
                    {sortKey === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                  </span>
                </button>
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2"
                  onClick={() => toggleSort("email")}
                >
                  Email
                  <span className="text-xs text-gray-400">
                    {sortKey === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                  </span>
                </button>
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2"
                  onClick={() => toggleSort("role")}
                >
                  Role
                  <span className="text-xs text-gray-400">
                    {sortKey === "role" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                  </span>
                </button>
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2"
                  onClick={() => toggleSort("status")}
                >
                  Status
                  <span className="text-xs text-gray-400">
                    {sortKey === "status" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                  </span>
                </button>
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2"
                  onClick={() => toggleSort("createdAt")}
                >
                  Created At
                  <span className="text-xs text-gray-400">
                    {sortKey === "createdAt" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                  </span>
                </button>
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
            ) : paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-16">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="mb-6">
                      <FaUsers className="h-12 w-12 text-gray-300" />
                    </div>
                    <p className="text-sm font-medium">No users found</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Try adjusting your search or create a new user.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    index !== paginatedUsers.length - 1
                      ? "border-b border-gray-100 dark:border-gray-700"
                      : ""
                  }`}
                >
                  <TableCell className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    {(page - 1) * pageSize + index + 1}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                        {(user.name || user.username || "U")
                          .split(" ")
                          .map((word) => word && word[0])
                          .filter(Boolean)
                          .join("")
                          .toUpperCase()
                          .slice(0, 2) || "U"}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          {user.name || "Name not set"}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.username || "username"}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-700 dark:text-gray-200">
                    {user.email || "No email"}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeStyle(
                        user.role || "USER"
                      )}`}
                    >
                      {user.role || "USER"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        user.isActive
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-gray-600 dark:text-gray-300">
                    {user.createdAt
                      ? format(new Date(user.createdAt), "dd MMM yyyy")
                      : "-"}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="inline-flex items-center px-3 py-1.5 border border-blue-300 dark:border-blue-600 shadow-sm text-xs font-medium rounded-md text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-800/20 hover:bg-blue-100 dark:hover:bg-blue-700/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        <FaEye className="w-3 h-3 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="inline-flex items-center px-3 py-1.5 border border-red-300 shadow-sm text-xs font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      >
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

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {sortedUsers.length === 0
            ? "Showing 0–0 of 0"
            : `Showing ${(page - 1) * pageSize + 1}–${Math.min(
                page * pageSize,
                sortedUsers.length
              )} of ${sortedUsers.length}`}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <div className="px-3 py-2 text-sm text-gray-700 dark:text-gray-200">
            Page {page} of {totalPages}
          </div>
          <Button
            variant="outline"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
