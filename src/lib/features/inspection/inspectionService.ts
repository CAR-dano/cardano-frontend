import apiClient from "@/lib/services/apiClient";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getDataForReview = async ({
  page = 1,
  pageSize = 10,
  status,
  token,
}: {
  page?: number;
  pageSize?: number;
  status?: string;
  token?: string;
} = {}) => {
  const params: any = { page, pageSize };
  if (status) params.status = status;
  const response = await apiClient.get(`${LOCAL_API_URL}/inspections`, {
    params,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getDataForPreview = async (id: string) => {
  const response = await apiClient.get(
    `${LOCAL_API_URL}/inspections/${id}`,
    {}
  );
  return response.data;
};

const getDataForReviewById = async (id: string) => {
  const response = await apiClient.get(
    `${LOCAL_API_URL}/inspections/${id}`,
    {}
  );
  return response.data;
};

const approveInspectionData = async (id: string) => {
  const response = await apiClient.patch(
    `${LOCAL_API_URL}/inspections/${id}/approve`
  );
  return response.data;
};

const getDataEdited = async (id: string, token: string) => {
  const response = await apiClient.get(
    `${LOCAL_API_URL}/inspections/${id}/changelog`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const saveChanges = async (id: any, data: any) => {
  const response = await apiClient.put(
    `${LOCAL_API_URL}/inspections/${id}`,
    data
  );
  return response.data;
};

const mintingToBlockchain = async (id: string) => {
  const response = await apiClient.put(
    `${LOCAL_API_URL}/inspections/${id}/archive`,
    {}
  );
  return response.data;
};

const searchByVehiclePlat = async (platNumber: string, token: any) => {
  const response = await apiClient.get(
    `${LOCAL_API_URL}/inspections/search?vehicleNumber=${platNumber}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const searchByKeyword = async (keyword: string, page = 1, pageSize = 10) => {
  const response = await apiClient.get(
    `${LOCAL_API_URL}/inspections/search/keyword?q=${encodeURIComponent(
      keyword
    )}`,
    {
      params: { page, pageSize },
    }
  );
  return response.data;
};

interface EditPartPhoto {
  needAttention?: boolean;
  label?: string;
  displayInPdf?: boolean;
}

const updatePhoto = async (
  id: string,
  photosId: string,
  data: EditPartPhoto
) => {
  const formData = new FormData();

  if (data.needAttention !== undefined) {
    formData.append("needAttention", data.needAttention.toString());
  }

  if (data.label !== undefined) {
    formData.append("label", data.label);
  }

  if (data.displayInPdf !== undefined) {
    formData.append("displayInPdf", data.displayInPdf.toString());
  }

  const response = await apiClient.put(
    `${LOCAL_API_URL}/inspections/${id}/photos/${photosId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

const returnToReview = async (id: string) => {
  const response = await apiClient.patch(
    `${LOCAL_API_URL}/inspections/${id}/return-to-review`
  );
  return response.data;
};

const markAsApproved = async (id: string) => {
  const response = await apiClient.patch(
    `${LOCAL_API_URL}/inspections/${id}/approve`
  );
  return response.data;
};

const inspectionService = {
  getDataForReview,
  getDataForPreview,
  getDataForReviewById,
  approveInspectionData,
  getDataEdited,
  saveChanges,
  mintingToBlockchain,
  searchByVehiclePlat,
  searchByKeyword,
  updatePhoto,
  returnToReview,
  markAsApproved,
};
export default inspectionService;
