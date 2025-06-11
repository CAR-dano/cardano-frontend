import axios from "axios";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getDataForReview = async ({
  page = 1,
  pageSize = 10,
  status,
}: {
  page?: number;
  pageSize?: number;
  status?: string;
} = {}) => {
  const params: any = { page, pageSize };
  if (status) params.status = status;
  const response = await axios.get(`${LOCAL_API_URL}/inspections`, {
    params,
  });
  return response.data;
};

const getDataForPreview = async (id: string) => {
  const response = await axios.get(`${LOCAL_API_URL}/inspections/${id}`, {});
  return response.data;
};

const getDataForReviewById = async (id: string) => {
  const response = await axios.get(`${LOCAL_API_URL}/inspections/${id}`, {});
  return response.data;
};

const approveInspectionData = async (id: string) => {
  const response = await axios.patch(
    `${LOCAL_API_URL}/inspections/${id}/approve`
  );
  return response.data;
};

const getDataEdited = async (id: string, token: string) => {
  const response = await axios.get(
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
  const response = await axios.put(`${LOCAL_API_URL}/inspections/${id}`, data);
  return response.data;
};

const mintingToBlockchain = async (id: string) => {
  const response = await axios.put(
    `${LOCAL_API_URL}/inspections/${id}/archive`,
    {}
  );
  return response.data;
};

const searchByVehiclePlat = async (platNumber: string) => {
  const response = await axios.get(
    `${LOCAL_API_URL}/inspections/search?vehicleNumber=${platNumber}`
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

  const response = await axios.put(
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

const inspectionService = {
  getDataForReview,
  getDataForPreview,
  getDataForReviewById,
  approveInspectionData,
  getDataEdited,
  saveChanges,
  mintingToBlockchain,
  searchByVehiclePlat,
  updatePhoto,
};
export default inspectionService;
