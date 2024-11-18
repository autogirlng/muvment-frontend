import { useState } from "react";
import { CalendarValue } from "@/utils/types";
import { DatePicker } from "@repo/ui/calendar";
import Button from "@repo/ui/button";
import Icons from "@repo/ui/icons";
import SearchInput from "@repo/ui/searchInput";

type Props = {};

function Hero({}: Props) {
  // from time and until time
  const [fromDateValue, setFromDateValue] = useState<CalendarValue>(null);
  const [fromCalendarIsOpen, setFromCalendarIsOpen] = useState<boolean>(false);
  const [untilDateValue, setUntilDateValue] = useState<CalendarValue>(null);
  const [untilCalendarIsOpen, setUntilCalendarIsOpen] =
    useState<boolean>(false);
  return (
    <section className="relative bg-hero-image bg-cover bg-top bg-no-repeat min-h-full md:min-h-screen h-auto md:h-[1080px] 2xl:h-[1190px] 3xl:h-[1650px] pt-[77px] pb-6 md:pb-20">
      <div className="bg-[#00000066] absolute inset-0 z-0 w-full h-full" />
      <div className="container h-[calc(100%-100px)] flex items-center z-10">
        <div className="space-y-3 md:space-y-6 text-white text-center md:text-left max-w-[780px] mx-auto md:mx-0">
          <h1 className="text-h3 md:text-h2 3xl:text-h1">
            Find your perfect ride
          </h1>
          <p className="text-sm md:text-xl 3xl:text-h6 !font-normal max-w-[230px] md:max-w-full mx-auto md:mx-0">
            Browse and book cars effortlessly from our wide selection
          </p>
          <div className="bg-white text-left md:h-[72px] w-full rounded-3xl p-4 flex flex-col md:flex-row  items-center gap-3">
            <div className="w-full flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-grey-200">
              <Column title="Where">
                <SearchInput
                  name="search"
                  placeholder="Search by city, airport, address"
                  inputClass="!border-none !pl-0 !h-5 !p-2 !text-xs 3xl:!text-sm align-top"
                  className="!h-5 min-w-[177px]"
                />
              </Column>
              <Column title="From">
                <div className="flex items-center justify-between gap-1">
                  <DatePicker
                    value={fromDateValue}
                    onChange={setFromDateValue}
                    isOpen={fromCalendarIsOpen}
                    handleIsOpen={(open: boolean) =>
                      setFromCalendarIsOpen(open)
                    }
                  >
                    <div className="text-black text-xs 3xl:text-sm flex items-center gap-0.5">
                      <span className="text-grey-400">08/13/2024</span>
                      {Icons.ic_chevron_down}
                    </div>
                  </DatePicker>
                  <div className="text-black text-xs 3xl:text-sm flex items-center gap-0.5">
                    <span className="text-grey-400">8:30AM</span>
                    {Icons.ic_chevron_down}
                  </div>
                </div>
              </Column>
              <Column title="Until">
                <div className="flex items-center justify-between  gap-1">
                  <DatePicker
                    value={untilDateValue}
                    onChange={setUntilDateValue}
                    isOpen={untilCalendarIsOpen}
                    handleIsOpen={(open: boolean) =>
                      setUntilCalendarIsOpen(open)
                    }
                  >
                    <div className="text-black text-xs 3xl:text-sm flex items-center gap-0.5">
                      <span className="text-grey-400">08/13/2024</span>
                      {Icons.ic_chevron_down}
                    </div>
                  </DatePicker>
                  <div className="text-black text-xs 3xl:text-sm flex items-center gap-0.5">
                    <span className="text-grey-400">8:30AM</span>
                    {Icons.ic_chevron_down}
                  </div>
                </div>
              </Column>
            </div>
            <Button
              variant="filled"
              color="primary"
              className="!p-3 3xl:!p-[18px] !w-full md:w-fit"
            >
              <span className="hidden md:block">{Icons.ic_search}</span>
              <span className="block md:hidden">Search for cars</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="container h-10 md:h-20 text-white !mt-8 md:!mt-0">
        <p className="absolute left-0 md:left-4 top-0 flex items-center justify-center md:justify-start gap-1 w-full md:w-fit">
          {Icons.ic_location_filled}
          <span className="text-xl md:text-4xl 3xl:text-h2 !font-bold">
            Lagos
          </span>
        </p>
      </div>
    </section>
  );
}

export default Hero;

const Column = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="w-full py-3 md:py-0 md:pl-3 md:pr-5">
    <p className="text-grey-400 text-xs 3xl:text-sm">{title}</p>
    {children}
  </div>
);
