import AppTabs from "@repo/ui/tabs";
import React, { ChangeEvent, useState } from "react";
import Icons from "@repo/ui/icons";
import ActivityCard from "../ActivityCard";
import UpcomingBookings from "./UpcomingBookings";
import BookingHistory from "./BookingHistory";
import SearchInput from "@repo/ui/searchInput";

type Props = {};

export default function Bookings({}: Props) {
  const [search, setSearch] = useState<string>("");

  const tabs = [
    { name: "History", value: "tab1", content: <BookingHistory /> },
    {
      name: "Upcoming",
      value: "tab2",
      content: <UpcomingBookings />,
    },
    //   { name: "History", value: "tab2", content: <BookingHistory /> },
  ];

  return (
    <div className="space-y-8 pt-[50px]">
      <div>
        <SearchInput
          placeholder="Search with Booking ID, or Guest name"
          name="bookingsSearch"
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearch(event.target.value)
          }
        />
      </div>
      <AppTabs
        label="bookings tab"
        tabs={tabs}
        tabClass="flex-none"
        contentClass="bg-transparent !mt-10 !p-0"
      />
    </div>
  );
}
