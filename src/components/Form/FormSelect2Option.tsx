import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setEditedData } from "@/lib/features/inspection/inspectionSlice";

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
  const active = "bg-blue-500 text-white";
  const inactive = "bg-white text-blue-500";

  const dispatch = useDispatch<AppDispatch>();

  const [isLengkap, setIsLengkap] = React.useState(value);

  const handleClick = (optionValue: boolean) => {
    console.log("Selected option:", optionValue);
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
        { value: true, label: "Tidak Ada" },
        { value: false, label: "Indikasi" },
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
      <Label htmlFor={inputFor}>Kelengkapan {label}</Label>

      <div className="flex mt-2 border-2 border-blue-500 rounded-[8px] overflow-hidden">
        <Button
          onClick={() => handleClick(true)}
          className={`w-1/2 h-[48px] rounded-none ${
            isLengkap ? active : inactive
          } hover:bg-blue-500 hover:text-white
          `}
        >
          {options[0].label}
        </Button>
        <Button
          onClick={() => handleClick(false)}
          className={`w-1/2 h-[48px] rounded-none  ${
            !isLengkap ? active : inactive
          } hover:bg-blue-500 hover:text-white
          `}
        >
          {options[1].label}
        </Button>
      </div>
    </div>
  );
}

export default FormSelect2Option;
