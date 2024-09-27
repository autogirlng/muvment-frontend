"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

import AppTabs from "@repo/ui/tabs";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import { MappedInformation } from "@/utils/types";

import ListingDetailsHeader from "@/components/Listings/Details/Header";
import ListingDetailsVehicleImages from "@/components/Listings/Details/VehicleImages";
import ListingDetailsVehicleAvailability from "@/components/Listings/Details/VehicleAvailability";
import ListingDetailsVehicleDetails from "@/components/Listings/Details/VehicleDetails";
import ListingDetailsEarnings from "@/components/Listings/Details/Earnings";
import ListingDetailsUpcomingBookings from "@/components/Listings/Details/UpcomingBookings";
import VehicleInformation from "@/components/Listings/Details/VehicleInformation";
import Reviews from "@/components/Listings/Details/Reviews";
import DriversDetails from "@/components/Listings/Details/DriversDetails";
import useListingsActions from "@/components/Listings/Details/hooks/useListingsActions";
import { useAppSelector } from "@/lib/hooks";

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
  const { getListingById } = useListingsActions();
  const { listingDetail } = useAppSelector((state) => state.listings);

  const [tabs, setTabs] = useState(initialtabs);
  const [extras, setExtras] = useState<Extras[]>(initialExtras);
  const [vehicleImages, setVehicleImages] = useState<string[]>([]);
  const [vehicleDetails, setVehicleDetails] = useState<MappedInformation[]>([]);

  useEffect(() => {
    if (!params.id) {
      router.push("/listings");
    } else {
      getListingById.mutate(params.id);
    }
  }, [params.id]);

  // use useMemo here
  useEffect(() => {
    if (listingDetail) {
      // update vehicle details
      const mappedVehicleDetails: MappedInformation[] = [
        { make: listingDetail?.make || "N/A" },
        { model: listingDetail?.model || "N/A" },
        { year: listingDetail?.yearOfRelease || "N/A" },
        { colour: listingDetail?.vehicleColor || "N/A" },
        { city: listingDetail?.location || "N/A" },
        { vehicleType: listingDetail?.vehicleType || "N/A" },
        { seatingCapacity: listingDetail?.numberOfSeats || "N/A" },
      ];
      setVehicleDetails(mappedVehicleDetails);

      // update extras
      const updatedExtras = extras.map((extra) => {
        if (extra.id === "fuelProvided") {
          return {
            ...extra,
            status: listingDetail?.tripSettings?.fuelProvided || false,
          };
        } else if (extra.id === "provideDriver") {
          return {
            ...extra,
            status: listingDetail?.tripSettings?.provideDriver || false,
          };
        }
        return extra;
      });
      setExtras(updatedExtras);

      // update vehicle images
      const mappedVehicleImages = [
        listingDetail?.VehicleImage?.frontView,
        listingDetail?.VehicleImage?.backView,
        listingDetail?.VehicleImage?.sideView1,
        listingDetail?.VehicleImage?.sideView2,
        listingDetail?.VehicleImage?.interior,
        listingDetail?.VehicleImage?.other,
      ];
      setVehicleImages(mappedVehicleImages);

      // update tabs
      const updatedTabs = tabs.map((tab) => {
        if (tab.value === "tab1") {
          return {
            ...tab,
            content: <VehicleInformation listingDetails={listingDetail} />,
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
  }, [listingDetail]);

  if (getListingById.isPending) {
    return <FullPageSpinner />;
  }

  if (getListingById.isError) {
    return <p>something went wrong </p>;
  }

  return (
    <main className="flex gap-10">
      <div className="py-[56px] w-full lg:w-[calc(100%-320px)] xl:w-[calc(100%-360px)] 3xl:w-[calc(100%-500px)]">
        <div className="text-grey-800 space-y-[52px]">
          {/* name */}
          <ListingDetailsHeader
            name={listingDetail?.listingName}
            id={listingDetail?.id}
            status={listingDetail?.status}
          />
          <ListingDetailsVehicleImages vehicleImages={vehicleImages} />

          <ListingDetailsVehicleAvailability
            vehicleStatus={listingDetail?.vehicleStatus}
            // isActive={listingDetail?.isActive}
            id={listingDetail?.id}
          />

          <ListingDetailsVehicleDetails
            extras={extras}
            vehicleDetails={vehicleDetails}
          />

          <ListingDetailsEarnings statistics={listingDetail?.statistics} />

          <AppTabs label="listing details tabs" tabs={tabs} />
        </div>
      </div>

      <ListingDetailsUpcomingBookings vehicleId={listingDetail?.id || ""} />
    </main>
  );
}
