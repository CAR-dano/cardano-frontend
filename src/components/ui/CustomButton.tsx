import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

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
    <button
      className={twMerge("font-rubik py-2 px-6", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default CustomButton;
