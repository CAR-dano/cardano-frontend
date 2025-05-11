import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface DialogResultProps {
  title: string;
  message: string;
  isOpen: boolean; // New prop to control dialog visibility
  isSuccess?: boolean; // Optional prop to indicate success or failure
  buttonLabel1?: string; // Optional label for the first button
  buttonLabel2?: string; // Optional label for the second button
  action1?: () => void; // Optional action function for the first button
  action2?: () => void; // Optional action function for the second button
  onClose?: () => void; // Optional action function for closing the dialog
}

function DialogResult({
  title,
  message,
  isOpen,
  isSuccess = false,
  buttonLabel1,
  buttonLabel2,
  action1,
  action2,
  onClose,
}: DialogResultProps) {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        {" "}
        {/* Dialog will be controlled by `isOpen` */}
        <DialogContent aria-modal="false" className="w-screen ">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">
              {title}
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className="flex sm:flex-col md:flex-col lg:flex-col justify-center mt-1">
            <DialogDescription className="text-center text-sm font-normal text-left">
              {message}
            </DialogDescription>
            <div className="flex justify-end gap-2 mt-5">
              <Button
                variant="outline"
                onClick={action1}
                className="bg-white text-black border border-gray-300 hover:bg-gray-100 hover:text-gray-900"
              >
                {buttonLabel1}
              </Button>
              <Button
                onClick={action2}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                {buttonLabel2}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogResult;
