import { SignupFormValues } from "@/utils/types";

<<<<<<< HEAD
export const apiUrl = "https://dev-muvment.up.railway.app";
=======
export const apiUrl = "https://dev-muvment.up.railway.app/";
>>>>>>> d9f2352492730eeff72d585e92a144a72be36d72

export const fullNameRegEx = /^[A-Za-z'-]+\s[A-Za-z'-]+(?:\s[A-Za-z'-]+)*\s*$/;

export const phoneNumberRegEx = /^(\d{11})$/;

export const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const uppercaseRegex = /[A-Z]/;

export const lowercaseRegex = /[a-z]/;

export const numberRegex = /[0-9]/;

export const specialCharRegex = /[@$!#%*?_&]/;

export const spacesRegex = /^\S*$/;

export const standardServiceFeeInPercentage = 0.2;

type PasswordCheckKey = keyof NonNullable<SignupFormValues["password_checks"]>;
export const passwordChecks: { label: string; check: PasswordCheckKey }[] = [
  { label: "8 characters long", check: "length" },
  { label: "One digit", check: "digit" },
  { label: "One uppercase character", check: "uppercase_letters" },
  { label: "One special character", check: "special_character" },
  { label: "One lowercase character", check: "lowercase_letters" },
  { label: "Must not include spaces", check: "no_space" },
];

// export const countryMap: { [key: string]: string } = {
//   NG: "NGN",
//   GH: "GHS",
// };
