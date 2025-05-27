import React from "react";
import { Label } from "../ui/label";
import { useTheme } from "../../contexts/ThemeContext";

interface FormNormalInputProps {
  label: string;
  inputFor: string;
  value?: string;
  section?: string;
  onChange?: (value: string) => void;
}

function FormNormalInput({
  label,
  inputFor,
  value = "", // fallback untuk mencegah undefined
  onChange,
  section,
}: FormNormalInputProps) {
  const [newValue, setNewValue] = React.useState(value);
  const { isDarkModeEnabled } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
    const newValue = e.target.value;
    onChange?.(newValue);
  };

  return (
    <div className="font-rubik">
      <Label
        className="text-xl font-normal dark:text-gray-200"
        htmlFor={inputFor}
      >
        {label}
      </Label>

      <input
        type="text"
        id={inputFor}
        name={inputFor}
        value={newValue} // controlled input
        onChange={handleChange}
        className="mt-2 px-4 py-3 block w-full rounded-md border-2 border-purple-500 text-lg focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-gray-100 dark:border-purple-800 dark:focus:border-purple-800 dark:focus:ring-purple-800"
      />
    </div>
  );
}

export default FormNormalInput;
