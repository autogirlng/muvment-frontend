import React, { useState, useEffect, useRef } from "react";
import Icons from "@repo/ui/icons";
import * as Popover from "@radix-ui/react-popover";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Checkbox from "@radix-ui/react-checkbox";
import cn from "classnames";

type FilterOption = {
  option: string;
  value: string;
};

type FilterCategory = {
  title: string;
  options: FilterOption[];
};

type FilterByProps = {
  categories: FilterCategory[];
  onChange: (selectedFilters: Record<string, string[]>) => void;
  hideOnMobile?: boolean;
};

const FilterBy: React.FC<FilterByProps> = ({
  categories,
  onChange,
  hideOnMobile,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    categories.reduce(
      (acc, category, index) => ({ ...acc, [category.title]: index === 0 }),
      {}
    )
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleCheckboxChange = (categoryTitle: string, optionValue: string) => {
    setSelectedFilters((prevFilters) => {
      const filters = { ...prevFilters };
      if (filters[categoryTitle]?.includes(optionValue)) {
        filters[categoryTitle] = filters[categoryTitle].filter(
          (item) => item !== optionValue
        );
      } else {
        filters[categoryTitle] = [
          ...(filters[categoryTitle] || []),
          optionValue,
        ];
      }

      return filters;
    });
  };

  useEffect(() => {
    onChange(selectedFilters);
  }, [selectedFilters, onChange]);

  useEffect(() => {
    if (contentRef.current && isOpen) {
      setContentHeight(contentRef.current.scrollHeight);

      document.body.style.minHeight = `calc(100vh + ${contentHeight}px)`;
      document.body.style.overflow = "auto";
    } else {
      setContentHeight(0);
      document.body.style.minHeight = "";
      document.body.style.overflow = "";
    }

    return () => {
      setContentHeight(0);
      document.body.style.minHeight = "";
      document.body.style.overflow = "";
    };
  }, [categories, selectedFilters, openSections, isOpen]);

  const addSpaceBeforeUppercase = (str: string): string => {
    return str?.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className="cursor-pointer outline-none text-grey-600 flex items-center gap-2 border border-grey-300 rounded-xl p-3"
          aria-label="Filter"
        >
          {Icons.ic_filter}
          <span
            className={cn(
              "text-grey-500 text-sm",
              hideOnMobile && "hidden sm:block"
            )}
          >
            Filter
          </span>
          <span className={cn(hideOnMobile && "hidden sm:block")}>
            {Icons.ic_chevron_down}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="px-6 py-[14px] w-[360px] bg-white rounded-3xl border border-grey-300 shadow-[-2px_4px_6px_-2px_#10192808,12px_16px_37.4px_-4px_#10192814] "
          sideOffset={5}
          side="bottom"
          avoidCollisions={false}
          align="end"
        >
          <div className="space-y-3" ref={contentRef}>
            <p className="text-base font-semibold text-grey-700">Filter By</p>
            <div className="space-y-6">
              {categories.map((category) => (
                <Collapsible.Root
                  key={category.title}
                  open={openSections[category.title]}
                  onOpenChange={() => toggleSection(category.title)}
                  className="space-y-2"
                >
                  <div key={category.title} className="space-y-3 text-grey-900">
                    <div
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleSection(category.title)}
                    >
                      <p className="text-sm capitalize">
                        {addSpaceBeforeUppercase(category.title)}
                      </p>

                      {openSections[category.title]
                        ? Icons.ic_chevron_up
                        : Icons.ic_chevron_down}
                    </div>
                    <Collapsible.Content className="space-y-3">
                      {category.options.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox.Root
                            className={cn(
                              "w-6 h-6 rounded",
                              selectedFilters[category.title]?.includes(
                                option.value
                              )
                                ? "bg-primary-400"
                                : "bg-white border-[1.5px] border-grey-300"
                            )}
                            checked={selectedFilters[category.title]?.includes(
                              option.value
                            )}
                            onCheckedChange={() =>
                              handleCheckboxChange(category.title, option.value)
                            }
                          >
                            <Checkbox.Indicator className="flex items-center justify-center text-white">
                              {Icons.ic_check}
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <label htmlFor={option.value} className="text-sm">
                            {option.option}
                          </label>
                        </div>
                      ))}
                    </Collapsible.Content>
                  </div>
                </Collapsible.Root>
              ))}
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FilterBy;
