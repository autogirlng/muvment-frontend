"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { clearUser, setUser } from "@/lib/features/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { toast } from "react-toastify";

export default function useUser() {
  const [userToken, setUserToken] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const user_token = window.localStorage.getItem("user_token");
    setUserToken(user_token || "");

    if (!user_token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = useQuery({
    queryKey: ["getUser"],
    queryFn: () => api.get("/api/user"),
    enabled: !!userToken,
  });

  useEffect(() => {
    if (getUser.isSuccess) {
      console.log("User data fetched successfully", getUser.data.data);
      dispatch(
        setUser({
          user: getUser.data.data,
          userToken: userToken || "",
          isAuthenticated: true,
          isLoading: false,
        })
      );
    }

    if (getUser.isError) {
      dispatch(clearUser());
      if (getUser.error?.message === "Network Error") {
        console.log(getUser.error?.message);
        toast.error("Network Error");
      } else {
        router.push("/login");
      }

      console.log("Error fetching user", getUser.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser.isError, getUser.isSuccess]);

  return {
    getUser,
    user_token: userToken,
  };
}
