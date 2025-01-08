import { useState } from "react";
import Icons from "@repo/ui/icons";
import SearchBookings from "@/components/SearchBookings";

type Props = {};

function Hero({}: Props) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [fromDateValue, setFromDateValue] = useState<Date | null>(null);
  const [fromTimeValue, setFromTimeValue] = useState<Date | null>(null);
  const [untilDateValue, setUntilDateValue] = useState<Date | null>(null);
  const [untilTimeValue, setUntilTimeValue] = useState<Date | null>(null);

  return (
    <section className="relative bg-hero-image bg-cover bg-center bg-no-repeat min-h-full md:min-h-screen h-auto md:h-[880px] pt-[35px] pb-6 md:pb-10">
      <div className="bg-[#00000066] absolute inset-0 z-0 w-full h-full" />
      <div className="container h-[calc(100%-100px)] flex items-center z-10">
        <div className="space-y-3 md:space-y-6 text-white text-center md:text-left max-w-[780px] mx-auto md:mx-0">
          <h1 className="text-h3 md:text-h2 3xl:text-h1">
            Find your perfect ride
          </h1>
          <p className="text-sm md:text-xl 3xl:text-h6 !font-normal max-w-[230px] md:max-w-full mx-auto md:mx-0">
            Browse and book cars effortlessly from our wide selection
          </p>
          <SearchBookings
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            fromDateValue={fromDateValue}
            setFromDateValue={setFromDateValue}
            fromTimeValue={fromTimeValue}
            setFromTimeValue={setFromTimeValue}
            untilDateValue={untilDateValue}
            setUntilDateValue={setUntilDateValue}
            untilTimeValue={untilTimeValue}
            setUntilTimeValue={setUntilTimeValue}
          />
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
