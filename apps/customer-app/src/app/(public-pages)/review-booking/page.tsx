"use client";

import { Suspense } from "react";
import ExternalBookingLinkPage from "./ExternalPayment";
import { FullPageSpinner } from "@repo/ui/spinner";

export default function ReviewBookingPage() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <ExternalBookingLinkPage />
    </Suspense>
  );
}
