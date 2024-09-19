import { ListingBadge } from "@repo/ui/badge";
import Chip from "@repo/ui/chip";
import Icons from "@repo/ui/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// change listing type
type Props = { listing: any };

export default function ListingCard({ listing }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 py-5 border-b border-grey-200 last:border-none">
      <div className="h-[200px] w-full md:w-[200px]">
        <Image
          src="/images/listing/vehicle_image.png"
          alt=""
          width={200}
          height={200}
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
      <div className="w-full md:w-[calc(100%-220px)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-grey-800">
        <div className="space-y-[14px] max-w-[450px]">
          <div className="flex items-center gap-6">
            <h5 className="text-h6 3xl:text-h5 !font-medium">
              {listing.status === "draft" ? "Unfinished Listing" : listing.name}
            </h5>
            <ListingBadge status={listing.status} />
          </div>
          {listing.status !== "draft" && (
            <p className="text-base 3xl:text-xl !font-medium text-primary-500">
              {listing.price}
            </p>
          )}
          <p className="uppercase text-xs !font-semibold hidden md:block">
            Vehicle details
          </p>
          {listing.status === "draft" ? (
            <Link href="/" className="text-sm 3xl:text-base text-primary-500 block">Complete Vehicle Listing</Link>
          ) : (
            <div className="hidden md:flex flex-wrap gap-3">
              {/* change detail type */}
              {listing.vehicleDetails.map((detail: any, index: number) => {
                const [key, value] = Object.entries(detail)[0]; 
                return (
                  <Chip
                    key={index}
                    text={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                    variant="filled"
                    radius="sm"
                    color="lighter"
                  />
                );
              })}
            </div>
          )}
        </div>
        {listing.status !== "draft" && (
          <div className="h-[150px] w-[1px] bg-grey-300 hidden md:block" />
        )}
        {listing.status !== "draft" && (
          <div className="space-y-[14px] max-w-[450px]">
            <p className="uppercase text-xs !font-semibold">Extras</p>
            <div className="flex flex-wrap gap-3">
              {/* change detail type */}
              {listing.extras.map((detail: any, index: number) => {
                return (
                  <Chip
                    key={index}
                    icon={detail.icon}
                    text={detail.name}
                    variant="filled"
                    radius="sm"
                    color="primary"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
