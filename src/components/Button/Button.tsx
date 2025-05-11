import React, { ReactNode } from "react";

export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg py-1 px-4 font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
