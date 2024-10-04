import ViewAsCustomer from "@/components/VehicleOnboarding/VehicleSummary/ViewAsCustomer";
import React from "react";
import useGetCustomerView from "./hooks/useGetCustomerView";
import { FullPageSpinner } from "@repo/ui/spinner";

type Props = { id: string };

export default function ViewListing({ id }: Props) {
  const { vehicle, isError, isLoading } = useGetCustomerView({ id });
  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <p>Something went wrong</p>
  ) : (
    <ViewAsCustomer vehicle={vehicle ?? null} />
  );
}
