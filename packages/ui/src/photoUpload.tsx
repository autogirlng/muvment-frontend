import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import Icons from "@repo/ui/icons";
import cn from "classnames";

type Props = {
  label: string;
  name: string;
  id: string;
  disabled?: boolean;
  image: ReactNode;
  onChange: (name: string, value: File | null) => void;
  value: string | File | null;
  error?: string;
  fieldName: string;
  handlePhotoDelete: (fieldName: string) => void;
};

// file size limit

export default function PhotoUpload({
  label,
  name,
  id,
  disabled,
  onChange,
  image,
  value,
  error,
  fieldName,
  handlePhotoDelete,
  ...rest
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      onChange(name, file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      onChange(name, null);
      setPreviewUrl("");
    }
  };

  const handleDelete = (fieldName: string) => {
    setPreviewUrl("");
    onChange(name, null);
    handlePhotoDelete(fieldName);
  };

  useEffect(() => {
    if (!previewUrl && typeof value === "string" && value?.includes("http")) {
      setPreviewUrl(value);
    } else if (previewUrl && typeof value !== "string") {
      URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl, value]);

  return (
    <div>
      <div
        className={cn(
          "bg-grey-50 border-2 border-dashed border-grey-300 rounded-[59px]",
          disabled ? "opacity-50" : ""
        )}
      >
        <label className="h-[270px] sm:h-[400px] 3xl:h-[600px] w-full flex flex-col gap-6 items-center justify-center cursor-pointer">
          {previewUrl ? (
            <div className="h-full w-full relative">
              <img
                src={previewUrl}
                alt="Uploaded preview"
                className="h-full w-full object-cover rounded-[59px]"
              />
              <div className="absolute left-6 bottom-4">
                <button
                  onClick={() => handleDelete(fieldName)}
                  className="w-10 md:w-12 3xl:w-20 h-10 md:h-12 3xl:h-20 rounded-full flex justify-center items-center bg-error-50 text-error-500 *:w-4 *:md:w-5 *:3xl:w-[30px] *:h-4 *:md:h-5 *:3xl:w-[30px]"
                >
                  {Icons.ic_delete}
                </button>
              </div>
            </div>
          ) : (
            <>
              {image}
              <p className="text-grey-600 text-base md:text-xl 3xl:text-h5 !font-medium">
                {label}
              </p>
              <p className="text-primary-500 text-sm md:text-base 3xl:text-h6 flex items-center gap-1">
                {Icons.ic_add_circle} <span>Add Image</span>
              </p>
              <input
                type="file"
                id={id}
                name={name}
                accept=".png, .jpg, .jpeg, .webp"
                onChange={handleFileInputChange}
                style={{ display: "none" }}
                disabled={disabled}
                {...rest}
              />
            </>
          )}
        </label>
      </div>
      {error && (
        <p className="text-error-500 text-sm mt-2 text-nowrap">{error}</p>
      )}
    </div>
  );
}
