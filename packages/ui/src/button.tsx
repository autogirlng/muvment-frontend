"use client";

import cn from "classnames";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outlined";
  color?: "primary" | "white" | "transparent";
  radius?: "full" | "rounded" | "lg" | "md";
  fullWidth?: boolean;
  [key: string]: any;
};

const Button = ({
  children,
  onClick,
  variant,
  color,
  radius,
  fullWidth,
  ...rest
}: ButtonProps) => {
  const btnWidth = fullWidth ? "w-full py-4" : "w-fit py-6";

  const btnRadius =
    radius === "full" ? "" : radius === "lg" ? "rounded-[32px]" : "rounded-2xl";

  const btnBorder =
    variant === "outlined" ? "border border-solid border-black" : "border-none";

  const btnBgColor =
    color === "primary"
      ? "bg-primary-500"
      : color === "white"
        ? "bg-white"
        : "bg-transparent";

  const btnTextColor =
    color === "primary"
      ? "text-white"
      : color === "white"
        ? "text-primary-500"
        : "text-black";

  return (
    <button
      {...rest}
      className={cn(
        "px-[52px] font-medium",
        btnWidth,
        btnRadius,
        btnBorder,
        btnBgColor,
        btnTextColor
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
