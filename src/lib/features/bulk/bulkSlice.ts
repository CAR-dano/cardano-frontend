import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import inspectionService from "../inspection/inspectionService";

interface BulkItem {
  id: string;
  status: "pending" | "processing" | "success" | "error";
  errorMessage?: string;
  customerName?: string;
  vehiclePlate?: string;
}

interface BulkState {
  isProcessing: boolean;
  totalItems: number;
  processedItems: number;
  successItems: number;
  errorItems: number;
  items: BulkItem[];
  processId: string | null;
  startedAt: string | null;
  finishedAt: string | null;
}

const initialState: BulkState = {
  isProcessing: false,
  totalItems: 0,
  processedItems: 0,
  successItems: 0,
  errorItems: 0,
  items: [],
  processId: null,
  startedAt: null,
  finishedAt: null,
};

// Thunk untuk memproses bulk approval
export const bulkApproveInspections = createAsyncThunk(
  "bulk/approve",
  async (
    {
      inspectionData,
      onItemSuccess,
    }: {
      inspectionData: Array<{
        id: string;
        customerName?: string;
        vehiclePlate?: string;
      }>;
      onItemSuccess?: () => void;
    },
    { dispatch }
  ) => {
    const processId = Date.now().toString();
    dispatch(
      startBulkProcess({
        processId,
        items: inspectionData.map((item) => ({
          id: item.id,
          status: "pending" as const,
          customerName: item.customerName,
          vehiclePlate: item.vehiclePlate,
        })),
      })
    );

    // Process each item sequentially
    for (const item of inspectionData) {
      try {
        dispatch(updateItemStatus({ id: item.id, status: "processing" }));

        // Call the approval API
        await inspectionService.approveInspectionData(item.id);

        dispatch(updateItemStatus({ id: item.id, status: "success" }));

        // Call refresh callback after each successful item
        if (onItemSuccess) {
          onItemSuccess();
        }

        // Small delay to prevent overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error: any) {
        const errorMessage =
          error?.response?.data?.message || error.message || "Unknown error";
        dispatch(
          updateItemStatus({
            id: item.id,
            status: "error",
            errorMessage,
          })
        );
      }
    }

    dispatch(finishBulkProcess());
    return processId;
  }
);

const bulkSlice = createSlice({
  name: "bulk",
  initialState,
  reducers: {
    startBulkProcess: (
      state,
      action: PayloadAction<{
        processId: string;
        items: BulkItem[];
      }>
    ) => {
      state.isProcessing = true;
      state.processId = action.payload.processId;
      state.items = action.payload.items;
      state.totalItems = action.payload.items.length;
      state.processedItems = 0;
      state.successItems = 0;
      state.errorItems = 0;
      state.startedAt = new Date().toISOString();
      state.finishedAt = null;
    },

    updateItemStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: "processing" | "success" | "error";
        errorMessage?: string;
      }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        const previousStatus = item.status;
        item.status = action.payload.status;

        if (action.payload.errorMessage) {
          item.errorMessage = action.payload.errorMessage;
        }

        // Update counters based on status transitions
        if (
          previousStatus === "pending" &&
          action.payload.status === "processing"
        ) {
          // Item started processing, but don't count as processed yet
        } else if (
          previousStatus === "processing" &&
          action.payload.status === "success"
        ) {
          // Item completed successfully
          state.processedItems += 1;
          state.successItems += 1;
        } else if (
          previousStatus === "processing" &&
          action.payload.status === "error"
        ) {
          // Item failed
          state.processedItems += 1;
          state.errorItems += 1;
        } else if (
          previousStatus === "pending" &&
          action.payload.status === "success"
        ) {
          // Direct transition from pending to success (unlikely but handle it)
          state.processedItems += 1;
          state.successItems += 1;
        } else if (
          previousStatus === "pending" &&
          action.payload.status === "error"
        ) {
          // Direct transition from pending to error (unlikely but handle it)
          state.processedItems += 1;
          state.errorItems += 1;
        }
      }
    },

    finishBulkProcess: (state) => {
      state.isProcessing = false;
      state.finishedAt = new Date().toISOString();
    },

    clearBulkProcess: (state) => {
      return initialState;
    },

    resetBulkState: (state) => {
      return initialState;
    },
  },
});

export const {
  startBulkProcess,
  updateItemStatus,
  finishBulkProcess,
  clearBulkProcess,
  resetBulkState,
} = bulkSlice.actions;

export const bulkReducer = bulkSlice.reducer;
