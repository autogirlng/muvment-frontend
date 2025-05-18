"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SectionNavProps {
  sections: { id: string; label: string }[];
}

export const SectionNav = ({ sections }: SectionNavProps) => {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "");
  const pathname = usePathname();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Adjusted offset
        behavior: "smooth",
      });
      window.history.replaceState(null, "", `${pathname}#${id}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // Adjusted for header

      document.querySelectorAll("section").forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden sticky top-16 z-30 bg-white shadow-sm">
        <div className="overflow-x-auto py-3 hide-scrollbar">
          <div className="flex space-x-4 px-4 min-w-max">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? " text-[#0673FF]"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="flex flex-col space-y-1 p-4 border-[2px] border-grey-50 bg-white rounded-2xl ">
          <p className="py-2 mb-3 text-[#101928] font-medium text-sm border-b-[#E4E7EC] border-b-2">
            Quick Navigation
          </p>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-4 py-3 rounded-lg text-left text-sm  transition-colors ${
                activeSection === section.id
                  ? " text-[#0673FF]"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
