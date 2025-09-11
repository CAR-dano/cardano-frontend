import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { User } from "../../../utils/Auth";

export interface IUserState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  updateSuccess: boolean;
}

const initialState: IUserState = {
  isLoading: false,
  error: null,
  user: null,
  updateSuccess: false,
};

export const editUserData = createAsyncThunk(
  "user/editUserData",
  async (userData: Partial<User>, thunkAPI) => {
    try {
      const payload = await userService.editUserData(userData);
      return payload;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to update user data";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    resetUserState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUserData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(editUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
        state.updateSuccess = true;
      })
      .addCase(editUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.updateSuccess = false;
      });
  },
});

export const { clearError, clearUpdateSuccess, setUser, resetUserState } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
