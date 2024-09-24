import Icons from "@repo/ui/icons";
import cn from "classnames";
import { forwardRef } from "react";

type Props = { className?: string; onClick?: () => void; [key: string]: any };

const MoreButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, onClick, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={cn(
          "border border-grey-200 bg-white text-black rounded-lg p-2 w-fit mx-auto",
          className
        )}
        {...rest}
      >
        {Icons.ic_more}
      </button>
    );
  }
);

export default MoreButton;
