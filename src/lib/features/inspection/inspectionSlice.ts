import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import inspectionService from "./inspectionService";

export const getDataForReviewer = createAsyncThunk(
  "inspection/getDataForReviewer",
  async (
    params: {
      page?: number;
      pageSize?: number;
      status?: string;
      token?: string;
    } = {},
    thunkAPI: any
  ) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const payload = await inspectionService.getDataForReview({
        ...params,
        token,
      });
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
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDataEdited = createAsyncThunk(
  "inspection/getDataEdited",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const payload = await inspectionService.getDataEdited(id, token);
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

export const searchByVehiclePlat = createAsyncThunk(
  "inspection/searchByPlat",
  async (platNumber: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.accessToken;
      const payload = await inspectionService.searchByVehiclePlat(
        platNumber,
        token
      );
      return payload;
    } catch (error: any) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      // For unauthorized, return mock data with unauthorized flag
      if (status === 401) {
        const mockData = {
          vehiclePlateNumber: platNumber,
          vehicleData: {
            merekKendaraan: "Mitsubishi",
            tipeKendaraan: "Xpander 1.5 Ultimate",
            tahun: "2019",
            odometer: "60.965",
            warnaKendaraan: "Abu-abu",
            kepemilikan: "Pribadi",
            transmisi: "Automatic (CVT)",
            pajak1Tahun: "20 Agustus 2025",
            pajak5Tahun: "20 Agustus 2030",
            biayaPajak: "Rp 7.021.700",
          },

          inspectionDate: new Date().toISOString(),
          overallRating: "B",
          inspectionSummary: {
            indikasiTabrakan: false,
            indikasiBanjir: true,
            indikasiOdometerReset: false,
            interiorScore: "7",
            eksteriorScore: "9",
            mesinScore: "8",
            kakiKakiScore: "6",
          },
          urlPdf: "sample-report.pdf",
          photos: [
            "/assets/placeholder-photo.png",
            "/assets/placeholder-photo.png",
            "/assets/placeholder-photo.png",
          ],
          _isUnauthorized: true,
        };

        return mockData;
      }

      // Return both status and message for better error handling
      return thunkAPI.rejectWithValue({
        status,
        message,
        isUnauthorized: status === 401,
      });
    }
  }
);

export const searchByKeyword = createAsyncThunk(
  "inspection/searchByKeyword",
  async (
    params: { keyword: string; page?: number; pageSize?: number },
    thunkAPI
  ) => {
    try {
      const { keyword, page = 1, pageSize = 10 } = params;
      const payload = await inspectionService.searchByKeyword(
        keyword || "",
        page,
        pageSize
      );
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePhoto = createAsyncThunk(
  "inspection/updatePhoto",
  async (
    {
      id,
      photosId,
      data,
    }: {
      id: string;
      photosId: string;
      data: { needAttention?: boolean; label?: string; displayInPdf?: boolean };
    },
    thunkAPI
  ) => {
    try {
      const payload = await inspectionService.updatePhoto(id, photosId, data);
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
  subsubfieldname?: string;
  oldValue: string;
  newValue: string;
  changesAt?: string;
}

export interface InspectionState {
  review: any | null;
  isLoading: boolean;
  isLoadingEdited: boolean;
  error: string | null;
  isUnauthorized: boolean;
  data: any[];
  edited: EditedItem[];
  meta: any;
  searchResults: {
    data: any[];
    meta: any;
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: InspectionState = {
  data: [],
  isLoading: false,
  isLoadingEdited: false,
  error: null,
  isUnauthorized: false,
  review: null,
  edited: [],
  meta: null,
  searchResults: {
    data: [],
    meta: null,
    isLoading: false,
    error: null,
  },
};

export const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    setDataReview: (state, action) => {
      state.review = { ...state.review, ...action.payload };
    },
    updateData: (_state, _action) => {},
    clearSearchResults: (state) => {
      state.searchResults.data = [];
      state.searchResults.meta = null;
      state.searchResults.error = null;
      state.searchResults.isLoading = false;
    },
    clearUnauthorizedState: (state) => {
      state.isUnauthorized = false;
      state.error = null;
    },
    setEditedData: (state, action) => {
      const {
        inspectionId,
        fieldName,
        subFieldName,
        subsubfieldname,
        oldValue,
        newValue,
        changesAt,
      } = action.payload;
      const normalizedFieldName = fieldName?.toLowerCase().trim();
      const normalizedSubFieldName = subFieldName?.toLowerCase().trim() || "";
      const normalizedSubsubFieldName =
        subsubfieldname?.toLowerCase().trim() || "";

      const existingEdit = state.edited.find((edit) => {
        const editNormalizedFieldName = edit.fieldName?.toLowerCase().trim();
        const editNormalizedSubFieldName =
          edit.subFieldName?.toLowerCase().trim() || "";
        const editNormalizedSubsubFieldName =
          edit.subsubfieldname?.toLowerCase().trim() || "";
        return (
          editNormalizedFieldName === normalizedFieldName &&
          editNormalizedSubFieldName === normalizedSubFieldName &&
          editNormalizedSubsubFieldName === normalizedSubsubFieldName
        );
      });

      if (existingEdit) {
        existingEdit.newValue = newValue;
      } else {
        state.edited.push({
          inspectionId,
          fieldName,
          subFieldName,
          subsubfieldname,
          oldValue,
          newValue,
          changesAt,
        });
      }
    },

    deleteEditedData: (state, action) => {
      const { inspectionId, fieldName, subFieldName, subsubfieldname } =
        action.payload;
      state.edited = state.edited.filter(
        (edit) =>
          !(
            edit.inspectionId === inspectionId &&
            edit.fieldName === fieldName &&
            edit.subFieldName === subFieldName &&
            edit.subsubfieldname === subsubfieldname
          )
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
      .addCase(approveInspectionData.fulfilled, (state, _action) => {
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
      })
      .addCase(searchByVehiclePlat.pending, (state) => {
        state.isLoading = true;
        // Don't clear previous search results when pending to avoid flickering
        state.error = null;
        // Don't reset isUnauthorized here, let the result determine it
      })
      .addCase(searchByVehiclePlat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.review = action.payload;
        state.error = null;

        // Check if this is unauthorized mock data
        if (action.payload._isUnauthorized) {
          state.isUnauthorized = true;
          state.error = "Anda perlu login untuk melihat detail lengkap";
        } else {
          state.isUnauthorized = false;
        }
      })
      .addCase(searchByVehiclePlat.rejected, (state, action) => {
        state.isLoading = false;
        const errorPayload = action.payload as any;

        if (errorPayload?.isUnauthorized) {
          // For unauthorized, keep existing review data but mark as unauthorized
          state.isUnauthorized = true;
          state.error = errorPayload.message || "Unauthorized access";
          // Don't clear review data for unauthorized - let user see blurred content
        } else {
          // For other errors, clear review data
          state.review = null;
          state.isUnauthorized = false;
          state.error =
            errorPayload?.message || errorPayload || "An error occurred";
        }
      })
      .addCase(searchByKeyword.pending, (state) => {
        state.searchResults.isLoading = true;
        state.searchResults.error = null;
      })
      .addCase(searchByKeyword.fulfilled, (state, action) => {
        state.searchResults.isLoading = false;
        state.searchResults.data = action.payload.data || action.payload;
        state.searchResults.meta =
          action.payload.meta || action.payload.pagination || null;
        state.searchResults.error = null;
      })
      .addCase(searchByKeyword.rejected, (state, action) => {
        state.searchResults.isLoading = false;
        state.searchResults.data = [];
        state.searchResults.meta = null;
        state.searchResults.error = action.payload as string;
      });
  },
});
export const {
  setDataReview,
  updateData,
  setEditedData,
  deleteEditedData,
  clearSearchResults,
  clearUnauthorizedState,
} = inspectionSlice.actions;
export const inspectionReducer = inspectionSlice.reducer;
