import apiClient from "../../services/apiClient";
import { User } from "../../../utils/Auth";

const editUserData = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.put("/user/profile", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const userService = {
  editUserData,
};
export default userService;
