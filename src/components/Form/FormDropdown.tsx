import * as React from "react";
import { Label } from "../ui/label";
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

interface FormDropdownInputProps {
  label: string;
  inputFor: string;
  value?: string;
  onChange?: (value: string) => void;
}

function FormDropdownInput({
  label,
  inputFor,
  value,
  onChange,
}: FormDropdownInputProps) {
  const { isDarkModeEnabled } = useTheme();
  const options = Object.values(Role).map((role) => ({
    value: String(role),
    label: String(role),
  }));

  return (
    <div className="font-rubik">
      <Label htmlFor={inputFor} className="dark:text-gray-200">
        {label}
      </Label>
      <br />
      <Label className="dark:text-gray-400">Pilihan sekarang: {value}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full border-2 border-purple-500 rounded-[8px] py-3 mt-2 px-2 dark:bg-gray-700 dark:text-gray-100 dark:border-purple-800">
          <SelectValue placeholder="Pilih Role" />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
          <SelectGroup>
            <SelectLabel className="dark:text-gray-400">Pilih Role</SelectLabel>
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
  );
}

export default FormDropdownInput;
