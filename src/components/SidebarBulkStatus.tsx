"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "../lib/store";
import { FiCheck, FiLoader } from "react-icons/fi";
import { clearBulkProcess } from "../lib/features/bulk/bulkSlice";

const SidebarBulkStatus = ({
  onComplete,
}: { onComplete?: () => void } = {}) => {
  const bulkState = useAppSelector((state) => state.bulk);
  const dispatch = useAppDispatch();

  if (
    !bulkState.processId &&
    !bulkState.isProcessing &&
    bulkState.items.length === 0
  ) {
    return null;
  }

  const progressPercentage =
    bulkState.totalItems > 0
      ? Math.round((bulkState.processedItems / bulkState.totalItems) * 100)
      : 0;

  // Calculate how many items are currently being processed or completed
  const processingCount = bulkState.items.filter(
    (item) => item.status === "processing"
  ).length;
  const completedCount = bulkState.successItems + bulkState.errorItems;

  const handleConfirmComplete = () => {
    dispatch(clearBulkProcess());
    // Call onComplete callback if provided (for additional refresh)
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="bg-orange-50 dark:bg-gray-800 rounded-lg p-3 border border-orange-200 dark:border-gray-600">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-300 flex items-center">
          {bulkState.isProcessing ? (
            <FiLoader className="animate-spin mr-2 w-4 h-4" />
          ) : (
            <FiCheck className="mr-2 w-4 h-4 text-green-600" />
          )}
          Bulk Approve
        </h4>
        <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
          {progressPercentage}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-orange-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              bulkState.isProcessing
                ? "bg-orange-500"
                : bulkState.errorItems > 0
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="font-semibold text-orange-800 dark:text-orange-300">
            {bulkState.totalItems}
          </div>
          <div className="text-orange-600 dark:text-orange-400">Total</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-green-600">
            {bulkState.successItems}
          </div>
          <div className="text-green-500">Done</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-red-600">
            {bulkState.errorItems}
          </div>
          <div className="text-red-500">Error</div>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-3 text-xs">
        {bulkState.isProcessing ? (
          <div className="text-orange-700 dark:text-orange-400 flex items-center">
            <FiLoader className="animate-spin mr-1" size={12} />
            Processing {completedCount + processingCount} of{" "}
            {bulkState.totalItems}...
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-green-600 dark:text-green-400 flex items-center">
              <FiCheck className="mr-1" size={12} />
              {bulkState.errorItems > 0
                ? `Completed with ${bulkState.errorItems} errors`
                : "All items approved successfully"}
            </div>
            <button
              onClick={handleConfirmComplete}
              className="w-full bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors duration-200"
            >
              {bulkState.errorItems > 0 ? "OK - Review Errors" : "OK"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarBulkStatus;
