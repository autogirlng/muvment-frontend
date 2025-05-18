import React from "react";
import { SectionTitle } from "./SectionTile";

interface TermsSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const TermsSection = ({
  title,
  children,
  className = "",
  id,
}: TermsSectionProps) => (
  <section id={id} className={`mb-8 sm:mb-10 ${className}`}>
    <SectionTitle className="text-[28px]">{title}</SectionTitle>
    {children}
  </section>
);
