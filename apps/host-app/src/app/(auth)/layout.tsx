"use client";
import useAuth from "@/hooks/useAuth";
import { FullPageSpinner } from "@repo/ui/spinner";
import cn from "classnames";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState<boolean>(true);
  const { user_token } = useAuth();

  const otpRoutes = ["/verify-email", "/forgot-password/otp"];
  const isOtpScreen = otpRoutes.includes(pathname);

  useEffect(() => {
    if (user_token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router, user_token]);

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <main>
      <div className="min-h-screen h-full flex">
        <div className="hidden md:block w-1/2 h-auto relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              className="h-full w-full object-cover"
              src="/images/auth/auth_bg.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center px-5 sm:px-10 py-8 sm:py-14">
          <div
            className={cn(
              "w-full",
              isOtpScreen ? "max-w-[711px]" : "max-w-[534px]"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
