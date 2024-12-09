import Icons from "@repo/ui/icons";
import cn from "classnames";
import Link from "next/link";

type Props = { backLink: string; className?: string };

export default function BackLink({ backLink, className }: Props) {
  return (
    <div
      className={cn("flex items-center gap-0.5 text-primary-500", className)}
    >
      {Icons.ic_chevron_left}
      <Link href={backLink} className="text-sm 2xl:text-base font-medium">
        Back
      </Link>
    </div>
  );
}
