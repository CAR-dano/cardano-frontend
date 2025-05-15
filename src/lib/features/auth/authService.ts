import axios from "axios";

import { UserLogin, UserSignUp } from "@/utils/Auth";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const login = async (userData: UserLogin) => {
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
    console.log("response", response.data);
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  }

  return response.data;
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

  return response.data;
};

const logout = async () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }

  axios.defaults.headers.common["Authorization"] = "";
  delete axios.defaults.headers.common["Authorization"];
  // window.location.reload();

  const response = await axios.post(`${LOCAL_API_URL}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
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
