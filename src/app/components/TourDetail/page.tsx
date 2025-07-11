import { Suspense } from "react";
import TourDetailContent from "./TourDetailContent";

export default function TourDetailPage() {
  return (
    <Suspense fallback={<div>Loading tour detail...</div>}>
      <TourDetailContent />
    </Suspense>
  );
}
