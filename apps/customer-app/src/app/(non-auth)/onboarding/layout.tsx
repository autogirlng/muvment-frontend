"use client";

import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[700px] mx-auto min-h-screen h-auto flex items-center justify-center text-center">
      {children}
    </div>
  );
}
