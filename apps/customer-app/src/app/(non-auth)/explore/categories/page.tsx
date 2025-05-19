"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import { Suspense } from "react";

export default function ExploreCategoriesPage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <ExplorePageLayout
        title="Explore Sedans"
        icon={Icons.ic_car}
        type="all"
      />
    </Suspense>
  );
}
