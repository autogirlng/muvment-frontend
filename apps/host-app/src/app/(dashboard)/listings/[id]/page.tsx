"use client";

import BackLink from "@/components/BackLink";
import DashboardSectionTitle from "@/components/DashboardSectionTitle";
import useListings from "@/hooks/useListings";
import { useAppSelector } from "@/lib/hooks";
import { ListingBadge } from "@repo/ui/badge";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ListingsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { listingById } = useAppSelector((state) => state.listings);
  const { getListingById } = useListings();

  useEffect(() => {
    if (!params.id) {
      router.push("/listings");
    } else {
      getListingById.mutate(params.id);
    }
  }, [params.id]);

  if (getListingById.isPending) {
    return <FullPageSpinner />;
  }

  return (
    <main className="space-y-6 py-[56px]">
      <div className="space-y-5">
        <BackLink backLink="/listings" />
        <div className="flex gap-10">
          <div className="text-grey-800">
            <div className="flex items-center gap-6">
              <h5 className="text-4xl 3xl:text-h2 !font-bold">
                {listingById?.listingName}
              </h5>
              <ListingBadge status="approved" />
            </div>
          </div>
          <div>
            <DashboardSectionTitle
              icon={Icons.ic_ticket}
              title="Upcoming Bookings"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
