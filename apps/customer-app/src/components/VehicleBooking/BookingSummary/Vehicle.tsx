import {
  MappedInformation,
  VehicleInformation,
  VehiclePerksProp,
} from "@/utils/types";
import Collapse from "@repo/ui/collapsible";
import Icons from "@repo/ui/icons";
import { useRouter } from "next/navigation";
import VehicleDetails from "../VehicleSummary/VehicleDetails";

type Props = {
  vehicle: VehicleInformation | null;
  vehicleImages: string[];
  perks: VehiclePerksProp[];
  vehicleDetails: MappedInformation[];
};

const Vehicle = ({ vehicle, vehicleImages, perks, vehicleDetails }: Props) => {
  const router = useRouter();

  return (
    <div className="pt-8">
      <VehicleDetails
        vehicle={vehicle}
        vehicleImages={vehicleImages}
        perks={perks}
        vehicleDetails={vehicleDetails}
      />
    </div>
  );
};

export default Vehicle;
