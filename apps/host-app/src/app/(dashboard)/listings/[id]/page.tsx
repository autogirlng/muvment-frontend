"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import useListings from "@/hooks/useListings";
import AppTabs from "@repo/ui/tabs";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useAppSelector } from "@/lib/hooks";

import ListingDetailsHeader from "@/components/Listings/Details/Header";
import ListingDetailsVehicleImages from "@/components/Listings/Details/VehicleImages";
import ListingDetailsVehicleAvailability from "@/components/Listings/Details/VehicleAvailability";
import ListingDetailsVehicleDetails from "@/components/Listings/Details/VehicleDetails";
import ListingDetailsEarnings from "@/components/Listings/Details/Earnings";
import ListingDetailsUpcomingBookings from "@/components/Listings/Details/UpcomingBookings";

import VehicleInformation from "@/components/Listings/Details/VehicleInformation";
import Reviews from "@/components/Listings/Details/Reviews";
import DriversDetails from "@/components/Listings/Details/DriversDetails";

type MappedVehicleDetail = {
  [key: string]: string | number;
};

type Extras = {
  name: string;
  icon: ReactNode;
  id: string;
};

const initialExtras: Extras[] = [
  { name: "Fuel Included", icon: Icons.ic_fuel_station, id: "fuelProvided" },
  {
    name: "Driver Available",
    icon: Icons.ic_wheel,
    id: "provideDriver",
  },
  // {
  //   name: "Tracker Available",
  //   icon: Icons.ic_driver_provided,
  //   id: "hasTracker",
  // },
  // {
  //   name: "Insured",
  //   icon: Icons.ic_driver_provided,
  //   id: "hasInsurance",
  // },
];

const initialtabs = [
  { name: "Vehicle information", value: "tab1", content: <></> },
  { name: "Reviews", value: "tab2", content: <Reviews /> },
  { name: "Driver details", value: "tab3", content: <></> },
];

export default function ListingsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { listingById } = useAppSelector((state) => state.listings);
  const { getListingById } = useListings();

  const [tabs, setTabs] = useState(initialtabs);
  const [extras, setExtras] = useState<Extras[]>(initialExtras);
  const [vehicleImages, setVehicleImages] = useState<string[]>([]);
  const [vehicleDetails, setVehicleDetails] = useState<MappedVehicleDetail[]>(
    []
  );

  useEffect(() => {
    if (!params.id) {
      router.push("/listings");
    } else {
      getListingById.mutate(params.id);
    }
  }, [params.id]);

  // use useMemo here
  useEffect(() => {
    if (listingById) {
      // update vehicle details
      const mappedVehicleDetails: MappedVehicleDetail[] = [
        { make: listingById?.make || "N/A" },
        { model: listingById?.model || "N/A" },
        { year: listingById?.yearOfRelease || "N/A" },
        { colour: listingById?.vehicleColor || "N/A" },
        { city: listingById?.location || "N/A" },
        { vehicleType: listingById?.vehicleType || "N/A" },
        { seatingCapacity: listingById?.numberOfSeats || "N/A" },
      ];
      setVehicleDetails(mappedVehicleDetails);

      // update extras
      const updatedExtras = extras.map((extra) => {
        if (extra.id === "fuelProvided") {
          return {
            ...extra,
            status: listingById?.tripSettings?.fuelProvided || false,
          };
        } else if (extra.id === "provideDriver") {
          return {
            ...extra,
            status: listingById?.tripSettings?.provideDriver || false,
          };
        }
        return extra;
      });
      setExtras(updatedExtras);

      // update vehicle images
      const mappedVehicleImages = [
        listingById?.VehicleImage?.frontView,
        listingById?.VehicleImage?.backView,
        listingById?.VehicleImage?.sideView1,
        listingById?.VehicleImage?.sideView2,
        listingById?.VehicleImage?.interior,
        listingById?.VehicleImage?.other,
      ];
      setVehicleImages(mappedVehicleImages);

      // update tabs
      const updatedTabs = tabs.map((tab) => {
        if (tab.value === "tab1") {
          return {
            ...tab,
            content: <VehicleInformation listingDetails={listingById} />,
          };
        }
        if (tab.value === "tab3") {
          return {
            ...tab,
            content: <DriversDetails id={params.id} />,
          };
        }
        return tab;
      });
      setTabs(updatedTabs);
    }
  }, [listingById]);

  if (getListingById.isPending) {
    return <FullPageSpinner />;
  }

  return (
    <main className="flex gap-10">
      <div className="py-[56px] w-full lg:w-[calc(100%-320px)] 3xl:w-[calc(100%-500px)]">
        <div className="text-grey-800 space-y-[52px]">
          {/* name */}
          <ListingDetailsHeader
            name={listingById?.listingName}
            id={listingById?.id}
            status={listingById?.status}
          />
          <ListingDetailsVehicleImages vehicleImages={vehicleImages} />

          <ListingDetailsVehicleAvailability
            vehicleStatus={listingById?.vehicleStatus}
            isActive={listingById?.isActive}
          />

          <ListingDetailsVehicleDetails
            extras={extras}
            vehicleDetails={vehicleDetails}
          />

          <ListingDetailsEarnings statistics={listingById?.statistics} />

          <AppTabs label="listing details tabs" tabs={tabs} />
        </div>
      </div>

      <ListingDetailsUpcomingBookings />
    </main>
  );
}
