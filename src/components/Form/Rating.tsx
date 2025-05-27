"use client";
import { useTheme } from "../../contexts/ThemeContext";

interface RatingProps {
  label?: string;
  selected?: number | null;
  setSelected?: (value: number | null) => void;
  onChange?: (value: number | null) => void;
}

export default function Rating({
  label,
  selected,
  setSelected,
  onChange,
}: RatingProps) {
  const { isDarkModeEnabled } = useTheme();
  const handleSelect = (num: number) => {
    if (setSelected) setSelected(num);
    if (onChange) onChange(num);
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2">
        {Array.from({ length: 11 }, (_, i) => i).map((num) => (
          <button
            key={num}
            onClick={handleSelect.bind(null, num)}
            className={`w-8 h-8 rounded-[12px] border-2 flex items-center justify-center text-sm font-semibold transition-all hover:bg-blue-500 hover:text-white
              ${
                selected === num
                  ? "bg-blue-500 text-white border-blue-500 dark:bg-blue-600 dark:border-blue-600 dark:text-white"
                  : "text-black border-blue-500 hover:bg-blue-100 dark:text-gray-200 dark:border-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-300"
              }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
