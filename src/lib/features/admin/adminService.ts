import apiClient from "../../../lib/services/apiClient";

const getAllUsers = async (token: string) => {
  const response = await apiClient.get("/admin/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateRole = async (id: string, role: string, token: string) => {
  const response = await apiClient.put(
    `/admin/users/${id}/role`,
    { role },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const createAdminUser = async (
  data: { username: string; email: string; password: string; role: string },
  token: string
) => {
  const response = await apiClient.post(
    "/admin/users/admin-user",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const createInspectorUser = async (
  data: {
    name: string;
    username: string;
    email: string;
    inspectionBranchCityId: string;
    walletAddress?: string;
    whatsappNumber?: string;
  },
  token: string
) => {
  const response = await apiClient.post(
    "/admin/users/inspector",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const updateUser = async (
  id: string,
  data: {
    name?: string;
    username?: string;
    email?: string;
    walletAddress?: string;
    pin?: string;
  },
  token: string
) => {
  const response = await apiClient.put(
    `/admin/users/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const updateInspector = async (
  id: string,
  data: {
    name?: string;
    username?: string;
    email?: string;
    walletAddress?: string;
    whatsappNumber?: string;
    inspectionBranchCityId?: string;
    isActive?: boolean;
  },
  token: string
) => {
  const response = await apiClient.put(
    `/admin/users/inspector/${id}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getAllInspectors = async (token: string) => {
  const response = await apiClient.get(
    "/admin/users/inspectors",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getAllBranches = async (token: string) => {
  const response = await apiClient.get("/inspection-branches", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteInspector = async (id: string, token: string) => {
  const response = await apiClient.delete(
    `/admin/users/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Only return the status since there's no response body
  return response.status;
};

const deleteUser = async (id: string, token: string) => {
  const response = await apiClient.delete(
    `/admin/users/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.status;
};

const generateInspectorPin = async (id: string, token: string) => {
  const response = await apiClient.post(
    `/admin/users/inspector/${id}/generate-pin`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const createBranch = async (city: string, token: string) => {
  const response = await apiClient.post(
    `/inspection-branches`,
    { city },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const adminService = {
  getAllUsers,
  updateRole,
  createAdminUser,
  createInspectorUser,
  updateUser,
  updateInspector,
  getAllInspectors,
  getAllBranches,
  deleteInspector,
  deleteUser,
  generateInspectorPin,
  createBranch,
};
export default adminService;
