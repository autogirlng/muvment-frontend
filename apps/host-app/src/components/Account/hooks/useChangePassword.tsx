"use client";

import { useMutation } from "@tanstack/react-query";
import { ChangePasswordValues, ErrorResponse } from "@/utils/types";
import { handleErrors } from "@/utils/functions";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useHttp } from "@/hooks/useHttp";

export default function useChangePassword() {
  const http = useHttp();

  const changePassword = useMutation({
    mutationFn: (values: ChangePasswordValues) =>
      http.put("/api/user/changePassword", values),

    onSuccess: (data) => {
      console.log("Password Changed Successfully", data);
      toast.success("Password updated");
    },

    onError: (error: AxiosError<ErrorResponse>) => {
      handleErrors(error, "Change Password");
    },
  });

  return {
    changePassword,
  };
}
