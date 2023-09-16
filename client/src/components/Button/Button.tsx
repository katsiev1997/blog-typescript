import React from "react";
import cls from "./Button.module.scss";
import { Link } from "react-router-dom";

type VariantType = "outline" | "default";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  to?: string;
  variant?: VariantType;
  className?: string;
  max?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  to,
  onClick,
  variant = "default",
  className = "",
  max = false
}) => {
  const variantClasses: Record<VariantType, string> = {
    outline: cls.outline,
    default: cls.default,
  };

  return (
    <>
      {to ? (
        <Link
          className={`${cls.btn} ${max && cls.max} ${className} ${
            variantClasses[variant]
          }`}
          to={to}
        >
          {children}
        </Link>
      ) : (
        <button
          className={`${cls.btn} ${max && cls.max} ${className} ${
            variantClasses[variant]
          }`}
          type={type}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
