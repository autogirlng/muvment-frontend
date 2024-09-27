import Image from "next/image";
import cn from "classnames";
import { ReactNode } from "react";

type Props = {
  title: string;
  message?: string | ReactNode;
  image: string;
  imageSize?: string;
};

export default function EmptyState({
  title,
  message,
  image,
  imageSize,
}: Props) {
  return (
    <div className="bg-grey-75 rounded-[40px] py-[88px] px-5 space-y-6 2xl:space-y-10 flex flex-col items-center justify-center">
      <Image
        src={image}
        alt=""
        width={182}
        height={151}
        className={cn("w-[112px] 3xl:w-[182px]", imageSize)}
      />
      <div className="space-y-3 2xl:space-y-6 text-center text-grey-500">
        <h3 className="text-h6 2xl:text-h4 4xl:text-h3 font-medium">{title}</h3>
        {message && (
          <p className="text-base 2xl:text-xl 4xl:text-h6 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
