import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface InspectorPinDialogProps {
  isOpen: boolean;
  onClose: () => void;
  inspectorData: {
    name: string;
    username: string;
    email: string;
    pin: string;
    inspectionBranchCity?: {
      city: string;
      code: string;
    };
  } | null;
}

export const InspectorPinDialog: React.FC<InspectorPinDialogProps> = ({
  isOpen,
  onClose,
  inspectorData,
}) => {
  const { toast } = useToast();

  const handleCopyPin = () => {
    if (inspectorData?.pin) {
      navigator.clipboard.writeText(inspectorData.pin);
      toast({
        title: "Copied!",
        description: "PIN copied to clipboard.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Inspector Created Successfully!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Important: This PIN will only be shown once!
                </p>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  Please save this PIN securely. The inspector will need it to
                  log in.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Inspector Name:
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {inspectorData?.name}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Username:
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {inspectorData?.username}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email:
                </p>
                <p className="text-base font-semibold text-gray-900 dark:text-white">
                  {inspectorData?.email}
                </p>
              </div>

              {inspectorData?.inspectionBranchCity && (
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Branch:
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {inspectorData.inspectionBranchCity.city} (
                    {inspectorData.inspectionBranchCity.code})
                  </p>
                </div>
              )}

              <div className="space-y-1 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border-2 border-orange-200 dark:border-orange-800">
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Inspector PIN:
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 tracking-wider font-mono">
                    {inspectorData?.pin}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyPin}
                    className="ml-2"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            </div>
          </div>
        
        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
            className="w-full bg-orange-600 hover:bg-orange-700"
          >
            I've Saved the PIN
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
