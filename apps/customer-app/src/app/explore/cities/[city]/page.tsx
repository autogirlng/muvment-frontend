"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";

export default function ExploreCitiesPage({
  params,
}: {
  params: { city: string };
}) {
  return (
    <ExplorePageLayout
      title={`Vehicles In ${params.city}`}
      icon={Icons.ic_location}
      type="all"
    />
  );
}
