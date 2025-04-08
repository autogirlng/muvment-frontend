"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { ErrorResponse, User } from "@/utils/types";
import { updateUserData } from "@/lib/features/userSlice";
import { useHttp } from "./useHttp";
import { Dispatch, SetStateAction } from "react";

export default function useUploadImage({
  setProfileImage,
}: {
  setProfileImage: Dispatch<SetStateAction<string|null>>;
}) {
  const http = useHttp();

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const uploadImage = useMutation({
    mutationFn: (values: FormData) =>
      http.put<User>("api/user/imageUpload", values),

    onSuccess: (data) => {
      console.log("Update Image successful", data);
      setProfileImage(data?.profileImage || "");
      dispatch(updateUserData({ ...user, ...data }));
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors(error, "Update Image"),
  });

  return {
    uploadImage,
  };
}
