import cn from "classnames";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { formatNumberWithCommas, keyAndValueInAChip } from "@/utils/functions";
import { MappedInformation, VehicleInformation } from "@/utils/types";
import { VehicleListingBadge } from "@repo/ui/badge";
import MoreButton from "@repo/ui/moreButton";
import Chip from "@repo/ui/chip";
import Icons from "@repo/ui/icons";
import { Popup } from "@repo/ui/popup";

type Props = { listing: VehicleInformation };

const initialExtras = [
  { name: "Fuel Included", icon: Icons.ic_fuel_station, id: "fuelProvided" },
  {
    name: "Driver Available",
    icon: Icons.ic_driver_provided,
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

export default function ListingCard({ listing }: Props) {
  const [vehicleDetails, setVehicleDetails] = useState<MappedInformation[]>([]);
  const [extras, setExtras] = useState(initialExtras);

  useEffect(() => {
    if (listing) {
      const mappedVehicleDetails: MappedInformation[] = [
        { make: listing?.make || "N/A" },
        { colour: listing?.vehicleColor || "N/A" },
        { seatingCapacity: listing?.numberOfSeats || "N/A" },
        { location: listing?.location || "N/A" },
        { vehicleType: listing?.vehicleType || "N/A" },
      ];

      setVehicleDetails(mappedVehicleDetails);

      const updatedExtras = extras.map((extra) => {
        if (extra.id === "fuelProvided") {
          return {
            ...extra,
            status: listing?.tripSettings?.fuelProvided || false,
          };
        } else if (extra.id === "provideDriver") {
          return {
            ...extra,
            status: listing?.tripSettings?.provideDriver || false,
          };
        }
        return extra;
      });

      setExtras(updatedExtras);
    }
  }, [listing]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 py-5 border-b border-grey-200 last:border-none">
      <div className="h-[200px] w-full md:w-[200px]">
        <Image
          src={listing?.VehicleImage?.frontView || "/images/vehicles/sedan.png"}
          alt=""
          width={200}
          height={200}
          className={cn(
            "h-full w-full rounded-2xl",
            listing?.VehicleImage?.frontView ? "object-cover" : "object-contain"
          )}
        />
      </div>
      <div className="w-full md:w-[calc(100%-220px)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-grey-800">
        <div className="space-y-[14px] md:max-w-[400px] 3xl:max-w-[450px]">
          <div className="flex items-center gap-6">
            <h5 className="text-h6 3xl:text-h5 !font-medium">
              {listing?.vehicleStatus === "draft"
                ? "Unfinished Listing"
                : listing?.listingName}
            </h5>
            <VehicleListingBadge status={listing?.vehicleStatus} />
          </div>
          {listing?.vehicleStatus !== "draft" && (
            <p className="text-base 3xl:text-xl !font-medium text-primary-500">
              NGN {formatNumberWithCommas(listing?.pricing?.dailyRate?.value)}
              /day
            </p>
          )}
          <p className="uppercase text-xs !font-semibold hidden md:block">
            Vehicle details
          </p>
          {listing?.vehicleStatus === "draft" ? (
            <Link
              href={`/vehicle-onboarding?id=${listing?.id}`}
              className="text-sm 3xl:text-base text-primary-500 block"
            >
              Complete Vehicle Listing
            </Link>
          ) : (
            <div className="hidden md:flex flex-wrap gap-3">
              {vehicleDetails?.map((detail, index) => {
                const [key, value] = Object.entries(detail)[0];
                return (
                  <Chip
                    key={index}
                    text={keyAndValueInAChip(key, value)}
                    variant="filled"
                    radius="sm"
                    color="lighter"
                  />
                );
              })}
            </div>
          )}
        </div>

        {listing?.vehicleStatus !== "draft" && (
          <>
            <div className="h-[150px] w-[1px] bg-grey-300 hidden md:block" />
            <div className="space-y-[14px] md:max-w-[400px] 3xl:max-w-[450px]">
              <p className="uppercase text-xs !font-semibold">Extras</p>
              <div className="flex flex-wrap gap-3">
                {extras.map((detail: any, index: number) => {
                  return (
                    <Chip
                      key={index}
                      icon={detail.icon}
                      text={detail.name}
                      variant="filled"
                      radius="sm"
                      color={detail.status ? "primary" : "lighter"}
                    />
                  );
                })}
              </div>
            </div>
            <div className="h-[150px] w-[1px] bg-grey-300 hidden md:block" />
            <Popup
              trigger={<MoreButton className="!mx-0" />}
              content={
                <>
                  <p className="!text-xs 3xl:!text-base !font-semibold">
                    Actions
                  </p>
                  <ul className="space-y-2 *:py-2">
                    <li className="!text-xs 3xl:!text-base">
                      <Link href={`/listings/${listing?.id}`}>
                        View Vehicle Details
                      </Link>
                    </li>
                  </ul>
                </>
              }
            />
          </>
        )}
      </div>
    </div>
  );
}
