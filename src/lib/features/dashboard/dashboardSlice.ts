import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "./dashboardService";

// Get user from localStorage
const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

interface DashboardState {
  mainStats: any | null;
  combinedDashboardData: any | null;
  isError: boolean;
  isSuccess: boolean;
  isLoadingMainStats: boolean;
  isLoadingCombinedDashboardData?: boolean;
  message: string;
}

const initialState: DashboardState = {
  mainStats: null,
  combinedDashboardData: null,
  isError: false,
  isSuccess: false,
  isLoadingMainStats: false,
  isLoadingCombinedDashboardData: false,
  message: "",
};

// Get Main Stats
export const getMainStats = createAsyncThunk(
  "dashboard/getMainStats",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getMainStats(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Combined Dashboard Data
export const getCombinedDashboardData = createAsyncThunk(
  "dashboard/getCombinedDashboardData",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getCombinedDashboardData(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoadingMainStats = false;
      state.isLoadingCombinedDashboardData = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Main Stats
      .addCase(getMainStats.pending, (state) => {
        state.isLoadingMainStats = true;
      })
      .addCase(getMainStats.fulfilled, (state, action) => {
        state.isLoadingMainStats = false;
        state.isSuccess = true;
        state.mainStats = action.payload;
      })
      .addCase(getMainStats.rejected, (state, action) => {
        state.isLoadingMainStats = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Combined Dashboard Data
      .addCase(getCombinedDashboardData.pending, (state) => {
        state.isLoadingCombinedDashboardData = true;
      })
      .addCase(getCombinedDashboardData.fulfilled, (state, action) => {
        state.isLoadingCombinedDashboardData = false;
        state.isSuccess = true;
        state.combinedDashboardData = action.payload;
      })
      .addCase(getCombinedDashboardData.rejected, (state, action) => {
        state.isLoadingCombinedDashboardData = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;
