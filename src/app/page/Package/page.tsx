"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ToursPage() {
  const router = useRouter();
  type Tour = {
    tour_id: number;
    title: string;
    description: string;
    image_url?: string;
    price_per_person: number;
    duration_days: number;
    available_slots: number;
    destination: string;
    // Add any other fields your API returns
  };

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  const handleBookingClick = (tourId: any) => {
    router.push(`/components/BookingForm?tour_id=${tourId}`);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tours`)
      .then((res) => res.json())
      .then((data) => {
        setTours(data.tours);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tours:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-sky-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl text-sky-100 mb-8 animate-fade-in delay-100">
              Explore breathtaking destinations with our handcrafted tours designed 
              to create unforgettable memories.
            </p>
            <div className="animate-fade-in delay-200">
              <button className="bg-white text-sky-900 hover:bg-sky-100 font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore Tours
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-sky-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-sky-100 text-sky-800 px-4 py-1 rounded-full text-sm font-semibold mb-4">
            WORLD-CLASS EXPERIENCES
          </span>
          <h2 className="text-4xl font-bold text-sky-900 mb-4">
            Our Featured Tours
          </h2>
          <p className="text-lg text-sky-700 max-w-2xl mx-auto">
            Carefully curated journeys that combine luxury, adventure, and cultural immersion.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && tours.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm max-w-2xl mx-auto p-8">
            <div className="text-sky-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-sky-800 mb-2">No Tours Available</h2>
            <p className="text-sky-600 mb-6">We're currently updating our tour offerings.</p>
            <button className="text-sky-600 hover:text-sky-800 font-medium flex items-center justify-center mx-auto">
              Notify me when new tours arrive
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}

        {/* Tours Grid */}
        {!loading && tours.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.tour_id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {/* Tour Image with Badge */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.image_url || "/placeholder.jpg"}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white text-sky-800 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    ${tour.price_per_person}/person
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs font-medium bg-sky-600 px-2 py-1 rounded mr-2">
                      {tour.duration_days} days
                    </span>
                    <span className="text-xs font-medium bg-emerald-500 px-2 py-1 rounded">
                      {tour.available_slots} slots left
                    </span>
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-sky-900">{tour.title}</h2>
                    <div className="flex items-center bg-sky-100 px-2 py-1 rounded">
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="ml-1 text-sm font-medium text-sky-800">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{tour.description}</p>
                  
                  <div className="flex items-center text-sm text-sky-700 mb-4">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {tour.destination}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between border-t border-sky-100 pt-4">
                    <Link href={`/components/TourDetail?tour_id=${tour.tour_id}`}>
                      <button className="text-sky-600 hover:text-sky-800 font-medium px-4 py-2 rounded-lg transition-colors duration-300 flex items-center">
                        More details
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </Link>
                    <button
                      onClick={() => handleBookingClick(tour.tour_id)}
                      className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready for Your Next Adventure?
            </h3>
            <p className="text-sky-100 text-lg mb-6 max-w-2xl mx-auto">
              Sign up for our newsletter and get exclusive deals and early access to new tours.
            </p>
            <div className="flex max-w-md mx-auto bg-white rounded-lg overflow-hidden">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 focus:outline-none text-gray-700"
              />
              <button className="bg-sky-700 hover:bg-sky-800 text-white px-6 py-3 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}