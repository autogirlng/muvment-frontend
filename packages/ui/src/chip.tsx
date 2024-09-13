import cn from "classnames";
import { ReactNode } from "react";

type ChipProps = {
  text: string;
  variant?: "filled" | "outlined";
  color?: "dark" | "light";
  radius?: "full" | "md" | "sm";
  icon?: ReactNode;
};

const Chip = ({ text, variant, color, radius, icon }: ChipProps) => {
  const borderRadius =
    radius === "full"
      ? "rounded-full"
      : radius === "md"
        ? "rounded-[14px]"
        : "rounded-lg";

  const border =
    variant === "outlined" ? "border border-grey-300" : "border-none";

  const textColor =
    color === "dark" ? "text-grey-800 !font-medium py-2" : "text-grey-900 py-3";

  return (
    <p
      className={cn(
        "bg-grey-90 px-3 w-fit text-base 3xl:text-xl",
        icon ?"flex items-center gap-1":"",
        borderRadius,
        border,
        textColor
      )}
    >
      {icon ? (
        <>
          <span>{text}</span>
          {icon}
        </>
      ) : (
        text
      )}
    </p>
  );
};
export default Chip;
