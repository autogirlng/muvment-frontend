import { Suspense } from "react";
import { FullPageSpinner } from "@repo/ui/spinner";
import ExploreSearchVehiclesComponent from "./SearchExploreVehicleComponent";

export default function ExploreSearchVehiclesPage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <ExploreSearchVehiclesComponent />
    </Suspense>
  );
}
