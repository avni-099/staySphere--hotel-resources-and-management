import { Suspense } from "react";
import BookingPage from "./Bookingpage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading booking...</div>}>
      <BookingPage />
    </Suspense>
  );
}