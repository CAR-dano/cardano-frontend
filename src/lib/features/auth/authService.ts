import axios from "axios";

import { UserLogin, UserSignUp } from "@/utils/Auth";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const login = async (userData: UserLogin) => {
  console.log("userData", userData);
  try {
    const response = await axios.post(`${LOCAL_API_URL}/auth/login`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (
      response.data &&
      response.data.err === false &&
      typeof window !== "undefined"
    ) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const signup = async (userData: UserSignUp) => {
  const response = await axios.post(
    `${LOCAL_API_URL}/auth/register`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data.err && typeof window !== "undefined") {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  }

  return response.data;
};

const logout = async () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

// // const updateProfile = async (userData: User) => {
// //   const response = await axios.put(`${LOCAL_API_URL}/auth/profile`, userData, {
// //     headers: {
// //       "content-type": "application/json",
// //     },
// //   });

// //   return response.data;
// // };

// // const loadUser = () => {
// //   if (typeof window !== "undefined") {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// //     }
// //   }
// // };

// // loadUser();

const authService = {
  login,
  logout,
  signup,
};
export default authService;
