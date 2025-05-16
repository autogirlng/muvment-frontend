import { AvatarInitials } from "@repo/ui/avatar";
import { getInitialsFromName } from "@/utils/functions";
import { FullPageSpinner } from "@repo/ui/spinner";
import { BlurredDialog } from "@repo/ui/dialog";
import Button from "@repo/ui/button";
import AssignDriverForm from "@/components/Listings/Details/modals/AssignDriverForm";
import useListingDrivers from "@/components/Listings/Details/hooks/useListingDrivers";

type Props = { id: string };

type Driver = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  numberOfBookingsAssigned?: number;
};

export default function DriversDetails({ id }: Props) {
  const { isLoading, assignNewDriver, openModal, handleModal, drivers } =
    useListingDrivers(id);

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">
        <h5 className="text-h6 3xl:text-h5 !font-semibold text-black">
          Driver History
        </h5>
        <BlurredDialog
          open={openModal}
          onOpenChange={handleModal}
          title="Assign New Driver"
          trigger={
            <Button className="!text-xs 3xl:!text-base text-primary-500 !bg-primary-75 rounded-[31px] !py-1.5 3xl:!py-2 !px-3 3xl:!px-4">
              Assign New Driver
            </Button>
          }
          content={
            <AssignDriverForm
              handleModal={handleModal}
              assignNewDriver={(values) => assignNewDriver.mutate(values)}
              isPending={assignNewDriver.isPending}
              vehicleId={id}
            />
          }
        />
      </div>

      {drivers?.map((driver, index) => (
        <DriverCard key={index} driver={driver} />
      ))}
    </div>
  );
}

const DriverCard = ({ driver }: { driver: Driver }) => {
  return (
    <div className="p-6 bg-grey-90 rounded-[32px] flex gap-3 items-center">
      <AvatarInitials
        initials={getInitialsFromName(driver.firstName, driver.lastName)}
      />
      <div className="space-y-[2px]">
        <p className="text-grey-700 text-sm 3xl:text-base">
          {driver.firstName} {driver.lastName}
        </p>
        <p className="text-grey-500 text-xs 3xl:text-sm">
          {driver.numberOfBookingsAssigned} bookings assigned
        </p>
        <p className="text-primary-500 text-xs 3xl:text-sm">
          {driver.phoneNumber}
        </p>
      </div>
    </div>
  );
};
