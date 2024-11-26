import {
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import Collapse from "@repo/ui/collapsible";
import Icons from "@repo/ui/icons";
import Vehicle from "./Vehicle";
import Trip from "./Trip";
import CostBreakdown from "./CostBreakdown";

type Props = {
  vehicle: VehicleInformation | null;
  vehicleImages: string[];
  perks: VehiclePerksProp[];
  vehicleDetails: MappedInformation[];
};

export default function BookingSummary({
  vehicle,
  vehicleImages,
  perks,
  vehicleDetails,
}: Props) {
  return (
    <div className="flex justify-between flex-col-reverse md:flex-row items-start gap-8">
      <div className="space-y-8 w-full md:max-w-[calc(100%-400px)]">
        <Collapse
          title={
            <p className="text-h6 3xl:text-h5 font-medium text-black">
              Vehicle Details
            </p>
          }
          closeText={Icons.ic_chevron_down}
          openText={Icons.ic_chevron_up}
          className="bg-grey-50 border border-grey-200 rounded-3xl py-5 px-7"
        >
          <Vehicle
            vehicle={vehicle}
            vehicleImages={vehicleImages}
            perks={perks}
            vehicleDetails={vehicleDetails}
          />
        </Collapse>
        <Collapse
          title={
            <p className="text-h6 3xl:text-h5 font-medium text-black">
              Trip Details
            </p>
          }
          closeText={Icons.ic_chevron_down}
          openText={Icons.ic_chevron_up}
          isDefaultOpen
          className="bg-grey-50 border border-grey-200 rounded-3xl py-5 px-7"
        >
          <Trip vehicle={vehicle} />
        </Collapse>
      </div>
      <CostBreakdown vehicle={vehicle} />
    </div>
  );
}
