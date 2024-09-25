import Button from "@repo/ui/button";
import useBookingActions from "../../hooks/useBookingActions";
import { ChangeEvent, useState } from "react";
import TextArea from "@repo/ui/textarea";

type Props = { handleModal: (open: boolean) => void; id?: string };

const ReportTrip = ({ handleModal, id }: Props) => {
  const { declineBooking } = useBookingActions(handleModal, id);
  const [report, setReport] = useState("");

  return (
    <div className="space-y-6">
      <h6 className="text-base sm:text-xl 3xl:text-h6 !font-semibold text-grey-800">
        Report Booking
      </h6>
      <TextArea
        name="reportBooking"
        id="reportBooking"
        type="text"
        placeholder="Type a message"
        value={report}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          setReport(event.target.value)
        }
        // onBlur={handleBlur}
        // error={
        //   errors.vehicleDescription && touched.vehicleDescription
        //     ? errors.vehicleDescription
        //     : ""
        // }
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          fullWidth
          variant="filled"
          color="white"
          type="submit"
          className="!py-4 !bg-grey-90 !text-grey-700"
          onClick={() => handleModal(false)}
        >
          Cancel
        </Button>

        <Button
          fullWidth
          variant="filled"
          color="primary"
          className="!py-4"
          loading={declineBooking.isPending}
          disabled={declineBooking.isPending || !report}
          onClick={() => declineBooking.mutate()}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ReportTrip;
