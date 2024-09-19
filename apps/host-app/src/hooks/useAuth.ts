"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { setForgotPasswordOtp } from "@/lib/features/forgotPasswordSlice";
import { setToken } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import {
  ErrorResponse,
  LoginFormValues,
  ResendVerifyEmailTokenValues,
  ResetPasswordEmailValues,
  SetNewPasswordValues,
  SignupFormValues,
  verifyEmailValues,
} from "@/utils/types";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      dispatch(setForgotPasswordOtp(context?.otp));
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Verify Email", error),
  });

  const resendVerifyEmailToken = useMutation({
    mutationFn: (values: ResendVerifyEmailTokenValues) =>
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
      dispatch(setForgotPasswordOtp(""));
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
