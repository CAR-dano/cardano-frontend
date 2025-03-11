import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function CustomButton({
  children,
  className = "",
  onClick,
}: CustomButtonProps) {
  return (
    <Button className={`${className} font-rubik`} onClick={onClick}>
      {children}
    </Button>
  );
}

export default CustomButton;
