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

interface ButtonDropdownProps {
  title: string;
  items: string[];
  setValue: (value: string) => void;
  className?: string;
}

export function ButtonDropdown({
  title,
  items,
  setValue,
  className,
}: ButtonDropdownProps) {
  const handleChange = (value: string) => {
    setValue(value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
