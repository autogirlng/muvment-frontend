"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { ChangePasswordValues, ErrorResponse } from "@/utils/types";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function useChangePassword() {
  const changePassword = useMutation({
    mutationFn: (values: ChangePasswordValues) =>
      api.put("/api/user/changePassword", values),

    onSuccess: (data) => {
      console.log("Password Changed Successfully", data.data);
      toast.success("Password updated");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors("Change Password", error);
    },
  });

  return {
    changePassword,
  };
}
