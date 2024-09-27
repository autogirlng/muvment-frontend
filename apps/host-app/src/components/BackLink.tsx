import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = { backLink: string };

export default function BackLink({ backLink }: Props) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-0.5 text-primary-500 fill-primary-500">
      <CaretLeft size={18} fill="inherit" />
      {/* {backLink ? ( */}
      <Link href={backLink} className="text-sm 2xl:text-base font-medium">
        Back
      </Link>
      {/* ) : (
        <button
          onClick={() => router.back}
          className="text-sm 2xl:text-base font-medium"
        >
          Back
        </button>
      )} */}
    </div>
  );
}
