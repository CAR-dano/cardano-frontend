// import { User } from "@/utils/types/user";
// import { UserLogin } from "@/utils/types/userLogin";
// import { UserSignUp } from "@/utils/types/userSignup";
import axios from "axios";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

// const login = async (userData: UserLogin) => {
//   const response = await axios.post(`${LOCAL_API_URL}/auth/login`, userData, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.data.err == true && typeof window !== "undefined") {
//     localStorage.setItem("token", response.data.token);
//     localStorage.setItem("user", JSON.stringify(response.data.user));
//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${response.data.token}`;
//   }

//   return response.data;
// };

// const signup = async (userData: UserSignUp) => {
//   const response = await axios.post(LOCAL_API_URL + "/auth/signup", userData, {
//     headers: {
//       "content-type": "application/json",
//     },
//   });

//   if (!response.data.err == true && typeof window !== "undefined") {
//     localStorage.setItem("token", response.data.token);
//     localStorage.setItem("user", JSON.stringify(response.data.user));
//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${response.data.token}`;
//   }

//   return response.data;
// };

// const logout = async () => {
//   if (typeof window !== "undefined") {
//     localStorage.clear();
//   }
// };

// const updateProfile = async (userData: User) => {
//   const response = await axios.put(`${LOCAL_API_URL}/auth/profile`, userData, {
//     headers: {
//       "content-type": "application/json",
//     },
//   });

//   return response.data;
// };

// const loadUser = () => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     }
//   }
// };

// loadUser();

const authService = {
  // login,
  // signup,
  // logout,
  // updateProfile,
};
export default authService;
