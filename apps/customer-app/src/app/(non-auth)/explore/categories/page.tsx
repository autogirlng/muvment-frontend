"use client";

import ExplorePageLayout from "@/components/Explore/ExplorePageLayout";
import Icons from "@repo/ui/icons";
import { FullPageSpinner } from "@repo/ui/spinner";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CategoriesContent() {
  const searchParams = useSearchParams();
  const categoryType = searchParams.get("type") || "Sedan";

  // Ensure we use the exact case as provided in your list
  const normalizeType = (type: string) => {
    const typeMap: { [key: string]: string } = {
      sedan: "Sedan",
      suv: "SUV",
      truck: "Truck",
      luxury: "Luxury",
      bus: "Bus",
    };

    return typeMap[type.toLowerCase()] || type;
  };

  const normalizedType = normalizeType(categoryType);

  // Get proper display name with correct pluralization
  const getDisplayName = (type: string) => {
    const displayMap: { [key: string]: string } = {
      Sedan: "Sedans",
      SUV: "SUVs",
      Truck: "Trucks",
      Luxury: "Luxury Vehicles",
      Bus: "Buses",
    };

    return displayMap[type] || `${type}s`;
  };

  // Map vehicle types to appropriate icons
  const getIconForType = (type: string) => {
    switch (type) {
      case "Sedan":
        return Icons.ic_car;
      case "SUV":
        return Icons.ic_car; // Replace with Icons.ic_suv if available
      case "Truck":
        return Icons.ic_car; // Replace with Icons.ic_truck if available
      case "Luxury":
        return Icons.ic_car; // Replace with Icons.ic_luxury_car if available
      case "Bus":
        return Icons.ic_car; // Replace with Icons.ic_bus if available
      default:
        return Icons.ic_car;
    }
  };

  const displayName = getDisplayName(normalizedType);

  return (
    <ExplorePageLayout
      title={`Explore ${displayName}`}
      icon={getIconForType(normalizedType)}
      type="category"
      categoryType={normalizedType}
    />
  );
}

export default function ExploreCategoriesPage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <CategoriesContent />
    </Suspense>
  );
}
