"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm from "../BookingForm/page";
import { FaMapMarkerAlt, FaUsers, FaStar } from "react-icons/fa";

export default function TourDetail() {
  const searchParams = useSearchParams();
  const tourId = searchParams.get("tour_id");
  const [tour, setTour] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );

  if (!tour)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Tour Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {message || "The tour you're looking for doesn't exist."}
          </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => (window.location.href = "/tours")}
          >
            Browse Available Tours
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      {/* Main Tour Card */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tour Image */}
          {tour.image_url && (
            <div className="h-80 overflow-hidden">
              <img
                src={tour.image_url}
                alt={tour.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tour Content */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Tour Info */}
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {tour.title}
                </h1>
                <div className="flex items-center mb-6">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" />
                  <span className="text-gray-600">{tour.destination}</span>
                  <span className="mx-3 text-gray-300">|</span>
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar className="text-gray-300" />
                    <span className="ml-2 text-gray-600">(24 reviews)</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 whitespace-pre-wrap">
                  {tour.description}
                </p>

                {/* Highlights Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Tour Highlights
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Guided city tour with local expert",
                      "Entrance fees to all attractions included",
                      "Comfortable transportation",
                      "Small group experience",
                    ].map((highlight, index) => (
                      <div key={index} className="flex items-start">
                        <span className="text-green-500 mr-2 mt-1">✓</span>
                        <span className="text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Available Slots</p>
                    <p className="text-gray-700">
                      {tour.available_slots} people
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Booking Info */}
              {/* <div className="md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Price</h3>
                    <span className="text-2xl font-bold text-blue-600">${tour.price_per_person}</span>
                  </div>
                  <p className="text-gray-600 mb-6">per person</p>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="text-gray-700">{tour.duration_days} days</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="text-blue-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Available Slots</p>
                        <p className="text-gray-700">{tour.available_slots} people</p>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 mb-4">
                    Book Now
                  </button>
                  <p className="text-center text-sm text-gray-500">Free cancellation up to 24 hours before</p>
                </div>
              </div> */}
            </div>

            {/* Booking Form */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Book Your Adventure
              </h2>
              <Suspense fallback={<div>Loading booking form...</div>}>
                <BookingForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function setIsClient(arg0: boolean) {
  throw new Error("Function not implemented.");
}
