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
import { CheckCircle2, AlertCircle } from "lucide-react";

interface DialogResultProps {
  title: string;
  message: string;
  isOpen: boolean;
  isSuccess?: boolean;
  buttonLabel1?: string;
  buttonLabel2?: string;
  action1?: () => void;
  action2?: () => void;
  onClose?: () => void;
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="w-[90vw] max-w-[500px] rounded-lg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="flex flex-col items-center space-y-3 pb-2">
          <div className={`rounded-full p-2 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
            {isSuccess ? (
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            ) : (
              <AlertCircle className="h-10 w-10 text-red-600" />
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-center">
            {title}
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="text-center py-4 text-base">
          {message}
        </DialogDescription>

        <DialogFooter className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
          {buttonLabel1 && (
            <Button
              variant="outline"
              onClick={action1}
              className="w-full sm:w-auto bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 font-medium"
            >
              {buttonLabel1}
            </Button>
          )}
          {buttonLabel2 && (
            <Button
              onClick={action2}
              className={`w-full sm:w-auto font-medium ${
                isSuccess 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {buttonLabel2}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DialogResult;