"use client";

import { api } from "@/lib/api";
import { clearUser, setUser } from "@/lib/features/user/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      router.push("/login");
      console.log("Error fetching user", getUser.error);
    }
  }, [getUser.isError, getUser.isSuccess, router]);

  return {
    getUser,
    user_token: userToken,
  };
}
