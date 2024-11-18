"use client";
import { ReactNode } from "react";

export default function ExploreLayout({ children }: { children: ReactNode }) {
  return (
    <main className="pb-[188px] pt-[52px] md:pt-16 px-8 lg:px-[52px]">
      {children}
    </main>
  );
}
