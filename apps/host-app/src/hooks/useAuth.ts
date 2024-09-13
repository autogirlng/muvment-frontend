"use client";

import { api } from "@/lib/api";
import { setToken } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
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

export default function useAuth() {
  const [userToken, setUserToken] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log("Signup error", error.response?.status, error.response?.data);

      if (error.response?.data?.ERR_CODE === "USER_ALREADY_EXIST")
        toast.error("Email already registered");
    },
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
      console.log("Login error", error.response?.status, error.response?.data);

      if (error.response?.data?.ERR_CODE === "INVALID_CREDENTIALS")
        toast.error("Invalid login credentials");

      if (error.response?.data?.ERR_CODE === "USER_NOT_FOUND")
        toast.error("User not found");

      if (error.response?.data?.ERR_CODE === "EMAIL_NOT_CONFIRMED") {
        toast.error("Email not verified");
        router.push(`/verify-email?email=${context?.email}`);
      }
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
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(
        "Verify Email error",
        error.response?.status,
        error.response?.data
      );
    },
  });

  const verifyEmailOnForgotPassword = useMutation({
    mutationFn: (values: verifyEmailValues) =>
      api.post("/api/auth/verify-reset-otp", values),

    onMutate: (values) => {
      return { email: values.email };
    },
    onSuccess: (data, _values, context) => {
      console.log("Email verified successfully", data);
      router.push(`/reset-password?email=${context?.email}`);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(
        "Verify Email error",
        error.response?.status,
        error.response?.data
      );
    },
  });

  const resendVerifyEmailToken = useMutation({
    mutationFn: (values: resendVerifyEmailTokenValues) =>
      api.post("/api/auth/resend-verify-email", values),

    onSuccess: (data) => {
      console.log("Resend Token successful", data);
      toast.success("Token sent successfully");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(
        "Resend Verify Email Token error",
        error.response?.status,
        error.response?.data
      );
    },
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
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(
        "Forgot Password error",
        error.response?.status,
        error.response?.data
      );

      if (error.response?.data?.ERR_CODE === "USER_NOT_FOUND")
        toast.error("User not found");
    },
  });

  const resetPassword = useMutation({
    mutationFn: (values: SetNewPasswordValues) =>
      api.post("/api/auth/reset-password", values),

    onSuccess: (data) => {
      console.log("Password Reset successfully", data);
      toast.success("New password set successfully");
      router.push("/login");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(
        "Password Reset error",
        error.response?.status,
        error.response?.data
      );
    },
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
