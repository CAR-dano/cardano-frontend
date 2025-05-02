import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inspectionService from "./inspectionService";

export const getDataForReviewer = createAsyncThunk(
  "inspection/getDataForReviewer",
  async (_, thunkAPI) => {
    try {
      const payload = await inspectionService.getDataForReview();
      console.log("payload", payload);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDataForPreview = createAsyncThunk(
  "inspection/getDataForPreview",
  async (id: string, thunkAPI) => {
    try {
      const payload = await inspectionService.getDataForPreview(id);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  id: 0,
  token: "",
  data: [],
  isLoading: false,
  isError: false,
  message: "",
};

export const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataForReviewer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataForReviewer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(getDataForReviewer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const inspectionReducer = inspectionSlice.reducer;
