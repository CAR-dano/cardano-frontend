"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import FormNormalInput from "./FormNormalInput";
import FormDateInput from "./FormDateInput";
import FormSelect2Option from "./FormSelect2Option";
import FormDropdownInput from "./FormDropdownInput";
import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { setEditedData } from "@/lib/features/inspection/inspectionSlice";
import { useState } from "react";
import FormPenilaianSummmary from "./FormPenilaianSummary";
import FormArray from "./FormArray";

interface DialogFormProps {
  label: string;
  inputFor: string;
  value?: any;
  type?: string;
  section?: string;
  onClose: () => void;
  onSave: (newValue: any) => void;
  isOpen: boolean; // New prop to control dialog visibility
}

interface EditProps {
  part: string;
  section: string;
  before: string;
  after: string;
}

export function DialogForm({
  label,
  inputFor,
  value,
  type,
  onClose,
  onSave,
  isOpen,
  section,
}: DialogFormProps) {
  const [newValue, setNewValue] = useState(value);

  const handleChange = (value: any) => {
    if (typeof value === "boolean") {
      setNewValue(value);
    }
    // if array
    else if (Array.isArray(value)) {
      setNewValue(value);
    } else {
      setNewValue(value.toString());
    }
  };

  const handleTypeInput = () => {
    switch (type) {
      case "normal-input":
        return (
          <FormNormalInput
            label={label}
            inputFor={inputFor}
            value={value}
            section={section}
            onChange={handleChange}
          />
        );
      case "date-input":
        return (
          <FormDateInput
            label={label}
            inputFor={inputFor}
            value={value ? new Date(value) : undefined}
            section={section}
            onChange={handleChange}
          />
        );
      case "select-2-input-kelengkapan":
        return (
          <FormSelect2Option
            label={label}
            inputFor={inputFor}
            value={value}
            section={section}
            type="kelengkapan"
            onChange={handleChange}
          />
        );

      case "select-2-input-indikasi":
        return (
          <FormSelect2Option
            label={label}
            inputFor={inputFor}
            value={value}
            section={section}
            type="indikasi"
            onChange={handleChange}
          />
        );
      case "dropdown-inspektor":
        return (
          <FormDropdownInput
            label={label}
            section={section}
            inputFor={inputFor}
            value={value}
            onChange={handleChange}
            type="inspektor"
          />
        );
      case "dropdown-lokasi":
        return (
          <FormDropdownInput
            label={label}
            inputFor={inputFor}
            value={value}
            onChange={handleChange}
            type="lokasi"
          />
        );
      case "penilaian-summary":
        return (
          <FormPenilaianSummmary
            label={label}
            inputFor={inputFor}
            value={value}
            onChange={handleChange}
          />
        );
      case "penilaian-array":
        return (
          <FormArray
            label={label}
            inputFor={inputFor}
            value={value}
            onChange={handleChange}
            section={section}
          />
        );
      default:
        return null;
    }
  };

  const handleSave = () => {
    onSave(newValue);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {" "}
      {/* Dialog will be controlled by `isOpen` */}
      <DialogContent aria-modal="false" className="w-screen ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Edit {label}
          </DialogTitle>
        </DialogHeader>

        {handleTypeInput()}

        <DialogFooter className="flex sm:flex-col md:flex-col lg:flex-col justify-center mt-1">
          <DialogDescription className="text-center text-sm font-normal text-left">
            Pastikan data yang diinput sudah benar dan sesuai dengan data yang
            ada di lapangan.
          </DialogDescription>
          <div className="flex justify-end gap-2 mt-5">
            <Button
              variant="outline"
              className="bg-white text-black border border-gray-300 hover:bg-gray-100 hover:text-gray-900"
              onClick={onClose} // Fungsi untuk menutup dialog
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
