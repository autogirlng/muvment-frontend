"use client";

import BackLink from "@/components/BackLink";
import { ListingBadge } from "@repo/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ListingsPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  // fetch listing by id

  useEffect(() => {
    if (!params.id) {
      router.push("/listings");
    }
  }, [params.id]);

  return (
    <main className="space-y-6 py-[56px]">
      <div className="space-y-5">
        <BackLink backLink="/listings" />
        <div className="text-grey-800">
          <div className="flex items-center gap-6">
            <h5 className="text-4xl 3xl:text-h2 !font-bold">
              Hyundai Tuscon 2018
            </h5>
            <ListingBadge status="approved" />
          </div>
        </div>
      </div>
    </main>
  );
}
