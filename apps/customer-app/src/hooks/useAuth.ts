"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setForgotPasswordOtp } from "@/lib/features/forgotPasswordSlice";
import { setToken } from "@/lib/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import {
  ErrorResponse,
  LoginFormValues,
  ResendVerifyEmailTokenValues,
  ResetPasswordEmailValues,
  SendPhoneNumberTokenValues,
  SetNewPasswordValues,
  SignupFormValues,
  verifyEmailValues,
  VerifyPhoneNumberTokenValues,
} from "@/utils/types";
import { useHttp } from "./useHttp";

export default function useAuth() {
  const http = useHttp();
  const queryClient = useQueryClient();

  const [userToken, setUserToken] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { forgotPasswordOtp } = useAppSelector((state) => state.forgotPassword);

  useEffect(() => {
    const user_token = window.localStorage.getItem("user_token");
    setUserToken(user_token || "");

    if (user_token) {
      router.push("/bookings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signupMutation = useMutation({
    mutationFn: (values: SignupFormValues) =>
      http.post("/api/auth/signup", { ...values }),

    onMutate: (values) => {
      return {
        phoneNumber: values.phoneNumber,
        countryCode: values.countryCode,
        country: values.country,
        email: values.email,
      };
    },

    onSuccess: (data, _values, context) => {
      // router.push(
      //   `/verify-number?phoneNumber=${encodeURIComponent(context?.phoneNumber ?? "")}&countryCode=${encodeURIComponent(context?.countryCode ?? "")}&country=${encodeURIComponent(context?.country ?? "")}`
      // );
      router.push(
        `/verify-email?email=${encodeURIComponent(context?.email ?? "")}`
      );
      console.log("Signup successful", data);
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Signup"),
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) =>
      http.post<string>("/api/auth/login", values),

    onMutate: (values) => {
      return { email: values.email };
    },

    onSuccess: (data) => {
      console.log("Login successful");
      dispatch(setToken(data || ""));
      router.push("/bookings");
      queryClient.clear();
    },

    onError: (error: AxiosError<ErrorResponse>, _values, context) => {
      if (error.response?.data?.ERR_CODE === "EMAIL_NOT_CONFIRMED") {
        console.log("redirect user");

        router.push(
          `/verify-email?email=${encodeURIComponent(context?.email ?? "")}`
        );
      }

      handleErrors(error, "Login");
    },
  });

  // TODO: work on this...
  const verifyNumberOnSignup = useMutation({
    mutationFn: (values: VerifyPhoneNumberTokenValues) =>
      http.post<string>("/api/auth/email/verify", values),

    onSuccess: (data) => {
      console.log("Email verified successfully", data);
      toast.success("Account created successfully");
      dispatch(setToken(data || ""));
      router.push("/bookings");
      queryClient.clear();
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Verify Email"),
  });

  // TODO: work on this...
  const resendVerifyNumberToken = useMutation({
    mutationFn: (values: SendPhoneNumberTokenValues) =>
      http.post("/api/auth/resend-verify-email", values),

    onSuccess: (data) => {
      console.log("Resend Token successful", data);
      toast.success("Token sent successfully");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Resend Verify Email Token"),
  });

  const verifyEmailOnSignup = useMutation({
    mutationFn: (values: verifyEmailValues) =>
      http.post<string>("/api/auth/email/verify", values),

    onSuccess: (data) => {
      console.log("Email verified successfully", data);
      toast.success("Account created successfully");
      dispatch(setToken(data || ""));
      router.push("/onboarding/add-image");
      queryClient.clear();
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Verify Email"),
  });

  const verifyEmailOnForgotPassword = useMutation({
    mutationFn: (values: verifyEmailValues) =>
      http.post("/api/auth/verify-reset-otp", values),

    onMutate: (values) => {
      return { email: values.email, otp: values.token };
    },

    onSuccess: (data, _values, context) => {
      console.log("Email verified successfully", data);
      router.push(
        `/reset-password?email=${encodeURIComponent(context?.email ?? "")}`
      );
      dispatch(setForgotPasswordOtp(context?.otp));
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Verify Email"),
  });

  const resendVerifyEmailToken = useMutation({
    mutationFn: (values: ResendVerifyEmailTokenValues) =>
      http.post("/api/auth/resend-verify-email", values),

    onSuccess: (data) => {
      console.log("Resend Token successful", data);
      toast.success("Token sent successfully");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Resend Verify Email Token"),
  });

  const forgotPassword = useMutation({
    mutationFn: (values: ResetPasswordEmailValues) =>
      http.post("/api/auth/forgot-password", values),

    onMutate: (values) => {
      return { email: values.email };
    },

    onSuccess: (data, _values, context) => {
      console.log("Forgot password successful", data);
      router.push(
        `/forgot-password/otp?email=${encodeURIComponent(context?.email ?? "")}`
      );
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Forgot Password"),
  });

  const resetPassword = useMutation({
    mutationFn: (values: SetNewPasswordValues) => {
      const { password_checks, password, ...submissionValues } = values;

      return http.post("/api/auth/reset-password", {
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
      handleErrors(error, "Password Reset"),
  });

  return {
    signupMutation,
    loginMutation,
    verifyNumberOnSignup,
    resendVerifyNumberToken,
    verifyEmailOnSignup,
    verifyEmailOnForgotPassword,
    resendVerifyEmailToken,
    forgotPassword,
    resetPassword,
    user_token: userToken,
  };
}
