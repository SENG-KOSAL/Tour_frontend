'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookingForm() {
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tour_id");

  type Tour = {
    id: string;
    title: string;
    destination: string;
    duration_days: number;
    price_per_person: number;
    image_url?: string;
    // add other properties as needed
  };

  const [tour, setTour] = useState<Tour | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (tourId) {
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours/${tourId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Tour fetch failed with status ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched tour data:", data);
          setTour(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tour:", err.message);
          setMessage("Tour could not be loaded.");
          setIsLoading(false);
           setIsClient(true)
        });
    }
  }, [tourId]);

  const handleBooking = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Please login first.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tour_id: tourId,
          number_of_people: numberOfPeople,
          booking_date: bookingDate,
          status: "pending",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(
          "✅ Booking successful! We've sent confirmation details to your email."
        );
      } else {
        setMessage(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred during booking. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !tour)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-sky-500 mx-auto mb-4"></div>
          <p className="text-sky-700 font-medium">Loading tour details...</p>
        </div>
      </div>
    );

  if (message && !tour)
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full ${
            message.includes("✅") ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {message.includes("✅") ? (
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {message.includes("✅") ? "Success!" : "Oops!"}
        </h2>
        <p
          className={`text-lg ${
            message.includes("✅") ? "text-green-600" : "text-red-600"
          } mb-6`}
        >
          {message}
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-medium rounded-lg transition-colors duration-300"
        >
          Back to Tours
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Booking Header */}
          <div className="mb-6">
            <a
              href="/page/Home"
              className="inline-flex items-center px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg shadow-md transition-colors"
            >
              ← Back to Home
            </a>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-sky-900 mb-3">
              Secure Your Adventure
            </h1>
            <p className="text-lg text-sky-700 max-w-lg mx-auto">
              Complete your booking details below to reserve your spot on this
              incredible journey.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Tour Summary Card */}
            {tour && (
              <div className="md:w-1/3 bg-white rounded-xl shadow-lg overflow-hidden self-start">
                <div className="h-40 bg-sky-600 flex items-center justify-center">
                  <img
                    src={tour.image_url || "/placeholder.jpg"}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {tour.title}
                  </h2>
                  <div className="flex items-center text-sm text-sky-700 mb-3">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {tour.destination}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span>{" "}
                      {tour.duration_days} days
                    </div>
                    <div className="text-lg font-bold text-sky-600">
                      ${tour.price_per_person}
                      <span className="text-sm font-normal text-gray-500">
                        /person
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <div className="flex text-amber-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        4.8 (24 reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Form */}
            <div className="md:w-2/3 bg-white rounded-xl shadow-lg overflow-hidden p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Booking Details
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="people"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Number of Travelers
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="people"
                      min="1"
                      max="10"
                      value={numberOfPeople}
                      onChange={(e) =>
                        setNumberOfPeople(
                          Math.max(1, Math.min(10, Number(e.target.value)))
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition pl-12"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preferred Travel Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition pl-12"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Price Summary
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        ${tour?.price_per_person} x {numberOfPeople} traveler(s)
                      </span>
                      <span className="font-medium">
                        $
                        {tour
                          ? (tour.price_per_person * numberOfPeople).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-gray-100 pt-3">
                      <span className="font-medium text-gray-800">Total</span>
                      <span className="font-bold text-sky-600 text-lg">
                        $
                        {tour
                          ? (tour.price_per_person * numberOfPeople).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    disabled={isLoading}
                    className={`w-full py-4 px-6 rounded-lg text-white font-bold ${
                      isLoading
                        ? "bg-sky-400"
                        : "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
                    } transition-all duration-300 shadow-md hover:shadow-lg flex justify-center items-center`}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing Your Booking...
                      </>
                    ) : (
                      "Complete Booking"
                    )}
                  </button>

                  {message && (
                    <div
                      className={`mt-4 p-4 rounded-lg ${
                        message.includes("✅")
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      <div className="flex items-start">
                        {message.includes("✅") ? (
                          <svg
                            className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        )}
                        <span>{message}</span>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By completing this booking, you agree to our Terms of
                    Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function setIsClient(arg0: boolean) {
  throw new Error("Function not implemented.");
}

