import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardService from "./dashboardService";

// Get user from localStorage
const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

interface DashboardState {
  mainStats: any | null;
  branchDistribution: any | null;
  inspectorPerformance: any | null;
  overallValueDistribution: any | null;
  carBrandDistribution: any | null;
  productionYearDistribution: any | null;
  transmissionTypeDistribution: any | null;
  blockchainStatus: any | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: DashboardState = {
  mainStats: null,
  branchDistribution: null,
  inspectorPerformance: null,
  overallValueDistribution: null,
  carBrandDistribution: null,
  productionYearDistribution: null,
  transmissionTypeDistribution: null,
  blockchainStatus: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
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

// Get Branch Distribution
export const getBranchDistribution = createAsyncThunk(
  "dashboard/getBranchDistribution",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getBranchDistribution(token);
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

// Get Inspector Performance
export const getInspectorPerformance = createAsyncThunk(
  "dashboard/getInspectorPerformance",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getInspectorPerformance(token);
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

// Get Overall Value Distribution
export const getOverallValueDistribution = createAsyncThunk(
  "dashboard/getOverallValueDistribution",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getOverallValueDistribution(token);
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

// Get Car Brand Distribution
export const getCarBrandDistribution = createAsyncThunk(
  "dashboard/getCarBrandDistribution",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getCarBrandDistribution(token);
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

// Get Production Year Distribution
export const getProductionYearDistribution = createAsyncThunk(
  "dashboard/getProductionYearDistribution",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getProductionYearDistribution(token);
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

// Get Transmission Type Distribution
export const getTransmissionTypeDistribution = createAsyncThunk(
  "dashboard/getTransmissionTypeDistribution",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getTransmissionTypeDistribution(token);
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

// Get Blockchain Status
export const getBlockchainStatus = createAsyncThunk(
  "dashboard/getBlockchainStatus",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      return await dashboardService.getBlockchainStatus(token);
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
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Main Stats
      .addCase(getMainStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMainStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.mainStats = action.payload;
      })
      .addCase(getMainStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Branch Distribution
      .addCase(getBranchDistribution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBranchDistribution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.branchDistribution = action.payload;
      })
      .addCase(getBranchDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Inspector Performance
      .addCase(getInspectorPerformance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInspectorPerformance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.inspectorPerformance = action.payload;
      })
      .addCase(getInspectorPerformance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Overall Value Distribution
      .addCase(getOverallValueDistribution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOverallValueDistribution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.overallValueDistribution = action.payload;
      })
      .addCase(getOverallValueDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Car Brand Distribution
      .addCase(getCarBrandDistribution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCarBrandDistribution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.carBrandDistribution = action.payload;
      })
      .addCase(getCarBrandDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Production Year Distribution
      .addCase(getProductionYearDistribution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductionYearDistribution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productionYearDistribution = action.payload;
      })
      .addCase(getProductionYearDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Transmission Type Distribution
      .addCase(getTransmissionTypeDistribution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransmissionTypeDistribution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transmissionTypeDistribution = action.payload;
      })
      .addCase(getTransmissionTypeDistribution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      // Blockchain Status
      .addCase(getBlockchainStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlockchainStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blockchainStatus = action.payload;
      })
      .addCase(getBlockchainStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = dashboardSlice.actions;
export default dashboardSlice.reducer;
