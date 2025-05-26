import axios from "axios";

import { UserLogin, UserSignUp } from "@/utils/Auth";

const LOCAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

const checkToken = async (token: string) => {
  try {
    // Set the token in axios for subsequent requests
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await axios.get(`${LOCAL_API_URL}/auth/check-token`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // If token check is successful, also update user data from localStorage
    if (typeof window !== "undefined" && response.data) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        response.data.user = JSON.parse(storedUser);
      }
    }

    return response.data;
  } catch (error) {
    // Clear invalid token
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    throw error;
  }
};

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
    // Store auth data in localStorage
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    // Set the token for all subsequent requests
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.accessToken}`;
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

  return { success: true, message: "Logged out successfully" };
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

const refreshToken = async () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await axios.post(
        `${LOCAL_API_URL}/auth/refresh-token`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.accessToken}`;
        return response.data;
      }

      return null;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return null;
    }
  }
  return null;
};

const authService = {
  login,
  logout,
  signup,
  checkToken,
  refreshToken,
};
export default authService;
