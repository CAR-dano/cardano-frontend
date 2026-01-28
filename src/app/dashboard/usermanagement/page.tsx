"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { AppDispatch, useAppSelector } from "../../../lib/store";
import {
  createAdminUser,
  createInspectorUser,
  deleteUser,
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
} from "react-icons/fa";
import { useToast } from "../../../components/ui/use-toast";
import { DeleteConfirmationDialog } from "../../../components/Dialog/DeleteConfirmationDialog";
import { InspectorPinDialog } from "../../../components/Dialog/InspectorPinDialog";

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
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [showPinDialog, setShowPinDialog] = useState(false);
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

  const filteredUsers = (userList as AdminUser[]).filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      (user.name || "").toLowerCase().includes(term) ||
      (user.email || "").toLowerCase().includes(term) ||
      (user.username || "").toLowerCase().includes(term) ||
      (user.role || "").toLowerCase().includes(term)
    );
  });

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
    });
    setSelectedRole(selectedUser.role || "");
    setIsEditing(false);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !accessToken) return;

    const updates: any = {};
    const isInspector = selectedUser.role === "INSPECTOR";
    const willBeInspector = selectedRole === "INSPECTOR";

    if (viewFormData.name !== (selectedUser.name || "")) {
      updates.name = viewFormData.name;
    }
    if (viewFormData.username !== (selectedUser.username || "")) {
      updates.username = viewFormData.username;
    }
    if (viewFormData.email !== (selectedUser.email || "")) {
      updates.email = viewFormData.email;
    }
    if (viewFormData.walletAddress !== (selectedUser.walletAddress || "")) {
      updates.walletAddress = viewFormData.walletAddress;
    }

    if (willBeInspector) {
      if (
        viewFormData.whatsappNumber !== (selectedUser.whatsappNumber || "")
      ) {
        updates.whatsappNumber = viewFormData.whatsappNumber || undefined;
      }
      if (
        viewFormData.inspectionBranchCityId !==
        (selectedUser.inspectionBranchCity?.id || "")
      ) {
        updates.inspectionBranchCityId = viewFormData.inspectionBranchCityId;
      }
      if ((selectedUser.isActive ?? true) !== viewFormData.isActive) {
        updates.isActive = viewFormData.isActive;
      }
    }

    try {
      if (selectedRole && selectedRole !== selectedUser.role) {
        await dispatch(
          updateRole({ id: selectedUser.id, role: selectedRole, token: accessToken })
        ).unwrap();
      }

      if (Object.keys(updates).length > 0) {
        if (willBeInspector) {
          await dispatch(
            updateInspector({ id: selectedUser.id, data: updates, token: accessToken })
          ).unwrap();
        } else {
          await dispatch(
            updateUser({ id: selectedUser.id, data: updates, token: accessToken })
          ).unwrap();
        }
      }

      toast({
        title: "User Updated",
        description: "User profile has been updated successfully.",
      });
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
                <DrawerTitle>
                  {isEditing ? "Edit User" : "User Details"}
                </DrawerTitle>
                <DrawerDescription>
                  {selectedUser.email || selectedUser.username}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4 space-y-4 max-h-[calc(100vh-220px)] overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
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
                  <Label htmlFor="edit-username">Username</Label>
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
                  <Label htmlFor="edit-email">Email</Label>
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
                  <Label htmlFor="edit-wallet">Wallet Address</Label>
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
                {(selectedUser.role === "INSPECTOR" || selectedRole === "INSPECTOR") && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="edit-whatsapp">WhatsApp Number</Label>
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
                      <Label htmlFor="edit-branch">Branch City</Label>
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
                      <Label htmlFor="edit-status">Status</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="edit-role">Role</Label>
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
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, role, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900">
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                User
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Email
              </TableHead>
              <TableHead className="text-left font-semibold text-gray-900 dark:text-gray-100 py-4 px-6">
                Role
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
                <TableCell colSpan={6} className="p-6">
                  <LoadingSkeleton rows={5} />
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16">
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
              filteredUsers.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                    index !== filteredUsers.length - 1
                      ? "border-b border-gray-100 dark:border-gray-700"
                      : ""
                  }`}
                >
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
  );
};

export default UserManagementPage;
