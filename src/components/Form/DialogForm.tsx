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
import FormEstimasiPerbaikan from "./FormEstimasiPerbaikan";

interface DialogFormProps {
  label: string;
  subFieldName: string;
  oldValue?: any;
  type?: string;
  fieldName?: string;
  onClose: () => void;
  onSave: (newValue: any) => void;
  isOpen: boolean; // New prop to control dialog visibility
}

export function DialogForm({
  label,
  subFieldName,
  oldValue,
  type,
  onClose,
  onSave,
  isOpen,
  fieldName,
}: DialogFormProps) {
  const [newValue, setNewValue] = useState(oldValue);

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
            inputFor={subFieldName}
            value={oldValue}
            section={fieldName} // tetap gunakan section
            onChange={handleChange}
          />
        );
      case "date-input":
        return (
          <FormDateInput
            label={label}
            inputFor={subFieldName}
            value={oldValue ? new Date(oldValue) : undefined}
            section={fieldName} // tetap gunakan section
            onChange={handleChange}
          />
        );
      case "select-2-input-kelengkapan":
        return (
          <FormSelect2Option
            label={label}
            inputFor={subFieldName}
            value={oldValue}
            section={fieldName} // tetap gunakan section
            type="kelengkapan"
            onChange={handleChange}
          />
        );

      case "select-2-input-indikasi":
        return (
          <FormSelect2Option
            label={label}
            inputFor={subFieldName}
            value={oldValue}
            section={fieldName} // tetap gunakan section
            type="indikasi"
            onChange={handleChange}
          />
        );
      case "dropdown-inspektor":
        return (
          <FormDropdownInput
            label={label}
            section={fieldName} // tetap gunakan section
            inputFor={subFieldName}
            value={oldValue}
            onChange={handleChange}
            type="inspektor"
          />
        );
      case "dropdown-lokasi":
        return (
          <FormDropdownInput
            label={label}
            inputFor={subFieldName}
            value={oldValue}
            onChange={handleChange}
            type="lokasi"
            section={fieldName} // tetap gunakan section
          />
        );
      case "penilaian-summary":
        return (
          <FormPenilaianSummmary
            label={label}
            inputFor={subFieldName}
            value={oldValue}
            onChange={handleChange}
          />
        );
      case "penilaian-array":
        return (
          <FormArray
            label={label}
            inputFor={subFieldName}
            value={oldValue}
            onChange={handleChange}
            section={fieldName} // tetap gunakan section
          />
        );
      case "estimasi-perbaikan":
        return (
          <FormEstimasiPerbaikan
            label={label}
            value={oldValue}
            onChange={handleChange}
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
