import React, { ReactNode } from "react";
import { Button } from "../ui/button";

export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

// Komponen Button Primary
const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
