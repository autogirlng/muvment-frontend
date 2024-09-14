"use client";

import { api } from "@/lib/api";
import { clearOtp, setOtp } from "@/lib/features/user/forgotPasswordSlice";
import { setToken } from "@/lib/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  ErrorResponse,
  LoginFormValues,
  resendVerifyEmailTokenValues,
  ResetPasswordEmailValues,
  SetNewPasswordValues,
  SignupFormValues,
  verifyEmailValues,
} from "@/utils/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const handleErrors = (
  page: string,
  error: AxiosError<ErrorResponse>,
  redirectUser?: () => void
) => {
  console.log(`${page} error`, error.response?.status, error.response?.data);
  const ERR_CODE = error.response?.data?.ERR_CODE;

  // signup errors
  if (ERR_CODE === "USER_ALREADY_EXIST")
    toast.error("Email already registered");

  // login errors
  if (error.response?.data?.ERR_CODE === "INVALID_CREDENTIALS")
    toast.error("Invalid login credentials");

  if (error.response?.data?.ERR_CODE === "USER_NOT_FOUND")
    toast.error("User not found");

  if (error.response?.data?.ERR_CODE === "EMAIL_NOT_CONFIRMED") {
    toast.error("Email not verified");
    redirectUser && redirectUser();
  }

  // resend verify email token errors
  if (error.response?.data?.ERR_CODE === "EMAIL_ALREADY_CONFIRMED")
    toast.error("Email already confirmed");
};

export default function useAuth() {
  const [userToken, setUserToken] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { forgotPasswordOtp } = useAppSelector((state) => state.forgotPassword);

  useEffect(() => {
    const user_token = window.localStorage.getItem("user_token");
    setUserToken(user_token || "");

    if (user_token) {
      router.push("/dashboard");
    }
  }, []);

  const signupMutation = useMutation({
    mutationFn: (values: SignupFormValues) =>
      api.post("/api/auth/signup", values),

    onMutate: (values) => {
      return { email: values.email };
    },

    onSuccess: (data, _values, context) => {
      router.push(`/verify-email?email=${context?.email}`);
      console.log("Signup successful", data);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Signup", error),
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) =>
      api.post("/api/auth/login", values),

    onMutate: (values) => {
      return { email: values.email };
    },

    onSuccess: (data) => {
      console.log("Login successful", data?.data);
      dispatch(setToken(data.data || ""));
      router.push("/dashboard");
    },

    onError: (error: AxiosError<ErrorResponse>, _values, context) => {
      // not tested this yet
      handleErrors("Login", error, () =>
        router.push(`/verify-email?email=${context?.email}`)
      );

      // if (error.response?.data?.ERR_CODE === "EMAIL_NOT_CONFIRMED") {
      //   toast.error("Email not verified");
      //   router.push(`/verify-email?email=${context?.email}`);
      // }
    },
  });

  const verifyEmailOnSignup = useMutation({
    mutationFn: (values: verifyEmailValues) =>
      api.post("/api/auth/email/verify", values),

    onSuccess: (data) => {
      console.log("Email verified successfully", data);
      toast.success("Account created successfully");
      router.push("/login");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Verify Email", error),
  });

  const verifyEmailOnForgotPassword = useMutation({
    mutationFn: (values: verifyEmailValues) =>
      api.post("/api/auth/verify-reset-otp", values),

    onMutate: (values) => {
      return { email: values.email, otp: values.token };
    },

    onSuccess: (data, _values, context) => {
      console.log("Email verified successfully", data);
      router.push(`/reset-password?email=${context?.email}`);
      dispatch(setOtp(context?.otp));
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Verify Email", error),
  });

  const resendVerifyEmailToken = useMutation({
    mutationFn: (values: resendVerifyEmailTokenValues) =>
      api.post("/api/auth/resend-verify-email", values),

    onSuccess: (data) => {
      console.log("Resend Token successful", data);
      toast.success("Token sent successfully");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Resend Verify Email Token", error),
  });

  const forgotPassword = useMutation({
    mutationFn: (values: ResetPasswordEmailValues) =>
      api.post("/api/auth/forgot-password", values),

    onMutate: (values) => {
      return { email: values.email };
    },

    onSuccess: (data, _values, context) => {
      console.log("Forgot password successful", data);
      router.push(`/forgot-password/otp?email=${context?.email}`);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Forgot Password", error),
  });

  const resetPassword = useMutation({
    mutationFn: (values: SetNewPasswordValues) => {
      const { password_checks, password, ...submissionValues } = values;

      return api.post("/api/auth/reset-password", {
        ...submissionValues,
        newPassword: values.password,
        token: forgotPasswordOtp,
      });
    },

    onSuccess: (data) => {
      dispatch(clearOtp());
      console.log("Password Reset successfully", data);
      toast.success("New password set successfully");
      router.push("/login");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Password Reset", error),
  });

  return {
    signupMutation,
    loginMutation,
    verifyEmailOnSignup,
    verifyEmailOnForgotPassword,
    resendVerifyEmailToken,
    forgotPassword,
    resetPassword,
    user_token: userToken,
  };
}
