import React, { ReactNode } from "react";
import { Button } from "../ui/button";
export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}
// Komponen Button Secondary
const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <Button onClick={onClick} className={className} variant="secondary">
      {children}
    </Button>
  );
};

export default SecondaryButton;
