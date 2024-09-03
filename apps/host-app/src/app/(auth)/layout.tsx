"use client";
import cn from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const otpRoutes = ["/verify-email", "/forgot-password/otp"];
  const isOtpScreen = otpRoutes.includes(pathname);

  return (
    <main>
      <div className="min-h-screen h-full flex">
        <div className="w-1/2 h-auto relative">
          <div className="absolute top-0 left-0 w-full h-full">
            <Image
              className="h-full w-full object-cover"
              src="/images/auth_bg.png"
              alt=""
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="w-1/2 flex justify-center items-center p-8">
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
