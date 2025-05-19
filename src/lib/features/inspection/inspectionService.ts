// import { Hasil } from "@/utils/Car";
import axios from "axios";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const getDataForReview = async () => {
  const response = await axios.get(`${LOCAL_API_URL}/inspections`, {});
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

const getDataEdited = async (id: string) => {
  const token = localStorage.getItem("accessToken");
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

const inspectionService = {
  getDataForReview,
  getDataForPreview,
  getDataForReviewById,
  approveInspectionData,
  getDataEdited,
  saveChanges,
  mintingToBlockchain,
};
export default inspectionService;
