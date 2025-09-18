"use client";

import { Suspense } from "react";
import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import { FullPageSpinner } from "@repo/ui/spinner";

export default function SearchVehiclesPage() {
  return (
    // CHECK THE PAGINATION HERE
    <Suspense fallback={<FullPageSpinner />}>
      <ExplorePageLayout type="all" />
    </Suspense>
  );
}
