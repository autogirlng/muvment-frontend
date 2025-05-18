<<<<<<< HEAD
=======
"use client";

import { Suspense } from "react";
>>>>>>> d9f2352492730eeff72d585e92a144a72be36d72
import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import { FullPageSpinner } from "@repo/ui/spinner";

<<<<<<< HEAD
export default async function SearchVehiclesPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    fromDate?: string;
    fromTime?: string;
    untilDate?: string;
    untilTime?: string;
  };
}) {
  const { search, fromDate, fromTime, untilDate, untilTime } = searchParams;

  return (
    <ExplorePageLayout
      type="search"
      search={search}
      fromDate={fromDate}
      fromTime={fromTime}
      untilDate={untilDate}
      untilTime={untilTime}
    />
=======
export default function SearchVehiclesPage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <ExplorePageLayout type="search" />
    </Suspense>
>>>>>>> d9f2352492730eeff72d585e92a144a72be36d72
  );
}
