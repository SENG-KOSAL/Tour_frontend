import { Suspense } from "react";
import BookingForm from "./BookingFormContent";


export default function TourDetailPage() {
  return (
    <Suspense fallback={<div>Loading tour detail...</div>}>
      <BookingForm />
    </Suspense>
  );  
}
