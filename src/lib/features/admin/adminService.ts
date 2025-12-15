import apiClient from "../../../lib/services/apiClient";
const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllUsers = async (token: string) => {
  const response = await apiClient.get(`${LOCAL_API_URL}/admin/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateRole = async (id: string, role: string, token: string) => {
  const response = await apiClient.put(
    `${LOCAL_API_URL}/admin/users/${id}/role`,
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

const getAllInspectors = async (token: string) => {
  const response = await apiClient.get(
    `${LOCAL_API_URL}/admin/users/inspectors`,
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
  const response = await apiClient.get(`${LOCAL_API_URL}/inspection-branches`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteInspector = async (id: string, token: string) => {
  const response = await apiClient.delete(
    `${LOCAL_API_URL}/admin/users/${id}`,
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

const generateInspectorPin = async (id: string, token: string) => {
  const response = await apiClient.post(
    `${LOCAL_API_URL}/admin/users/inspector/${id}/generate-pin`,
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

const adminService = {
  getAllUsers,
  updateRole,
  getAllInspectors,
  getAllBranches,
  deleteInspector,
  generateInspectorPin,
};
export default adminService;
