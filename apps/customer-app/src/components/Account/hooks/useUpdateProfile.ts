"use client";

import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { ErrorResponse, ProfileFormValues, User } from "@/utils/types";
import { updateUserData } from "@/lib/features/userSlice";
import { useHttp } from "@/hooks/useHttp";

export default function useUpdateProfile(
  setIsProfileEditable: Dispatch<SetStateAction<boolean>>
) {
  const http = useHttp();

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const updateProfileMutation = useMutation({
    mutationFn: (values: ProfileFormValues) =>
      http.put<User>("/api/user", { ...values }),

    onSuccess: (data) => {
      console.log("Update Profile successful", data);
      dispatch(updateUserData({ ...user, ...data }));
      setIsProfileEditable(false);
      toast.success("Profile Updated");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Update Profile"),
  });

  const uploadImage = useMutation({
    mutationFn: (values: FormData) =>
      http.put<User>("api/user/imageUpload", values),

    onSuccess: (data) => {
      console.log("Update Image successful", data);
      dispatch(updateUserData({ ...user, ...data }));
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Update Image"),
  });

  return {
    updateProfileMutation,
    uploadImage,
  };
}
