import Button from "@repo/ui/button";
import useBookingActions from "../../hooks/useBookingActions";
import { ReactNode, useState } from "react";
import { BlurredDialog } from "@repo/ui/dialog";

type Props = { handleModal: (open: boolean) => void; id?: string };

const DeclineTrip = ({ id, trigger }: { id: string; trigger: ReactNode }) => {
  const [openDeclineModal, setOpenDeclineModal] = useState<boolean>(false);
  const handleDeclineModal = () => {
    setOpenDeclineModal(!openDeclineModal);
  };

  return (
    <BlurredDialog
      open={openDeclineModal}
      onOpenChange={handleDeclineModal}
      trigger={trigger}
      content={<PopupContent handleModal={handleDeclineModal} id={id} />}
    />
  );
};

export default DeclineTrip;

const PopupContent = ({ handleModal, id }: Props) => {
  const { declineBooking } = useBookingActions(handleModal, id);
  return (
    <div className="space-y-6">
      <h6 className="text-base sm:text-xl 3xl:text-h6 !font-semibold text-grey-800">
        Decline Trip
      </h6>
      <p className="text-xs sm:text-sm 3xl:text-base text-grey-500">
        Are you sure you want to decline this trip?
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          fullWidth
          variant="filled"
          color="primary"
          type="submit"
          className="!py-4"
          onClick={() => handleModal(false)}
        >
          No, go back
        </Button>

        <Button
          fullWidth
          variant="filled"
          color="white"
          className="!py-4 !bg-grey-90 !text-grey-700"
          loading={declineBooking.isPending}
          disabled={declineBooking.isPending}
          onClick={() => declineBooking.mutate()}
        >
          Yes, decline
        </Button>
      </div>
    </div>
  );
};
