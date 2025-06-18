import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface AddPhotoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  inspectionId?: string;
  category?: string;
  onSave: (file: File, needsAttention: boolean, description: string) => void;
}

const AddPhotoDialog: React.FC<AddPhotoDialogProps> = ({
  isOpen,
  onClose,
  inspectionId,
  category,
  onSave,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [needsAttention, setNeedsAttention] = useState(false);
  const [description, setDescription] = useState("");

  React.useEffect(() => {
    // Cleanup previous preview URL when dialog closes or component unmounts
    if (!isOpen && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [isOpen, previewUrl]);

  // Determine text color based on dark mode
  const textColorClass = "text-gray-700 dark:text-gray-300";
  const inputBgClass = "bg-white dark:bg-gray-700";
  const inputTextColorClass = "text-gray-900 dark:text-gray-100";
  const placeholderColorClass =
    "placeholder-gray-400 dark:placeholder-gray-500";
  const disabledBgClass = "bg-gray-100 dark:bg-gray-800";
  const disabledTextColorClass = "text-gray-400 dark:text-gray-500";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
    }
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSave = () => {
    if (selectedFile) {
      onSave(selectedFile, needsAttention, description);
      // Reset form
      setSelectedFile(null);
      setNeedsAttention(false);
      setDescription("");
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-[500px] rounded-lg p-6 shadow-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-900 dark:text-gray-100">
            Upload New Photo
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div>
            <label
              htmlFor="photo-upload"
              className={`block text-sm font-medium ${textColorClass} mb-2`}
            >
              Select Photo
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`block w-full text-sm ${inputTextColorClass}
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                dark:file:bg-blue-900 dark:file:text-blue-200
                hover:file:bg-blue-100 dark:hover:file:bg-blue-800`}
            />
            {selectedFile && (
              <p className={`mt-2 text-sm ${textColorClass}`}>
                Selected: {selectedFile.name}
              </p>
            )}
            {previewUrl && (
              <div className="mt-4 flex justify-center">
                <img
                  src={previewUrl}
                  alt="Photo Preview"
                  className="max-w-full h-auto max-h-60 rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="needs-attention"
              type="checkbox"
              checked={needsAttention}
              onChange={(e) => setNeedsAttention(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded dark:bg-gray-800 dark:checked:bg-blue-600"
            />
            <label
              htmlFor="needs-attention"
              className={`ml-2 block text-sm ${inputTextColorClass}`}
            >
              Perlu Perhatian (Needs Attention)
            </label>
          </div>

          <div>
            <label
              htmlFor="description"
              className={`block text-sm font-medium ${textColorClass} mb-2`}
            >
              Keterangan (Description)
            </label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!needsAttention}
              className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2
                ${
                  !needsAttention
                    ? `${disabledBgClass} ${disabledTextColorClass} cursor-not-allowed`
                    : `${inputBgClass} ${inputTextColorClass}`
                } ${placeholderColorClass}`}
              placeholder="Enter description here..."
            ></textarea>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 font-medium
                       dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-100"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedFile}
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 font-medium
                       dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPhotoDialog;
