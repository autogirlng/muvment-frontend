import {
  calculateNumberOfDays,
  formatNumberWithCommas,
  getExistingBookingInformation,
} from "@/utils/functions";
import { VehicleInformation } from "@/utils/types";
import Icons from "@repo/ui/icons";
import cn from "classnames";
import { format } from "date-fns";
import { ReactNode } from "react";

type Props = { vehicle: VehicleInformation | null };

const Trip = ({ vehicle }: Props) => {
  const personalInformation = getExistingBookingInformation(
    {},
    vehicle?.id ?? "",
    "personalInformation"
  );
  const itineraryInformation = getExistingBookingInformation(
    {},
    vehicle?.id ?? "",
    "itineraryInformation"
  );

  return (
    <div className="space-y-4 pt-8">
      <TripInfoWrapper title="Prices">
        <div className="flex items-center divide-x divide-grey-200 space-x-3">
          <div>
            {<p className="text-sm 3xl:text-base">Daily</p>}
            <p className="text-sm md:text-base 3xl:text-xl !font-semibold">
              {vehicle?.pricing?.dailyRate?.currency}{" "}
              {formatNumberWithCommas(vehicle?.pricing?.dailyRate?.value || 0)}
              /day
            </p>
          </div>
          <div className="pl-3">
            <p className="text-sm 3xl:text-base">Extra Hours</p>

            <p className="text-sm md:text-base 3xl:text-xl !font-semibold">
              {vehicle?.pricing?.dailyRate?.currency}{" "}
              {vehicle?.pricing?.extraHoursFee}/hr
            </p>
          </div>
        </div>
      </TripInfoWrapper>
      <TripInfoWrapper title="Duration">
        <p className="bg-grey-900 text-white py-0.5 px-4 rounded-3xl w-fit text-xs md:text-sm 3xl:text-base">
          {calculateNumberOfDays(
            itineraryInformation?.endDate,
            itineraryInformation?.startDate
          )}
        </p>
        <div className="space-y-3 text-xs md:text-sm 3xl:text-base">
          <DurationDetails
            date={itineraryInformation?.startDate}
            time={itineraryInformation?.startTime}
            icon={Icons.ic_flag}
            iconColor="text-primary-500"
            title="Start"
          />
          <DurationDetails
            date={itineraryInformation?.endDate}
            time={itineraryInformation?.endTime}
            icon={Icons.ic_location}
            iconColor="text-success-500"
            title="Stop"
          />
        </div>
      </TripInfoWrapper>
      <TripInfoWrapper title="Itinerary">
        <SectionDetails
          title="Pick-up"
          description={itineraryInformation?.pickupLocation}
          isLocation
        />
        <SectionDetails
          title="Drop-off"
          description={itineraryInformation?.dropoffLocation}
          isLocation
        />
        <SectionDetails
          title="Areas of Use"
          description={itineraryInformation?.areaOfUse}
        />
        <SectionDetails
          title="Outskirt Locations"
          description={itineraryInformation?.outskirtsLocation}
        />
      </TripInfoWrapper>
      <TripInfoWrapper title="Extras">
        <SectionDetails
          title="Extra Details"
          description={itineraryInformation?.extraDetails}
        />
        <SectionDetails
          title="Trip Purpose"
          description={
            personalInformation?.tripPurpose ??
            itineraryInformation?.purposeOfRide ??
            "-"
          }
        />
      </TripInfoWrapper>
    </div>
  );
};

export default Trip;

const TripInfoWrapper = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="bg-white rounded-3xl py-4 px-7 space-y-5">
      <p className="text-sm md:text-base 3xl:text-xl text-grey-800 !font-semibold">
        {title}
      </p>
      <div className="space-y-8">{children}</div>
    </div>
  );
};

const DurationDetails = ({
  date,
  time,
  icon,
  iconColor,
  title,
}: {
  date: Date;
  time: Date;
  icon: ReactNode;
  iconColor: string;
  title: string;
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="flex items-center gap-1.5">
        <span className={cn("*:w-5 *:h-5", iconColor)}>{icon}</span>
        <span>{title}</span>
      </p>
      <p>
        {format(new Date(date), "do MMM yyyy")} |{" "}
        {format(new Date(time), "hh:mma")}
      </p>
    </div>
  );
};

const SectionDetails = ({
  title,
  description,
  isLocation,
}: {
  title: string;
  description: string | string[];
  isLocation?: boolean;
}) => {
  return (
    <div className="space-y-4 text-xs md:text-sm 3xl:text-base">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isLocation && Icons.ic_location}
          <p className="text-grey-800 !font-medium">{title}</p>
        </div>
        {isLocation && <p className="text-primary-500">View Location</p>}
      </div>

      {description && Array.isArray(description) ? (
        <ul className="space-y-4">
          {description.map((item, index) => (
            <li className="text-grey-500" key={index}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-grey-500">{description}</p>
      )}
    </div>
  );
};
