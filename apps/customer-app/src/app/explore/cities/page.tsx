"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";

export default function ExploreCitiesPage() {
  return (
    <ExplorePageLayout
      title="Vehicles In Lagos"
      icon={Icons.ic_location}
      total={50}
    />
  );
}
