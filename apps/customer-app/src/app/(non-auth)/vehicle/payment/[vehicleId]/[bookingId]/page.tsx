"use client";

import VehiclePayment from "@/components/VehicleBooking/Payment";

export default function VehicleBookingPage({
  params,
}: {
  params: { bookingId: string; vehicleId: string };
}) {
  // const router = useRouter();

  return (
    <main className="">
      <div className="mx-auto space-y-8 md:space-y-[52px]">
        <VehiclePayment
          vehicleId={params.vehicleId}
          bookingId={params.bookingId}
        />
      </div>
    </main>
  );
}
