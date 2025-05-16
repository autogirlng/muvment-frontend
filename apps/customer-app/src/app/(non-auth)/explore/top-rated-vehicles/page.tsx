"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import { Suspense } from "react";

export default function ExploreTopRatedVehiclesPage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <ExplorePageLayout
        title="Top-rated vehicles"
        icon={Icons.ic_top_rated_vehicle}
        type="top-rated"
      />
    </Suspense>
  );
}
