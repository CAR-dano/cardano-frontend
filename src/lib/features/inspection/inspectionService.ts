import { Hasil } from "@/utils/Car";
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

const inspectionService = {
  getDataForReview,
  getDataForPreview,
};
export default inspectionService;
