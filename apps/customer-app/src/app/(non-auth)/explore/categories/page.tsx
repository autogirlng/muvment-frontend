"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";

export default function ExploreCategoriesPage() {
  return (
    <ExplorePageLayout
      title="Explore Sedans"
      icon={Icons.ic_car}
      type="all"
    />
  );
}
