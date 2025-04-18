import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionTitle = ({
  children,
  className = "",
}: SectionTitleProps) => (
  <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${className}`}>
    {children}
  </h2>
);
