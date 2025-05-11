import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inspectionService from "./inspectionService";
import { InspectionResult } from "@/utils/InspectionResult";

export const getDataForReviewer = createAsyncThunk(
  "inspection/getDataForReviewer",
  async (_, thunkAPI) => {
    try {
      const payload = await inspectionService.getDataForReview();
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

export const getDataForReviewById = createAsyncThunk(
  "inspection/getDataForReviewById",
  async (id: string, thunkAPI) => {
    try {
      const payload = await inspectionService.getDataForReviewById(id);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const approveInspectionData = createAsyncThunk(
  "inspection/approveInspectionData",
  async (id: string, thunkAPI) => {
    try {
      const payload = await inspectionService.approveInspectionData(id);
      console.log("payload", payload);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export interface InspectionState {
  review: any | null;
  isLoading: boolean;
  error: string | null;
  data: any[];
  edited: {
    id: string;
    data: {
      part: string;
      section: string;
      before: string;
      after: string;
    }[];
  }[];
}

const initialState: InspectionState = {
  data: [],
  isLoading: false,
  error: null,
  review: null,
  edited: [],
};

export const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    setDataReview: (state, action) => {
      state.review = { ...state.review, ...action.payload };
    },
    updateData: (state, action) => {
      console.log("action", action.payload);
    },
    setEditedData: (state, action) => {
      const { part, section, before, after, id } = action.payload;
      const existingEdit = state.edited.find((edit) => edit.id === id);
      if (existingEdit) {
        const existingPart = existingEdit.data.find(
          (edit) => edit.part === part
        );
        if (existingPart) {
          existingPart.before = before;
          existingPart.after = after;
        } else {
          existingEdit.data.push({ part, section, before, after });
        }
      } else {
        state.edited.push({
          id,
          data: [{ part, section, before, after }],
        });
      }
    },
    deleteEditedData: (state, action) => {
      const { part, id } = action.payload;
      const existingEdit = state.edited.find((edit) => edit.id === id);
      if (existingEdit) {
        const existingPartIndex = existingEdit.data.findIndex(
          (edit) => edit.part === part
        );
        if (existingPartIndex !== -1) {
          existingEdit.data.splice(existingPartIndex, 1);
        }
        if (existingEdit.data.length === 0) {
          state.edited = state.edited.filter((edit) => edit.id !== id);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataForReviewer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataForReviewer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getDataForReviewer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getDataForPreview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataForPreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.review = action.payload;
        state.error = null;
      })
      .addCase(getDataForPreview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getDataForReviewById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataForReviewById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.review = action.payload;
        state.error = null;
      })
      .addCase(getDataForReviewById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(approveInspectionData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(approveInspectionData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(approveInspectionData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setDataReview, updateData, setEditedData, deleteEditedData } =
  inspectionSlice.actions;
export const inspectionReducer = inspectionSlice.reducer;
