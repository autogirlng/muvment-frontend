import cn from "classnames";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";

type PhoneNumberFieldProps = {
  name: string;
  id: string;
  label?: string;
  placeholder: string;
  variant?: "outlined" | "filled";
  value?: string | any;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (value: any) => void;
  [key: string]: any;
};

const PhoneNumberField = ({
  id,
  label,
  placeholder,
  variant,
  error,
  onChange,
  value,
  ...rest
}: PhoneNumberFieldProps) => (
  <div className={cn("w-full space-y-1", error && "-mb-[25px]")}>
    {label && (
      <label
        htmlFor={id}
        className={cn(
          "text-sm block font-medium",
          variant === "filled" ? "text-white" : "text-grey-900"
        )}
      >
        {label}
      </label>
    )}
    <PhoneInput
      className={cn(
        "w-full rounded-[18px] p-4 pr-8 text-sm h-[56px] gap-[5px] outline-none data-[placeholder]:text-grey-400",
        error
          ? "border border-error-500 focus:border-error-500"
          : variant === "filled"
            ? "bg-grey-800 text-grey-400 border-none"
            : "bg-white text-grey-900 border border-grey-300 hover:border-primary-500 focus:border-primary-500 focus:shadow-[0_0_0_4px_#1E93FF1A]"
      )}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...rest}
    />
    {error && <p className="text-error-500 text-sm mt-2">{error}</p>}
  </div>
);

export default PhoneNumberField;

// import cn from "classnames";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input/input";
// import InputField from "@repo/ui/inputField";
// import React from "react";

// type PhoneNumberFieldProps = {
//   name: string;
//   id: string;
//   label?: string;
//   placeholder: string;
//   variant?: "outlined" | "filled";
//   value?: string | any;
//   required?: boolean;
//   disabled?: boolean;
//   error?: string;
//   // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//   onChange: any;
//   [key: string]: any;
// };

// const CustomInput = React.forwardRef<
//   HTMLInputElement,
//   React.InputHTMLAttributes<HTMLInputElement>
// >((props, ref) => (
//   <InputField
//     ref={ref}
//     {...props}
//     name={props.name as string}
//     id={props.id as string}
//     type={props.type as string}
//     placeholder={props.placeholder as string}
//     value={props.value}
//     onChange={props.onChange}
//     onBlur={props.onBlur}
//   />
// ));

// const PhoneNumberField = ({
//   id,
//   label,
//   placeholder,
//   variant,
//   error,
//   onChange,
//   value,
//   ...rest
// }: PhoneNumberFieldProps) => (
//   <div className="w-full space-y-1">
//     {label && (
//       <label
//         htmlFor={id}
//         className={cn(
//           "text-sm block font-medium",
//           variant === "filled" ? "text-white" : "text-grey-900"
//         )}
//       >
//         {label}
//       </label>
//     )}

//     <PhoneInput
//       id={id}
//       inputComponent={CustomInput}
//       placeholder={placeholder}
//       onChange={onChange}
//       value={value}
//       {...rest}
//     />
//     {error && <p className="text-error-500 text-sm mt-2">{error}</p>}
//   </div>
// );

// export default PhoneNumberField;
