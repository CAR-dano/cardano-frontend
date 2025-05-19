import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inspectionService from "./inspectionService";

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

export const getDataEdited = createAsyncThunk(
  "inspection/getDataEdited",
  async (id: string, thunkAPI) => {
    try {
      const payload = await inspectionService.getDataEdited(id);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveDataEdited = createAsyncThunk(
  "inspection/saveDataEdited",
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    try {
      const payload = await inspectionService.saveChanges(id, data);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const mintingToBlockchain = createAsyncThunk(
  "inspection/mintingToBlockchain",
  async (id: string, thunkAPI) => {
    try {
      const payload = await inspectionService.mintingToBlockchain(id);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export interface EditedItem {
  inspectionId: string;
  fieldName: string;
  subFieldName?: string;
  oldValue: string;
  newValue: string;
  changesAt?: string;
}

export interface InspectionState {
  review: any | null;
  isLoading: boolean;
  isLoadingEdited: boolean;
  error: string | null;
  data: any[];
  edited: EditedItem[];
  meta: any;
}

const initialState: InspectionState = {
  data: [],
  isLoading: false,
  isLoadingEdited: false,
  error: null,
  review: null,
  edited: [],
  meta: null,
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
      const {
        inspectionId,
        fieldName,
        subFieldName,
        oldValue,
        newValue,
        changesAt,
      } = action.payload;
      const existingEdit = state.edited.find(
        (edit) =>
          edit.fieldName === fieldName && edit.subFieldName === subFieldName
      );

      if (existingEdit) {
        existingEdit.newValue = newValue;
      } else {
        state.edited.push({
          inspectionId,
          fieldName,
          subFieldName,
          oldValue,
          newValue,
          changesAt,
        });
      }
    },

    deleteEditedData: (state, action) => {
      const { inspectionId } = action.payload;
      state.edited = state.edited.filter(
        (edit) => edit.inspectionId !== inspectionId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataForReviewer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDataForReviewer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.meta = action.payload.meta;
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
      })
      .addCase(getDataEdited.pending, (state) => {
        state.isLoadingEdited = true;
      })
      .addCase(getDataEdited.fulfilled, (state, action) => {
        state.isLoadingEdited = false;
        state.error = null;
        state.edited = action.payload;
      })
      .addCase(getDataEdited.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(saveDataEdited.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveDataEdited.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(saveDataEdited.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(mintingToBlockchain.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(mintingToBlockchain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(mintingToBlockchain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setDataReview, updateData, setEditedData, deleteEditedData } =
  inspectionSlice.actions;
export const inspectionReducer = inspectionSlice.reducer;
