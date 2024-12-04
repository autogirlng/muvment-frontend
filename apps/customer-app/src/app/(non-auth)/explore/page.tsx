import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";

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
  );
}
