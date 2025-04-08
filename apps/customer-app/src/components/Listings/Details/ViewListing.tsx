import VehicleSummary from "@/components/VehicleBooking/VehicleSummary";
import Icons from "@repo/ui/icons";

type Props = { id?: string };

export default function ViewListing({ id }: Props) {
  return (
    <VehicleSummary
      vehicle={null}
      vehicleImages={[
        "/images/vehicles/1.png",
        "/images/vehicles/2.png",
        "/images/vehicles/3.png",
      ]}
      vehicleDetails={[
        { make: "Toyota" },
        { model: "Corolla" },
        { year: "2015" },
        { color: "White" },
        { city: "Lagos" },
        { vehicle_type: "Sedan" },
        { seating_capacity: 4 },
      ]}
      perks={[
        {
          icon: Icons.ic_driver_provided,
          name: "Driver Provided",
          id: "provideDriver",
          status: false,
        },
        {
          icon: Icons.ic_fuel_station,
          name: "20 ltrs Fuel Included",
          id: "fuelProvided",
          status: false,
        },
        {
          icon: Icons.ic_remove_calendar,
          name: "Free Cancellation",
          id: "freeCancelation",
          status: true,
        },
        // {
        //   icon: Icons.ic_self_drive,
        //   name: "Self Drive",
        //   id: "selfDrive",
        //   status: false,
        // },
        {
          icon: Icons.ic_checkmark_badge,
          name: "Vehicle insured",
          id: "hasInsurance",
          status: false,
        },
        {
          icon: Icons.ic_car_tracker,
          name: "Tracker Enabled",
          id: "hasTracker",
          status: false,
        },
      ]}
    />
  );
}
