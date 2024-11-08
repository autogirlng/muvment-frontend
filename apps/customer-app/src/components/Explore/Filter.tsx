import { debounce } from "@/utils/functions";
import { HorizontalDivider } from "@repo/ui/divider";
import Icons from "@repo/ui/icons";
import { Popup } from "@repo/ui/popup";
import SearchInput from "@repo/ui/searchInput";
import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = { name: string; list: string[] };

export function ChipFilter({ name, list }: Props) {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  updateBodyHeight({ isOpen: popupIsOpen, contentRef });

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
          <p className="text-grey-800 text-base md:text-xl 3xl:text-h6 !font-semibold">
            {name}
          </p>
          <HorizontalDivider variant="light" />
          <ul className="list-none flex items-center gap-3 flex-wrap">
            {list.map((item, index) => (
              <li
                key={index}
                className="px-2 py-3 text-sm md:text-base 3xl:text-xl w-fit rounded-xl border border-grey-300 bg-grey-90 text-grey-900"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}

export function SearchFilter({ name, list }: Props) {
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

  useEffect(() => {
    debouncedListingSearch(search);
  }, [search, debouncedListingSearch]);

  const contentRef = useRef<HTMLDivElement>(null);
  updateBodyHeight({ isOpen: popupIsOpen, contentRef });

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
      className="w-[255px] sm:w-[300px]"
      content={
        <div className="space-y-5" ref={contentRef}>
          <p className="text-grey-800 text-base md:text-xl 3xl:text-h6 !font-semibold">
            {name}
          </p>
          <SearchInput
            icon
            placeholder={`Search ${name}`}
            name="vehicleMakeSearch"
            value={search}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleSearch(event.target.value)
            }
          />
          <ul className="list-none space-y-2">
            {list.map((item, index) => (
              <li
                key={index}
                className="px-2 py-1.5 text-xs 3xl:text-sm w-full text-grey-900"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}
export function RangeFilter({ name, list }: Props) {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);
  updateBodyHeight({ isOpen: popupIsOpen, contentRef });

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
          <p className="text-grey-800 text-base md:text-xl 3xl:text-h6 !font-semibold">
            {name}
          </p>
          <HorizontalDivider variant="light" />
          <ul className="list-none flex items-center gap-3 flex-wrap">
            {list.map((item, index) => (
              <li
                key={index}
                className="px-2 py-3 text-sm md:text-base 3xl:text-xl w-fit rounded-xl border border-grey-300 bg-grey-90 text-grey-900"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      }
    />
  );
}

const updateBodyHeight = ({
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
};
