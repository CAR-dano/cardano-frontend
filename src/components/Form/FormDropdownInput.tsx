import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";

interface FormDropdownInputProps {
  label: string;
  inputFor: string;
  value?: string;
  type?: string;
  section?: string;
  onChange?: (value: string) => void;
}

const optionLokasi = [
  { value: "Semarang", label: "Semarang" },
  { value: "Yogyakarta", label: "Yogyakarta" },
];

const optionInspektor = [
  { value: "Inspektor 1", label: "Inspektor 1" },
  { value: "Inspektor 2", label: "Inspektor 2" },
];

function FormDropdownInput({
  label,
  inputFor,
  value,
  onChange,
  type,
  section,
}: FormDropdownInputProps) {
  const [options, setOptions] = React.useState<any[]>([]);
  const [option, setOption] = React.useState<any>("");
  const checkType = () => {
    if (type === "inspektor") {
      setOptions(optionInspektor);
      setOption("Inspektor");
    } else if (type === "lokasi") {
      setOptions(optionLokasi);
      setOption("Lokasi");
    }
  };

  React.useEffect(() => {
    checkType();
  }, [type]);

  const handleChange = (newValue: string) => {
    if (onChange) onChange(newValue);
  };

  return (
    <div className="font-rubik">
      <Label htmlFor={inputFor}>{label}</Label>
      <br />
      <Label>Pilihan sekarang: {value}</Label>

      <SelectDemo
        value={value}
        onValueChange={handleChange}
        options={options}
        option={option}
      />
    </div>
  );
}

export default FormDropdownInput;

export function SelectDemo(props: {
  value?: string;
  options?: { value: string; label: string }[];
  option?: string;
  onValueChange?: (value: string) => void;
}) {
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(
    props.value
  );

  return (
    <Select
      onValueChange={(value) => {
        setSelectedValue(value);
        if (props.onValueChange) props.onValueChange(value);
      }}
      value={selectedValue}
    >
      <SelectTrigger className="w-full border-2 border-purple-500 rounded-[8px] py-5 mt-2">
        <SelectValue placeholder="Piih" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Pilih {props.option}</SelectLabel>
          {props.options?.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
