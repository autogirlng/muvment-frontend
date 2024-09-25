import * as Avatar from "@radix-ui/react-avatar";
import cn from "classnames";

type AvatarProps = {
  image?: string;
  initials: string;
  size?: string;
};

export const AvatarImage = ({ image, initials, size }: AvatarProps) => (
  <Avatar.Root
    className={cn(
      "inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle",
      size ? size : ""
    )}
  >
    <Avatar.Image
      className="h-full w-full rounded-[inherit] object-cover"
      src={image}
      alt="Colm Tuite"
    />
    <Avatar.Fallback
      className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
      delayMs={600}
    >
      {initials}
    </Avatar.Fallback>
  </Avatar.Root>
);

export const AvatarInitials = ({ initials }: AvatarProps) => (
  <Avatar.Root className="inline-flex h-[50px] w-[50px] select-none overflow-hidden rounded-full align-middle">
    <Avatar.Fallback className="text-white flex h-full w-full items-center justify-center bg-grey-800 text-sm 3xl:text-base font-medium">
      {initials}
    </Avatar.Fallback>
  </Avatar.Root>
);
