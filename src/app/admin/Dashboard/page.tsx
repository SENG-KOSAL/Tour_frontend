// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Tours from "../Page/tour/page";
// import BookingListPage from "../Page/Booking_list/page";
// import Logout from "@/app/components/Logout/page";
// interface DashboardData {
//   // Customize this based on your Laravel response structure
//   // totalUsers?: number;
//   // totalTours?: number;
//   message?: string;
// }
// const page = () => {
//   const [dashboardData, setDashboardData] = useState<DashboardData | null>(
//     null
//   );
//   const [error, setError] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         setError("No token found. Please log in.");
//         router.push("/login");
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:8000/api/admin/dashboard", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         });

//         if (!res.ok) {
//           if (res.status === 401) {
//             setError("Unauthorized. Please log in again.");
//             router.push("/login");
//           } else {
//             setError("Failed to fetch dashboard need to login.");
//           }
//           return;
//         }

//         const data = await res.json();
//         setDashboardData(data);
//       } catch (err) {
//         setError("Something went wrong.");
//         console.error(err);
//       }
//     };
//     fetchDashboard();
//   }, [router]);
//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8 font-sans">
//         <button >
//         <Logout/>
//         </button>
//         <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40">
//           <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center drop-shadow">
//             🚀 Admin Dashboard
//           </h1>

//           {error && (
//             <p className="text-red-600 text-center mb-6 bg-red-100 p-2 rounded-lg">
//               {error}
//             </p>
//           )}

//           {dashboardData ? (
//             <div className="text-center text-lg text-gray-700 space-y-4">
//               {/* Example of possible stats, uncomment and customize */}
//               {/* <p><strong>Total Users:</strong> {dashboardData.totalUsers}</p>
//         <p><strong>Total Tours:</strong> {dashboardData.totalTours}</p> */}
//               <p className="mt-4 text-green-700 bg-green-100 p-3 rounded-xl inline-block shadow">
//                 {dashboardData.message}
//               </p>
//             </div>
//           ) : !error ? (
//             <p className="text-center text-gray-500 animate-pulse">
//               Loading...
//             </p>
//           ) : null}
//         </div>

//         <div className="mt-10 max-w-4xl mx-auto">
//           <Tours />
//         </div>

//         <div>
//           <BookingListPage/>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;



"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logout from "@/app/components/Logout/page";
import { FiHome, FiMap, FiCalendar, FiUsers, FiPlus } from "react-icons/fi";
import Image from "next/image";
import AdminTourCards from "../components/cardTourAdmin/page";
import BookingListPage from "../Page/Booking_list/page";

interface Tour {
  id?: number;
  title: string;
  description: string;
  destination: string;
  duration_days: number;
  price_per_person: number;
  available_slots: number;
  image_url: string;
}

interface DashboardData {
  totalUsers?: number;
  totalTours?: number;
  activeBookings?: number;
  message?: string;
  tours?: Tour[];
}

const Page = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("No token found. Please log in.");
        router.push("/login");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/api/admin/dashboard", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Unauthorized. Please log in again.");
            router.push("/login");
          } else {
            setError("Failed to fetch dashboard data. Please try again.");
          }
          return;
        }

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        setError("Network error. Please check your connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router, activeTab]);

  const handleDeleteTour = async (tourId: number) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;
    
    try {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`http://localhost:8000/api/tours/${tourId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete tour");
      }

      // Refresh tour data
      setDashboardData(prev => ({
        ...prev,
        tours: prev?.tours?.filter(tour => tour.id !== tourId)
      }));
    } catch (err) {
      setError("Failed to delete tour");
      console.error(err);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case "tours":
        // return dashboardData?.tours ? (
        //   <TourTable 
        //     tours={dashboardData.tours} 
        //     onDelete={handleDeleteTour} 
        //   />
        // ) : (
        //   <p className="text-gray-500 text-center py-8">No tour data available</p>
        // );
        return (
          <AdminTourCards />
        );
      case "bookings":
        return <BookingListPage />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <StatCard 
                icon={<FiMap className="text-blue-500" size={24} />}
                title="Total Tours"
                value={dashboardData?.totalTours || 0}
                change="+12%"
              />
              <StatCard
                icon={<FiUsers className="text-green-500" size={24} />}
                title="Total Users"
                value={dashboardData?.totalUsers || 0}
                change="+5%"
              />
              <StatCard
                icon={<FiCalendar className="text-purple-500" size={24} />}
                title="Active Bookings"
                value={dashboardData?.activeBookings || 0}
                change="+8%"
              />
            </div>
            
            {dashboardData?.tours && dashboardData.tours.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Featured Tours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dashboardData.tours.slice(0, 3).map(tour => (
                    <TourCard key={tour.id || tour.title} tour={tour} />
                  ))}
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-800">Tour Admin</h1>
          <p className="text-sm text-gray-500">Management Dashboard</p>
        </div>
        
        <nav className="mt-6">
          <NavItem 
            icon={<FiHome size={18} />}
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </NavItem>
          <NavItem 
            icon={<FiMap size={18} />}
            active={activeTab === "tours"}
            onClick={() => setActiveTab("tours")}
          >
            Tour Management
          </NavItem>
          <NavItem 
            icon={<FiCalendar size={18} />}
            active={activeTab === "bookings"}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings
          </NavItem>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <Logout />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {activeTab === "tours" ? "Tour Management" : 
               activeTab === "bookings" ? "Booking Management" : "Dashboard"}
            </h2>
            <p className="text-gray-600">
              {activeTab === "dashboard" ? "Overview of your tour business" : 
               activeTab === "tours" ? "Manage all available tours" : 
               "View and manage bookings"}
            </p>
          </div>
          
          {activeTab === "tours" && (
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => router.push("/admin/Page/tour/")}
            >
              <FiPlus className="mr-2" />
              Add New Tour
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
};

// Tour Card Component for Dashboard
const TourCard = ({ tour }: { tour: Tour }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    <div className="relative h-48">
      <Image
        src={tour.image_url}
        alt={tour.title}
        fill
        className="object-cover"
        unoptimized // Remove if you configure Next.js to handle external images
      />
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg text-gray-800 mb-1">{tour.title}</h3>
      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{tour.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-blue-600 font-medium">${tour.price_per_person}</span>
        <span className="text-sm text-gray-500">{tour.duration_days} day{tour.duration_days !== 1 ? 's' : ''}</span>
      </div>
    </div>
  </div>
);

// Tour Table Component
// const TourTable = ({ tours, onDelete }: { tours: Tour[], onDelete: (id: number) => void }) => (
//   <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6">
//     <div className="overflow-x-auto">

//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slots</th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {tours.map((tour) => (
//             <tr key={tour.id || tour.title} className="hover:bg-gray-50">
//               <td className="px-6 py-4">
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 h-10 w-10 mr-3">
//                     <Image
//                       src={tour.image_url}
//                       alt={tour.title}
//                       width={40}
//                       height={40}
//                       className="rounded-md object-cover"
//                       unoptimized
//                     />
//                   </div>
//                   <div>
//                     <div className="font-medium text-gray-900">{tour.title}</div>
//                     <div className="text-sm text-gray-500 line-clamp-1">{tour.description}</div>
//                   </div>
//                 </div>
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {tour.destination}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 ${tour.price_per_person}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {tour.duration_days} day{tour.duration_days !== 1 ? 's' : ''}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                 {tour.available_slots}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                 <button 
//                   className="text-blue-600 hover:text-blue-900 mr-3"
//                   onClick={() => router.push(`/admin/tours/edit/${tour.id}`)}
//                 >
//                   <FiEdit2 className="inline mr-1" /> Edit
//                 </button>
//                 <button 
//                   className="text-red-600 hover:text-red-900"
//                   onClick={() => tour.id && onDelete(tour.id)}
//                 >
//                   <FiTrash2 className="inline mr-1" /> Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
    
//     <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
//       <div className="text-sm text-gray-500">
//         Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of <span className="font-medium">{tours.length}</span> tours
//       </div>
//       <div className="flex space-x-2">
//         <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
//           Previous
//         </button>
//         <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
//           Next  
//         </button>
//       </div>
//     </div>
//   </div>
// );


type NavItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
};

// Reusable Components
const NavItem : React.FC<NavItemProps> = ({ icon, children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-left ${active ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-500' : 'text-gray-600 hover:bg-gray-50'}`}
  >
    <span className="mr-3">{icon}</span>
    <span>{children}</span>
  </button>
);

const StatCard = ({ icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-full h-12 w-12 flex items-center justify-center">
        {icon}
      </div>
    </div>
    <p className={`text-sm mt-3 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
      {change} from last week
    </p>
  </div>
);

export default Page;