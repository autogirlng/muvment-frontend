import { ReactNode, useRef, useState, useEffect } from "react";
import cn from "classnames";
import Tooltip from "@repo/ui/tooltip";
import Icons from "@repo/ui/icons";

type FileFieldProps = {
  name: string;
  id: string;
  type?: string;
  label?: string;
  placeholder: string;
  variant?: "outlined" | "filled";
  icon?: ReactNode;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  info?: boolean;
  tooltipTitle?: string;
  tooltipDescription?: string;
  inputClass?: string;
  className?: string;
  toggleShowPassword?: () => void;
  filePicker?: boolean;
  onFileSelect?: (file: File) => void;
};

const FileInputField = ({
  id,
  label,
  placeholder,
  variant,
  type,
  icon,
  error,
  info,
  tooltipTitle,
  tooltipDescription,
  inputClass,
  className,
  toggleShowPassword,
  filePicker = false,
  onFileSelect,
  value,
  ...rest
}: FileFieldProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | undefined>(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file?.name);
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  useEffect(() => {
    if (filePicker) {
      setFileName(value);
    }
  }, [value, filePicker]);

  return (
    <div className={cn("w-full space-y-1", className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "label text-sm block font-medium text-nowrap",
            variant === "filled" ? "text-white" : "text-grey-900",
            info && "flex items-center gap-3"
          )}
        >
          <span> {label}</span>
          {info && (
            <Tooltip
              title={tooltipTitle || ""}
              description={tooltipDescription || ""}
            />
          )}
        </label>
      )}
      <div className="relative">
        {
          <>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              {...rest}
            />
            <input
              type="text"
              readOnly
              onClick={() => fileInputRef.current?.click()}
              value={fileName?.toString()} //{<mark>{fileName || ""}</mark>}
              placeholder={placeholder}
              className={cn(
                "cursor-pointer w-full rounded-[18px] p-4 text-sm h-[56px] outline-none pr-10",
                inputClass,
                error
                  ? "border border-error-500"
                  : variant === "filled"
                    ? "bg-grey-800 text-grey-400 border-none"
                    : "bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
              )}
            />
          </>
        }

        <div className="absolute right-4   bottom-[22px] fill-grey-500 cursor-pointer">
          {Icons.ic_file}
        </div>
      </div>
      {error && <p className="text-error-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default FileInputField;
