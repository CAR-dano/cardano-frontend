import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { User, UserLogin, UserSignUp } from "@/utils/Auth";

export interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  accessToken?: string;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  accessToken: "",
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.accessToken = "";
      })
      .addCase(login.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.user = null;
        state.accessToken = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.accessToken = "";
      })
      .addCase(signup.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.user = null;
        state.accessToken = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.user = null;
        state.accessToken = "";
      });
  },
});

export const { setAuthenticated } = authSlice.actions;
export const authReducer = authSlice.reducer;
