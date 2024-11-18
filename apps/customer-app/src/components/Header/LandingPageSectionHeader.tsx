import cn from "classnames";
import { ReactNode } from "react";

type Props = {
  coloredTitle?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

export default function LandingPageSectionHeader({
  coloredTitle,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: Props) {
  return (
    <div className={cn("space-y-[11px]", className)}>
      <h1
        className={cn(
          "text-h4 md:text-h3 3xl:text-[40px] !font-bold",
          titleClassName
        )}
      >
        {coloredTitle && <span className="text-primary-500">{coloredTitle}</span>}{" "}
        {title}
      </h1>
      {description && (
        <p
          className={cn(
            "text-sm md:text-base 3xl:text-h6",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
