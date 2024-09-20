import Icons from "@repo/ui/icons";
import cn from "classnames";

type Props = { className?: string };

export default function MoreButton({ className }: Props) {
  return (
    <div
      className={cn(
        "border border-grey-200 bg-white text-black rounded-lg p-2 w-fit mx-auto",
        className
      )}
    >
      {Icons.ic_more}
    </div>
  );
}
