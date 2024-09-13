import cn from "classnames";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "filled" | "outlined";
  color?: "primary" | "white" | "transparent";
  radius?: "full" | "rounded" | "lg" | "md";
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  [key: string]: any;
};

const Button = ({
  children,
  onClick,
  variant,
  color,
  radius,
  fullWidth,
  loading,
  className,
  ...rest
}: ButtonProps) => {
  const btnWidth = fullWidth
    ? "w-full py-4 !font-semibold text-sm 2xl:text-base"
    : "w-fit py-5 2xl:py-6 !font-medium text-base md:text-xl 2xl:text-h6";

  const btnRadius =
    radius === "full" ? "" : radius === "lg" ? "rounded-[32px]" : "rounded-2xl";

  const btnBorder =
    variant === "outlined"
      ? "border-2 border-solid border-black"
      : "border-none";

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
        "px-9 md:px-11 2xl:px-[52px]",
        btnWidth,
        btnRadius,
        btnBorder,
        btnBgColor,
        btnTextColor,
        className
      )}
      onClick={onClick}
    >
      {loading ? <p>Loading...</p> : children}
    </button>
  );
};
export default Button;
