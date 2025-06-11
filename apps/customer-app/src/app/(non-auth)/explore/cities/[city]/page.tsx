"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";

export default function ExploreCitiesPage({
  params,
}: {
  params: { city: string };
}) {
  const capitalizedCity =
    params.city.charAt(0).toUpperCase() + params.city.slice(1);

  return (
    <ExplorePageLayout
      title={`Vehicles In ${capitalizedCity}`}
      icon={Icons.ic_location}
      type="all"
      location={capitalizedCity}
    />
  );
}
