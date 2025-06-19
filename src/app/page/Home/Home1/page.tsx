"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TravelPackages() {
  const [tours, setTours] = useState([]);
  const router = useRouter();

  const handleBookingClick = (tourId: any) => {
    router.push(`/components/BookingForm?tour_id=${tourId}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tours4?limit=3")
      .then((res) => setTours(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-sky-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-sky-600 font-semibold text-lg">
              EXPLORE THE WORLD
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              Discover Our Popular Destinations
            </h2>
            <p className="text-gray-600 mt-4 text-lg">
              Find your perfect getaway with our handpicked selection of
              breathtaking destinations around the globe.
            </p>
          </div>
          <a
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            href="/page/Package"
          >
            Explore All Tours
          </a>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.tour_id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Tour Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image_url}
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute bottom-4 right-4 bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ${tour.price_per_person}/person
                </div>
              </div>

              {/* Tour Content */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-800">
                    {tour.destination}
                  </h3>
                  <div className="flex text-sky-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 mt-3 mb-4 line-clamp-2">
                  {tour.description}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <Link href={`/components/TourDetail?tour_id=${tour.tour_id}`}>
                    <button className="text-sky-600 font-medium hover:text-sky-700 transition-colors duration-300 flex items-center">
                      View Details
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleBookingClick(tour.tour_id)}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
