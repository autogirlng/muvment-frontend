import { useHttp } from "@/hooks/useHttp";
import { useAppSelector } from "@/lib/hooks";
import { EarningsStatistics, ListingInformation } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

type ListingDataType = {
  vehicle: ListingInformation;
  statistics: EarningsStatistics;
};

export default function useGetListingById({ id }: { id: string }) {
  const http = useHttp();
  const { user } = useAppSelector((state) => state.user);

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["getListingById", id],

    queryFn: async () =>
      http.get<ListingDataType>(`/api/listings/details/${id}`),
    enabled: !!user?.id && !!id,
  });

  const vehicleDetails = useMemo(() => {
    if (data) {
      return [
        { make: data.vehicle?.make || "N/A" },
        { model: data.vehicle?.model || "N/A" },
        { year: data.vehicle?.yearOfRelease || "N/A" },
        { colour: data.vehicle?.vehicleColor || "N/A" },
        { city: data.vehicle?.location || "N/A" },
        { vehicleType: data.vehicle?.vehicleType || "N/A" },
        { seatingCapacity: data.vehicle?.numberOfSeats || "N/A" },
      ];
    }
    return [{}];
  }, [data]);

  const vehicleImages = useMemo(() => {
    if (data) {
      return [
        data.vehicle?.VehicleImage?.frontView,
        data.vehicle?.VehicleImage?.backView,
        data.vehicle?.VehicleImage?.sideView1,
        data.vehicle?.VehicleImage?.sideView2,
        data.vehicle?.VehicleImage?.interior,
        data.vehicle?.VehicleImage?.other,
      ];
    }
    return [{}];
  }, [data]);

  return {
    listingDetail: { ...data?.vehicle, statistics: data?.statistics } as ListingInformation,
    isError,
    isLoading,
    isSuccess,
    vehicleDetails,
    vehicleImages,
  };
}
