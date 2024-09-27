import Button from "@repo/ui/button";
import useBookingActions from "../../hooks/useBookingActions";
import { BlurredDialog } from "@repo/ui/dialog";
import { ReactNode, useState } from "react";

type Props = { handleModal: (open: boolean) => void; id?: string };

const AcceptTrip = ({ id, trigger }: { id: string; trigger: ReactNode }) => {
  const [openAcceptModal, setOpenAcceptModal] = useState<boolean>(false);

  const handleAcceptModal = () => {
    setOpenAcceptModal(!openAcceptModal);
  };

  return (
    <BlurredDialog
      open={openAcceptModal}
      onOpenChange={handleAcceptModal}
      trigger={trigger}
      content={<PopupContent handleModal={handleAcceptModal} id={id} />}
    />
  );
};

export default AcceptTrip;

const PopupContent = ({ handleModal, id }: Props) => {
  const { acceptBooking } = useBookingActions(handleModal, id);
  return (
    <div className="space-y-6">
      <h6 className="text-base sm:text-xl 3xl:text-h6 !font-semibold text-grey-800">
        Accept Trip
      </h6>
      <p className="text-xs sm:text-sm 3xl:text-base text-grey-500">
        Are you sure you want to accept this trip?
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
          loading={acceptBooking.isPending}
          disabled={acceptBooking.isPending}
          onClick={() => acceptBooking.mutate()}
        >
          Yes, Accept
        </Button>
      </div>
    </div>
  );
};
