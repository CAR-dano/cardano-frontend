import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../lib/store";
import { useTheme } from "../../contexts/ThemeContext";

interface FormSelect2OptionProps {
  label: string;
  inputFor: string;
  value?: boolean;
  section?: string;
  onChange?: (value: boolean) => void;
  type?: string;
}

function FormSelect2Option({
  label,
  inputFor,
  section,
  value = false,
  onChange,
  type,
}: FormSelect2OptionProps) {
  const { isDarkModeEnabled } = useTheme();
  const active = "bg-blue-500 text-white";
  const inactive = "bg-white text-blue-500";

  const dispatch = useDispatch<AppDispatch>();

  const [isLengkap, setIsLengkap] = React.useState(value);

  const handleClick = (optionValue: boolean) => {
    setIsLengkap(optionValue);
    const newValue = optionValue;
    if (onChange) onChange(newValue);
  };

  const [options, setOptions] = React.useState<any[]>([
    { value: true, label: "Lengkap" },
    { value: false, label: "Belum Lengkap" },
  ]);

  useEffect(() => {
    if (type === "indikasi") {
      setOptions([
        { value: true, label: "Indikasi" },
        { value: false, label: "Tidak Ada" },
      ]);
    } else if (type === "kelengkapan") {
      setOptions([
        { value: true, label: "Lengkap" },
        { value: false, label: "Belum Lengkap" },
      ]);
    }
  }, [type]);

  return (
    <div>
      <Label htmlFor={inputFor} className="dark:text-gray-200">
        Kelengkapan {label}
      </Label>

      <div className="flex mt-2 border-2 border-blue-500 dark:border-blue-800 rounded-[8px] overflow-hidden">
        <Button
          onClick={() => handleClick(true)}
          className={`w-1/2 h-[48px] rounded-none ${
            isLengkap ? active : inactive
          } hover:bg-blue-500 hover:text-white
          ${
            isDarkModeEnabled
              ? isLengkap
                ? "dark:bg-blue-600 dark:text-white"
                : "dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600"
              : ""
          }
          `}
        >
          {options[0].label}
        </Button>
        <Button
          onClick={() => handleClick(false)}
          className={`w-1/2 h-[48px] rounded-none  ${
            !isLengkap ? active : inactive
          } hover:bg-blue-500 hover:text-white
          ${
            isDarkModeEnabled
              ? !isLengkap
                ? "dark:bg-blue-600 dark:text-white"
                : "dark:bg-gray-700 dark:text-blue-300 dark:hover:bg-gray-600"
              : ""
          }
          `}
        >
          {options[1].label}
        </Button>
      </div>
    </div>
  );
}

export default FormSelect2Option;
