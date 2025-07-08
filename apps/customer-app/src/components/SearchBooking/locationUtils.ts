import Icons from "@repo/ui/icons";
import { combineDateTime } from "@/utils/combineDateTime";

/**
 * Get appropriate icon for location based on type and icon name
 */
export const getLocationIcon = (iconType: string, locationType: string) => {
  if (locationType === "google") return Icons.ic_location || "📍";

  const iconMap: Record<string, any> = {
    location: Icons.ic_location || "📍",
    clock: Icons.ic_lock || "🕐",
    home: "🏠",
  };

  return (iconMap[iconType] ?? Icons.ic_location) || "📍";
};

/**
 * Build search URL with parameters
 */
export const buildSearchUrl = (
  searchValue: string,
  fromDateValue: Date | null,
  fromTimeValue: Date | null,
  untilDateValue: Date | null,
  untilTimeValue: Date | null
): string => {
  const params = new URLSearchParams({ search: searchValue });

  const { startDateTime, endDateTime } = combineDateTime(
    fromDateValue?.toISOString() || "",
    fromTimeValue?.toISOString() || "",
    untilDateValue?.toISOString() || "",
    untilTimeValue?.toISOString() || ""
  );

  params.set("startDateTime", startDateTime);
  params.set("endDateTime", endDateTime);

  return `/explore/search?${params.toString()}`;
};
