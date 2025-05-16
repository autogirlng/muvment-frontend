"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import { Suspense } from "react";

export default function ExploreNewListingsPage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <ExplorePageLayout
        title="New Listings"
        icon={Icons.ic_top_rated_vehicle}
        type="all"
      />
    </Suspense>
  );
}
