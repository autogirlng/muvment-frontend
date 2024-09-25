"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { handleErrors } from "@/utils/functions";
import { ErrorResponse, ProfileFormValues } from "@/utils/types";
import { updateUserData } from "@/lib/features/userSlice";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

export default function useUpdateProfile(
  setIsProfileEditable: Dispatch<SetStateAction<boolean>>
) {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const updateProfileMutation = useMutation({
    mutationFn: (values: ProfileFormValues) =>
      api.put("/api/user", { ...values }),

    onSuccess: (data) => {
      console.log("Update Profile successful", data);
      dispatch(updateUserData({ ...user, ...data?.data }));
      setIsProfileEditable(false);
      toast.success("Profile Updated");
    },

    onError: (error: AxiosError<ErrorResponse>) =>
      handleErrors("Update Profile", error),
  });

  return {
    updateProfileMutation,
  };
}
