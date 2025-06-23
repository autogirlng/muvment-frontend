"use client";

import { useSearchParams } from "next/navigation";
import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";

export default function ExploreSearchVehiclesComponent() {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  const startDateTime = searchParams.get("startDateTime") || "";
  const endDateTime = searchParams.get("endDateTime") || "";

  return (
    <ExplorePageLayout
      title="Search Vehicles"
      icon={Icons.ic_top_rated_vehicle}
      type="search"
      search={search}
      fromDate={startDateTime}
      untilDate={endDateTime}
    />
  );
}
