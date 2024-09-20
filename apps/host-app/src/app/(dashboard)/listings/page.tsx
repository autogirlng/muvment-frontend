"use client";

import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import ListingCard from "@/components/Listings/ListingCard";
import useListings from "@/hooks/useListings";
import { useAppSelector } from "@/lib/hooks";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";

export default function ListingsPage() {
  const { listings } = useAppSelector((state) => state.listings);
  const { getListings } = useListings();

  if (getListings.isLoading) {
    return <FullPageSpinner />;
  }

  return (
    <main className="space-y-6 py-[56px]">
      <DashboardSectionTitle icon={Icons.ic_car} title="Listings" />
      {/* search bar and filter */}

      {listings.map((listing, index) => (
        <ListingCard key={index} listing={listing} />
      ))}
    </main>
  );
}
