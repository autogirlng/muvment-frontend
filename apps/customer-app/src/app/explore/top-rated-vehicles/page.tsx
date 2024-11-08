"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";

export default function ExploreTopRatedVehiclesPage() {
  return (
    <ExplorePageLayout
      title="Top-rated vehicles"
      icon={Icons.ic_top_rated_vehicle}
      total={50}
    />
  );
}
