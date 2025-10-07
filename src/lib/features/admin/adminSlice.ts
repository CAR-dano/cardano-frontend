import { User } from "../../../utils/Auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import adminService from "./adminService";

export interface Inspector {
  id: string;
  name: string;
  email: string;
  phone?: string;
  branch?: string;
  status?: string;
  createdAt?: string;
}

export interface Branch {
  id: string;
  name: string;
  code?: string;
  address?: string;
  city?: string;
  phone?: string;
  status?: string;
  createdAt?: string;
}

export interface IAdminState {
  userList: User[];
  inspectorList: Inspector[];
  branchList: Branch[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IAdminState = {
  userList: [],
  inspectorList: [],
  branchList: [],
  isLoading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk(
  "admin/users",
  async (token: any, thunkAPI) => {
    try {
      const payload = await adminService.getAllUsers(token);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateRole = createAsyncThunk(
  "admin/updateRole",
  async (
    { id, role, token }: { id: string; role: string; token: string },
    thunkAPI
  ) => {
    try {
      const payload = await adminService.updateRole(id, role, token);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllInspectors = createAsyncThunk(
  "admin/inspectors",
  async (token: string, thunkAPI) => {
    try {
      const payload = await adminService.getAllInspectors(token);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllBranches = createAsyncThunk(
  "admin/branches",
  async (token: string, thunkAPI) => {
    try {
      const payload = await adminService.getAllBranches(token);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteInspector = createAsyncThunk(
  "admin/deleteInspector",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      const status = await adminService.deleteInspector(id, token);
      return { id, status }; // Return ID and status
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const generateInspectorPin = createAsyncThunk(
  "admin/generateInspectorPin",
  async ({ id, token }: { id: string; token: string }, thunkAPI) => {
    try {
      const payload = await adminService.generateInspectorPin(id, token);
      return payload;
    } catch (error: any) {
      const message = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.userList = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.userList = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getAllUsers.rejected, (state) => {
        state.userList = [];
        state.isLoading = false;
      })
      .addCase(updateRole.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state, _action) => {
        state.isLoading = false;
        state.error = null;
        // Optionally, update userList here if needed
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllInspectors.pending, (state) => {
        state.inspectorList = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllInspectors.fulfilled,
        (state, action: PayloadAction<Inspector[]>) => {
          state.inspectorList = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getAllInspectors.rejected, (state, action) => {
        state.inspectorList = [];
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllBranches.pending, (state) => {
        state.branchList = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllBranches.fulfilled,
        (state, action: PayloadAction<Branch[]>) => {
          state.branchList = action.payload;
          state.isLoading = false;
          state.error = null;
        }
      )
      .addCase(getAllBranches.rejected, (state, action) => {
        state.branchList = [];
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteInspector.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteInspector.fulfilled, (state, action) => {
        // Remove the deleted inspector from the list
        state.inspectorList = state.inspectorList.filter(
          (inspector) => inspector.id !== action.payload.id
        );
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteInspector.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(generateInspectorPin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateInspectorPin.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(generateInspectorPin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {} = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
