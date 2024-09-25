import { VehicleStatus } from "@/utils/types";
import { VehicleListingBadge } from "@repo/ui/badge";
import Button from "@repo/ui/button";
import { Popup } from "@repo/ui/popup";

type Props = { vehicleStatus?: VehicleStatus; isActive?: boolean };

export default function ListingDetailsVehicleAvailability({
  isActive,
  vehicleStatus,
}: Props) {
  return (
    <div className="flex gap-3 justify-between items-start md:items-center bg-grey-75 md:bg-transparent rounded-[32px] px-5 py-6 md:p-0">
      <div className="bg-grey-75 md:py-3 md:pl-8 md:pr-5 flex flex-col md:flex-row gap-3 items-start md:items-center md:rounded-[128px]">
        <div className="space-y-1">
          <p className="text-base 3xl:text-xl text-black font-medium">
            Availability Status
          </p>
          <p className="text-xs text-grey-500">
            Change vehicle status to keep customers properly informed when
            neccessary
          </p>
        </div>
        {vehicleStatus && <VehicleListingBadge status={vehicleStatus} />}
      </div>
      <Popup
        trigger={
          <Button className="!bg-primary-75 text-primary-500 !py-2 3xl:!py-3 !px-7 3xl:!px-10 !text-base 3xl:!text-xl rounded-[93px]">
            Update
          </Button>
        }
        content={
          <>
            <ul className="space-y-2">
              <p className="!text-xs 3xl:!text-base !font-semibold">
                Vehicle Status
              </p>
              <li>
                <button
                  className="!py-3 !px-2 !bg-grey-90 !text-grey-900 !font-normal text-left w-full text-sm rounded-xl"
                  // loading={deactivateListing.isPending}
                  // disabled={deactivateListing.isPending}
                  // onClick={() => deactivateListing.mutate()}
                >
                  Booked
                </button>
              </li>
              {vehicleStatus === VehicleStatus.MAINTENANCE ? (
                <li>
                  <button
                    className="!py-3 !px-2 !bg-grey-90 !text-grey-900 !font-normal text-left w-full text-sm rounded-xl"
                    // loading={deactivateListing.isPending}
                    // disabled={deactivateListing.isPending}
                    // onClick={() => deactivateListing.mutate()}
                  >
                    Available
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    className="!py-3 !px-2 !bg-grey-90 !text-grey-900 !font-normal text-left w-full text-sm rounded-xl"
                    // loading={deactivateListing.isPending}
                    // disabled={deactivateListing.isPending}
                    // onClick={() => deactivateListing.mutate()}
                  >
                    In maintenance
                  </button>
                </li>
              )}

              <li>
                <button
                  className="!py-3 !px-2 !bg-grey-90 !text-grey-900 !font-normal text-left w-full text-sm rounded-xl"
                  // loading={deactivateListing.isPending}
                  // disabled={deactivateListing.isPending}
                  // onClick={() => deactivateListing.mutate()}
                >
                  Unavailable
                </button>
              </li>
            </ul>
          </>
        }
      />
    </div>
  );
}
