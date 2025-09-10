"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Role } from "../../utils/Admin";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useTheme } from "../../contexts/ThemeContext";

interface DialogEditRoleProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newValue: string) => void;
  value?: string;
  label?: string;
  subFieldName?: string;
}

const DialogEditRole = ({
  isOpen,
  onClose,
  onSave,
  value,
  label = "Role",
  subFieldName,
}: DialogEditRoleProps) => {
  const [selectedRole, setSelectedRole] = useState<string>(value || "");

  const options = Object.values(Role)
    .filter((role) => typeof role === "string")
    .map((role) => ({
      value: String(role),
      label: String(role),
    }));

  const handleSave = () => {
    onSave(selectedRole);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-lg p-6 dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-lg">
        <DialogHeader className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
          <DialogTitle className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
            Edit {label}
          </DialogTitle>
        </DialogHeader>
        <div className="font-rubik mt-4">
          <label
            htmlFor={subFieldName}
            className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md py-2 px-3 mt-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:focus:ring-purple-800 dark:focus:border-purple-800">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
              <SelectGroup>
                <SelectLabel className="text-gray-500 dark:text-gray-400">
                  Select Role
                </SelectLabel>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter className="flex flex-row justify-end gap-3 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="outline"
            className="px-6 py-2 rounded-md text-gray-700 border border-gray-300 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedRole}
            className="px-6 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </Button>
        </DialogFooter>
        <DialogDescription className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Please ensure the selected role is correct.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditRole;
