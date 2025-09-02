import { addSpaceBeforeUppercase, debounce } from "@/utils/functions";
import { HorizontalDivider } from "@repo/ui/divider";
import Icons from "@repo/ui/icons";
import { Popup } from "@repo/ui/popup";
import SearchInput from "@repo/ui/searchInput";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import cn from "classnames";
import { CANCELLED } from "dns";

type Props = {
  name: string;
  list?: string[];
  filterName: string;
  onChange: (filterName: string, value: string | number[]) => void;
  selectedItems: string[] | number[];
  onClearIndividual?: (filterName: string, value: string) => void;
};

const filterTitleStyle =
  "text-grey-800 text-base md:text-xl 3xl:text-h6 !font-semibold";

const filterTitleStyleWithoutPopup =
  "text-grey-800 text-sm md:text-base 3xl:text-xl !font-semibold";

export function ChipFilter({
  name,
  list,
  filterName,
  onChange,
  selectedItems,
  onClearIndividual,
}: Props) {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  useUpdateBodyHeight({ isOpen: popupIsOpen, contentRef });

  const isItemSelected = (item: string) => {
    if (filterName === "numberOfSeats") {
      return (selectedItems as string[]).includes(
        item.split(" ")[0].replace("+", "")
      );
    }
    return selectedItems.includes(item as never);
  };

  const handleItemClick = (item: string) => {
    if (filterName === "numberOfSeats") {
      // Extract the number from "2 seater", "3 seater", etc.
      const seatNumber = item.split(" ")[0].replace("+", "");
      onChange(filterName, seatNumber);
    } else {
      onChange(filterName, item);
    }
  };

  const handleClearItem = (item: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (filterName === "numberOfSeats") {
      // Extract the number from "2 seater", "3 seater", etc.
      const seatNumber = item.split(" ")[0].replace("+", "");
      onChange(filterName, seatNumber);
    } else {
      onChange(filterName, item);
    }
  };

  return (
    <Popup
      open={true}
      isOpen={popupIsOpen}
      handleIsOpen={(open: boolean) => setPopupIsOpen(open)}
      trigger={
        <button
          className={cn(
            "bg-white border border-grey-300 rounded-lg px-3 py-1 flex items-center gap-2 text-grey-600 text-xs 3xl:text-sm !font-semibold",
            selectedItems.length > 0 && "!bg-black !text-white !border-black"
          )}
        >
          {name} {selectedItems.length > 0 && `(${selectedItems.length})`}
          {Icons.ic_chevron_down}
        </button>
      }
      align="start"
      className="w-[255px] sm:w-[380px]"
      content={
        <div className="space-y-5" ref={contentRef}>
          <p className={filterTitleStyle}>{name}</p>
          <HorizontalDivider variant="light" />
          <ul className="list-none flex items-center gap-3 flex-wrap">
            {list?.map((item: string, index) => (
              <li
                onClick={() => handleItemClick(item)}
                key={index}
                className={`px-1.5 py-2 text-sm 3xl:text-xl w-fit rounded-xl border cursor-pointer capitalize flex items-center gap-2 ${
                  isItemSelected(item)
                    ? "border-primary-500 bg-primary-50"
                    : "border-grey-300 bg-grey-90 text-grey-900"
                }`}
              >
                {addSpaceBeforeUppercase(item)}
                {isItemSelected(item) && (
                  <button
                    onClick={(e) => handleClearItem(item, e)}
                    className="ml-1 p-0.5 rounded-full hover:bg-primary-100 transition-colors"
                    title={`Remove ${addSpaceBeforeUppercase(item)}`}
                  >
                    {Icons.ic_close_circle}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}

export function ChipFilterWithoutPopup({
  name,
  list,
  filterName,
  onChange,
  selectedItems,
  onClearIndividual,
}: Props) {
  const isItemSelected = (item: string) => {
    if (filterName === "numberOfSeats") {
      return (selectedItems as string[]).includes(
        item.split(" ")[0].replace("+", "")
      );
    }
    return selectedItems.includes(item as never);
  };

  const handleItemClick = (item: string) => {
    if (filterName === "numberOfSeats") {
      // Extract the number from "2 seater", "3 seater", etc.
      const seatNumber = item.split(" ")[0].replace("+", "");
      onChange(filterName, seatNumber);
    } else {
      onChange(filterName, item);
    }
  };

  const handleClearItem = (item: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (filterName === "numberOfSeats") {
      // Extract the number from "2 seater", "3 seater", etc.
      const seatNumber = item.split(" ")[0].replace("+", "");
      onChange(filterName, seatNumber);
    } else {
      onChange(filterName, item);
    }
  };

  return (
    <div className="space-y-5">
      <p className={filterTitleStyleWithoutPopup}>{name}</p>
      <ul className="list-none flex items-center gap-3 flex-wrap">
        {list?.map((item: string, index) => (
          <li
            onClick={() => handleItemClick(item)}
            key={index}
            className={`px-1.5 py-2 text-sm 3xl:text-xl w-fit rounded-xl border cursor-pointer capitalize flex items-center gap-2 ${
              isItemSelected(item)
                ? "border-primary-500 bg-primary-50"
                : "border-grey-300 bg-grey-90 text-grey-900"
            }`}
          >
            {addSpaceBeforeUppercase(item)}
            {isItemSelected(item) && (
              <button
                onClick={(e) => handleClearItem(item, e)}
                className="ml-1 p-0.5 rounded-full hover:bg-primary-100 transition-colors"
                title={`Remove ${addSpaceBeforeUppercase(item)}`}
              >
                {Icons.ic_close_circle}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SearchFilter({
  name,
  list,
  filterName,
  onChange,
  selectedItems,
  onClearIndividual,
}: Props) {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const debouncedListingSearch = useCallback(
    debounce((query) => {
      setDebouncedSearch(query);
    }, 500),
    []
  );

  const filteredList = useMemo(() => {
    if (!debouncedSearch) return list;

    return list?.filter((item) =>
      item.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [list, debouncedSearch]);

  useEffect(() => {
    debouncedListingSearch(search);
  }, [search, debouncedListingSearch]);

  const contentRef = useRef<HTMLDivElement>(null);
  useUpdateBodyHeight({ isOpen: popupIsOpen, contentRef });

  return (
    <Popup
      open={true}
      isOpen={popupIsOpen}
      handleIsOpen={(open: boolean) => setPopupIsOpen(open)}
      trigger={
        <button
          className={cn(
            "bg-white border border-grey-300 rounded-lg px-3 py-1 flex items-center gap-2 text-grey-600 text-xs 3xl:text-sm !font-semibold",
            selectedItems.length > 0 && "!bg-black !text-white !border-black"
          )}
        >
          {name} {selectedItems.length > 0 && `(${selectedItems.length})`}
          {Icons.ic_chevron_down}
        </button>
      }
      align="start"
      className="w-[255px] sm:w-[300px]"
      content={
        <div className="space-y-5" ref={contentRef}>
          <p className={filterTitleStyle}>{name}</p>
          <SearchInput
            icon
            placeholder={`Search ${name}`}
            name="vehicleMakeSearch"
            value={search}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.target.value)
            }
          />
          <ul className="list-none space-y-2 max-h-[450px] overflow-y-auto">
            {filteredList?.map((item, index) => (
              <li
                onClick={() => onChange(filterName, item)}
                key={index}
                className={`px-2 py-1.5 text-xs 3xl:text-sm w-full cursor-pointer capitalize flex items-center justify-between
                  ${
                    selectedItems?.includes(item as never)
                      ? "text-primary-500 bg-primary-50"
                      : "text-grey-900"
                  }`}
              >
                {addSpaceBeforeUppercase(item)}
                {selectedItems?.includes(item as never) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(filterName, item);
                    }}
                    className="ml-2 p-0.5 rounded-full hover:bg-primary-100 transition-colors"
                    title={`Remove ${addSpaceBeforeUppercase(item)}`}
                  >
                    {Icons.ic_close_circle}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}

export function SearchFilterWithoutPopup({
  name,
  list,
  filterName,
  onChange,
  selectedItems,
  onClearIndividual,
}: Props) {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const debouncedListingSearch = useCallback(
    debounce((query) => {
      setDebouncedSearch(query);
    }, 500),
    []
  );

  const filteredList = useMemo(() => {
    if (!debouncedSearch) return list;

    return list?.filter((item) =>
      item.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [list, debouncedSearch]);

  useEffect(() => {
    debouncedListingSearch(search);
  }, [search, debouncedListingSearch]);

  const contentRef = useRef<HTMLDivElement>(null);
  useUpdateBodyHeight({ isOpen: popupIsOpen, contentRef });

  return (
    <div className="space-y-5">
      <p className={filterTitleStyleWithoutPopup}>{name}</p>
      <Popup
        open={true}
        isOpen={popupIsOpen}
        handleIsOpen={(open: boolean) => setPopupIsOpen(open)}
        trigger={
          <button className="w-full bg-white border border-grey-300 rounded-2xl p-3 flex items-center justify-between gap-2 text-grey-700 text-sm 3xl:text-base">
            {name}
            {Icons.ic_chevron_down}
          </button>
        }
        align="start"
        className="w-[255px] sm:w-[220px] 3xl:w-[340px]"
        content={
          <div className="space-y-5" ref={contentRef}>
            <SearchInput
              icon
              placeholder={`Search ${name}`}
              name="vehicleMakeSearch"
              value={search}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleSearch(event.target.value)
              }
            />
            <ul className="list-none space-y-2 max-h-[450px] overflow-y-auto">
              {filteredList?.map((item, index) => (
                <li
                  onClick={() => onChange(filterName, item)}
                  key={index}
                  className={`px-2 py-1.5 text-xs 3xl:text-sm w-full cursor-pointer capitalize flex items-center justify-between
                  ${
                    selectedItems?.includes(item as never)
                      ? "text-primary-500 bg-primary-50"
                      : "text-grey-900"
                  }`}
                >
                  {addSpaceBeforeUppercase(item)}
                  {selectedItems?.includes(item as never) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(filterName, item);
                      }}
                      className="ml-2 p-0.5 rounded-full hover:bg-primary-100 transition-colors"
                      title={`Remove ${addSpaceBeforeUppercase(item)}`}
                    >
                      {Icons.ic_close_circle}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        }
      />
    </div>
  );
}

const useUpdateBodyHeight = ({
  isOpen,
  contentRef,
}: {
  isOpen: boolean;
  contentRef: React.RefObject<HTMLDivElement>;
}) => {
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      // Give time for the portal to mount
      setTimeout(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight);
          document.body.style.minHeight = `calc(100vh + ${contentRef.current.scrollHeight}px)`;
          document.body.style.overflow = "auto";
        }
      }, 100);
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
  }, [isOpen]);

  return {};
};

export function RangeFilter({
  name,
  onChange,
  filterName,
  selectedItems,
}: Props) {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const [localRange, setLocalRange] = useState<[number, number]>([
    selectedItems[0] as number,
    selectedItems[1] as number,
  ]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Update local range when selectedItems change, but only if not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalRange([selectedItems[0] as number, selectedItems[1] as number]);
    }
  }, [selectedItems, isDragging]);

  const debouncedRangeChange = useCallback(
    debounce((value: number[]) => {
      onChange(filterName, value);
    }, 500),
    [onChange, filterName]
  );

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      // Ensure both values are valid numbers
      const [min, max] = value;
      if (!isNaN(min) && !isNaN(max)) {
        setLocalRange([min, max]);
        setIsDragging(true);
        debouncedRangeChange(value);
      }
    }
  };

  const handleRangeChangeEnd = () => {
    setIsDragging(false);
  };

  const contentRef = useRef<HTMLDivElement>(null);
  useUpdateBodyHeight({ isOpen: popupIsOpen, contentRef });

  const formatPrice = (value: number) => {
    if (isNaN(value) || value === null || value === undefined) {
      return "0K/day";
    }
    return `${value / 1000}K/day`;
  };

  return (
    <Popup
      open={true}
      isOpen={popupIsOpen}
      handleIsOpen={(open: boolean) => setPopupIsOpen(open)}
      trigger={
        <button className="bg-white border border-grey-300 rounded-lg px-3 py-1 flex items-center gap-2 text-grey-600 text-xs 3xl:text-sm !font-semibold">
          {name}
          {Icons.ic_chevron_down}
        </button>
      }
      align="start"
      className="w-[255px] sm:w-[380px]"
      content={
        <div className="space-y-5" ref={contentRef}>
          <p className={filterTitleStyle}>{name}</p>
          <HorizontalDivider variant="light" />
          <div className="flex gap-4 justify-center">
            <p className="text-sm text-grey-800 w-fit">
              {formatPrice(localRange[0])}
            </p>
            <Slider
              range
              min={0}
              max={10000000}
              step={1000}
              value={localRange}
              onChange={handleRangeChange}
              onAfterChange={handleRangeChangeEnd}
              className="!w-[55%]"
              trackStyle={[{ backgroundColor: "#0673FF", height: 4 }]}
              handleStyle={[
                {
                  backgroundColor: "white",
                  border: "2px solid #0673FF",
                  height: "20px",
                  width: "20px",
                  boxShadow:
                    "0px 4.29px 9.29px 0px #0000001F, 0px 0.36px 2.86px 0px #0000001F",
                  marginTop: "-8px",
                  opacity: 1,
                },
                {
                  backgroundColor: "white",
                  border: "2px solid #0673FF",
                  height: "20px",
                  width: "20px",
                  boxShadow:
                    "0px 4.29px 9.29px 0px #0000001F, 0px 0.36px 2.86px 0px #0000001F",
                  marginTop: "-8px",
                  opacity: 1,
                },
              ]}
              railStyle={{ backgroundColor: "#E5E7EB", height: 4 }}
            />
            <p className="text-sm text-grey-800 w-fit">
              {formatPrice(localRange[1])}
            </p>
          </div>
        </div>
      }
    />
  );
}

export function RangeFilterWithoutPopup({
  name,
  onChange,
  filterName,
  selectedItems,
}: Props) {
  const [localRange, setLocalRange] = useState<[number, number]>([
    selectedItems[0] as number,
    selectedItems[1] as number,
  ]);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Update local range when selectedItems change, but only if not dragging
  useEffect(() => {
    if (!isDragging) {
      setLocalRange([selectedItems[0] as number, selectedItems[1] as number]);
    }
  }, [selectedItems, isDragging]);

  const debouncedRangeChange = useCallback(
    debounce((value: number[]) => {
      onChange(filterName, value);
    }, 500),
    [onChange, filterName]
  );

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      // Ensure both values are valid numbers
      const [min, max] = value;
      if (!isNaN(min) && !isNaN(max)) {
        setLocalRange([min, max]);
        setIsDragging(true);
        debouncedRangeChange(value);
      }
    }
  };

  const handleRangeChangeEnd = () => {
    setIsDragging(false);
  };
  const formatPrice = (value: number) => {
    if (isNaN(value) || value === null || value === undefined) {
      return "0K/day";
    }
    return `${value / 1000}K/day`;
  };

  return (
    <div className="space-y-5">
      <p className={filterTitleStyleWithoutPopup}>{name}</p>
      <div className="flex gap-4 justify-center">
        <p className="text-sm text-grey-800 w-fit">
          {formatPrice(localRange[0])}
        </p>
        <Slider
          range
          min={0}
          max={10000000}
          step={1000}
          value={localRange}
          onChange={handleRangeChange}
          onAfterChange={handleRangeChangeEnd}
          className="!w-[55%]"
          trackStyle={[{ backgroundColor: "#0673FF", height: 4 }]}
          handleStyle={[
            {
              backgroundColor: "white",
              border: "2px solid #0673FF",
              height: "20px",
              width: "20px",
              boxShadow:
                "0px 4.29px 9.29px 0px #0000001F, 0px 0.36px 2.86px 0px #0000001F",
              marginTop: "-8px",
              opacity: 1,
            },
            {
              backgroundColor: "white",
              border: "2px solid #0673FF",
              height: "20px",
              width: "20px",
              boxShadow:
                "0px 4.29px 9.29px 0px #0000001F, 0px 0.36px 2.86px 0px #0000001F",
              marginTop: "-8px",
              opacity: 1,
            },
          ]}
          railStyle={{ backgroundColor: "#E5E7EB", height: 4 }}
        />
        <p className="text-sm text-grey-800 w-fit">
          {formatPrice(localRange[1])}
        </p>
      </div>
    </div>
  );
}
