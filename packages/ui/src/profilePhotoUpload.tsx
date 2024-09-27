import { AvatarImage } from "@repo/ui/avatar";
import Icons from "@repo/ui/icons";
import { Spinner } from "@repo/ui/spinner";

import { ChangeEvent } from "react";

type Props = {
  label: string;
  name: string;
  id: string;
  disabled?: boolean;
  image?: string | null;
  onChange: (name: string, value: File | null) => void;
  value: string | File | null;
  error?: string;
  isLoading: boolean;
};
export default function ProfilePhotoUpload({
  label,
  name,
  id,
  disabled,
  onChange,
  image,
  value,
  error,
  isLoading,
  ...rest
}: Props) {
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      onChange(name, file);
    } else {
      onChange(name, null);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3">
      <AvatarImage
        image={image || "/images/top_header_avatar.png"}
        initials={Icons.ic_user}
        size="!w-[130px] !h-[130px]"
      />
      <label className="cursor-pointer">
        <p className="text-grey-800 text-sm 3xl:text-base !font-semibold rounded-2xl border-2 border-grey-800 py-3 px-5">
          {isLoading ? <Spinner /> : "Upload Photo"}
        </p>
        <input
          type="file"
          id={id}
          name={name}
          accept=".png, .jpg, .jpeg"
          onChange={handleFileInputChange}
          style={{ display: "none" }}
          disabled={disabled || isLoading}
          {...rest}
        />
      </label>
    </div>
  );
}
