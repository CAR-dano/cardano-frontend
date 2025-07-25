import apiClient from "../../services/apiClient";
import { UserLogin, UserSignUp } from "../../../utils/Auth";

const checkToken = async (token: string) => {
  try {
    const response = await apiClient.get("/auth/check-token", {
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
      // Ensure token is stored in localStorage
      localStorage.setItem("token", token);
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
  const response = await apiClient.post("/auth/login", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (
    response.data &&
    response.data.accessToken &&
    response.data.user &&
    typeof window !== "undefined"
  ) {
    // Store auth data in localStorage
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

const loginGoogle = async () => {
  // Redirect to Google authentication flow handled by NextAuth.js
  // await signIn("google");
  return { success: true }; // This return is largely symbolic as signIn handles the redirect
};

const signup = async (userData: UserSignUp) => {
  const response = await apiClient.post("/auth/register", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const logout = async () => {
  try {
    // Clear localStorage first
    if (typeof window !== "undefined") {
      localStorage.clear();
    }

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    // Even if there's an error, ensure cleanup happens
    if (typeof window !== "undefined") {
      localStorage.clear();
    }

    return { success: true, message: "Logged out successfully" };
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

// Removed loadUser function as interceptor handles token automatically

const refreshToken = async () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const response = await apiClient.post(
        "/auth/refresh",
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
  loginGoogle,
};
export default authService;
