import cn from "classnames";
import { CalendarValue, VehicleStatus } from "@/utils/types";
import { VehicleListingBadge } from "@repo/ui/badge";
import { Popup } from "@repo/ui/popup";
import { Spinner } from "@repo/ui/spinner";
import Icons from "@repo/ui/icons";
import Button from "@repo/ui/button";
import DateRangeCalendar from "@repo/ui/calendar";
import { useState } from "react";

type Props = { vehicleStatus?: VehicleStatus; isActive?: boolean; id?: string };

export default function ListingDetailsVehicleAvailability({
  isActive,
  vehicleStatus,
  id,
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
          <Button className="!bg-transparent sm:!bg-primary-75 text-primary-500 !py-2 3xl:!py-3 !px-2 sm:!px-7 3xl:!px-10 !text-base 3xl:!text-xl rounded-[93px]">
            Update
          </Button>
        }
        content={
          <>
            <ul className="space-y-2">
              <p className="!text-xs 3xl:!text-base !font-semibold">
                Vehicle Status
              </p>

              <StatusButton
                status="Booked"
                active={vehicleStatus === VehicleStatus.BOOKED}
                onClick={() => {}}
                loading={false}
              />

              <StatusButton
                status="Available"
                active={vehicleStatus === VehicleStatus.ACTIVE}
                onClick={() => {}}
                loading={false}
              />
              <StatusButton
                status="In maintenance"
                active={vehicleStatus === VehicleStatus.MAINTENANCE}
                onClick={() => {}}
                loading={false}
              />
            </ul>
          </>
        }
      />
    </div>
  );
}

const StatusButton = ({
  status,
  onClick,
  loading,
  active,
  // disabled,
  setUnavailableTime,
  unavailabilityValue,
  onChangeUnavailability,
}: {
  status: string;
  onClick: () => void;
  loading: boolean;
  active: boolean;
  // disabled: boolean;
  setUnavailableTime?: boolean;
  unavailabilityValue?: CalendarValue;
  onChangeUnavailability?: (value: CalendarValue) => void;
}) => {
  const [calendarValues, setCalendarValues] = useState<CalendarValue>(null);
  const [calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false);
  const buttonClass = cn(
    "py-3 px-2 font-normal text-left w-full text-sm rounded-xl ",
    active
      ? "bg-primary-500 text-white flex items-center gap-1"
      : "bg-grey-90 text-grey-900"
  );

  return (
    <li>
      {setUnavailableTime ? (
        <div className={cn(buttonClass, "flex items-center justify-between")}>
          <button
            className="flex items-center gap-1"
            onClick={onClick}
            disabled={loading || active}
          >
            {active && Icons.ic_done_circle}
            {loading ? <Spinner /> : <span>{status}</span>}
          </button>
          <div>
            <DateRangeCalendar
              title="Set unavailability period"
              selectRange={true}
              value={unavailabilityValue || null}
              onChange={onChangeUnavailability || (() => {})}
              setCalendarValues={setCalendarValues}
              isOpen={calendarIsOpen}
              handleIsOpen={(open: boolean) => setCalendarIsOpen(open)}
            />
            {/* <div className="flex justify-between gap-4 mt-8">
              <Button
                fullWidth
                onClick={() => {
                  // clearAll();
                  setCalendarIsOpen(false);
                }}
                className="!bg-grey-90 hover:!bg-primary-75 !text-grey-700"
              >
                back
              </Button>
              <Button
                color="primary"
                varian="filled"
                fullWidth
                // onClick={handleDone}
              >
                done
              </Button>
            </div> */}
          </div>
        </div>
      ) : (
        <button
          className={buttonClass}
          onClick={onClick}
          disabled={loading || active}
        >
          {active && Icons.ic_done_circle}
          {loading ? <Spinner /> : <span>{status}</span>}
        </button>
      )}
    </li>
  );
};
