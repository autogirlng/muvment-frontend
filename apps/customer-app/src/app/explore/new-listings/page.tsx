"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";

export default function ExploreNewListingsPage() {
  return (
    <ExplorePageLayout
      title="New Listings"
      icon={Icons.ic_top_rated_vehicle}
      total={50}
    />
  );
}
