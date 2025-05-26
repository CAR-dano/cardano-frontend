import React, { ReactNode } from "react";
import { Button } from "../ui/button";
export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
}
// Komponen Button Secondary
const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      variant="secondary"
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
