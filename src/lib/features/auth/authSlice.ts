import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { User, UserLogin, UserSignUp } from "../../../utils/Auth";

export interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
  accessToken?: string;
  lastTokenCheck?: number;
  isAuthInitialized: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  user: null,
  accessToken: "",
  lastTokenCheck: undefined,
  isAuthInitialized: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: UserLogin, thunkAPI) => {
    try {
      const payload = await authService.login(user);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (user: UserSignUp, thunkAPI) => {
    try {
      const payload = await authService.signup(user);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const checkToken = createAsyncThunk(
  "auth/check-token",
  async (token: string, thunkAPI) => {
    try {
      const payload = await authService.checkToken(token);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/get-user-profile",
  async (_, thunkAPI) => {
    try {
      const payload = await authService.getUserProfile();
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (_, thunkAPI) => {
    try {
      const payload = await authService.refreshToken();
      if (!payload) {
        throw new Error("Failed to refresh token");
      }
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const updateProfile = createAsyncThunk(
//   "auth/profile",
//   async (user: User, thunkAPI) => {
//     try {
//       const payload = await authService.updateProfile(user);
//       return payload;
//     } catch (error: any) {
//       const message = error?.response?.data?.message;
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAuthInitialized: (state, action: PayloadAction<boolean>) => {
      state.isAuthInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.accessToken = "";
        state.error = null;
        state.lastTokenCheck = undefined;
        // Keep auth initialized to true even after logout
        state.isAuthInitialized = true;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Logout failed";
      })

      .addCase(login.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
        state.lastTokenCheck = Date.now();
        state.isAuthInitialized = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.accessToken = "";
        state.error = action.error.message || "Login failed";
      })

      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Signup failed";
      })

      .addCase(checkToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkToken.fulfilled, (state, _action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.error = null;
        state.lastTokenCheck = Date.now();
        state.isAuthInitialized = true;
      })
      .addCase(checkToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = "";
        state.error = action.error.message || "Token validation failed";
        state.isAuthInitialized = true;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch user profile";
      })

      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.lastTokenCheck = Date.now();
        state.error = null;
        // Also update axios header when token is refreshed
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.accessToken);
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Token refresh failed";
      });
  },
});

export const { setAuthenticated, setAuthInitialized } = authSlice.actions;
export const authReducer = authSlice.reducer;
