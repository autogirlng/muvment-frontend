import {
  lowercaseRegex,
  numberRegex,
  spacesRegex,
  specialCharRegex,
  uppercaseRegex,
} from "@/utils/constants";

export const isLengthValid = (password: string) => {
  const isLengthValid = password.length >= 8;
  return isLengthValid;
};

export const isUpperCaseValid = (password: string) => {
  const hasUppercase = uppercaseRegex.test(password);
  return hasUppercase;
};

export const isLowerCaseValid = (password: string) => {
  const hasLowercase = lowercaseRegex.test(password);
  return hasLowercase;
};

export const isDigitValid = (password: string) => {
  const hasNumber = numberRegex.test(password);
  return hasNumber;
};

export const isSpecialCharacterValid = (password: string) => {
  const hasSpecialChar = specialCharRegex.test(password);
  return hasSpecialChar;
};

export const isSpaceValid = (password: string) => {
  const noSpace = spacesRegex.test(password);
  return noSpace;
};
