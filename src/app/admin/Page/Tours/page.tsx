"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Data {
  tour_id: number;
  id: number;
  title: string;
  description: string;
  destination: string;
  duration_days: number;
  price_per_person: number;
  available_slots: number;
  image_url: string;
}
const Tours = () => {
  const [Data, setData] = useState<Data[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    destination: "",
    duration_days: 0,
    price_per_person: 0,
    available_slots: 0,
    image_url: "",
  });

  const [editingId, setEditingId] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : "";

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No token found. Please log in.");
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/admin/tours", {
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
          setError("Failed to fetch tours");
        }
        return;
      }

      const data = await res.json();
      setData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  // ✅ CREATE Tour
  const createTour = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/admin/tours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.log("❌ Error creating tour:", errorData);
        alert("Create failed: " + (errorData.message || "Unknown error"));
        return;
      }
      setForm({
        title: "",
        description: "",
        destination: "",
        duration_days: 0,
        price_per_person: 0,
        available_slots: 0,
        image_url: "",
      });

      fetchTours();
      alert("✅ Tour created successfully!");
    } catch (err) {
      console.error("Create tour error:", err);
      alert("Something went wrong while creating the tour.");
    }
  };

  // ✅ UPDATE Tour
  const updateTour = async (tour: Data) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/admin/tours/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        console.log("❌ Error updated tour:", errorData);
        alert("update failed: " + (errorData.message || "Unknown error"));
        return;
      }
      setForm({
        title: "",
        description: "",
        destination: "",
        duration_days: 0,
        price_per_person: 0,
        available_slots: 0,
        image_url: "",
      });
      setEditingId(null);
      fetchTours();
      alert("✅ Tour updated successfully!");
    } catch (err) {
      console.error("Error updated tour:", err);
      alert("Something went wrong while updated the tour.");
    }
  };

  // ✅ DELETE Tour
  // const deleteTour = async (id: number) => {
  //   try {
  //     console.log("🧹 Deleting tour ID:", id);
  //     console.log("🛡️ Using token:", token);

  //     const res = await fetch(`http://localhost:8000/api/admin/tours/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         // "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!res.ok) {
  //       const data = await res.json();
  //       console.log("❌ Error delelte tour:", data);
  //       alert("delete failed: " + (data.message || "Unknown error"));
  //       return;
  //     }
  //     fetchTours();
  //     alert("✅ Tour delete  successfully!");
  //   } catch (err: any) {
  //     console.error("Error deleting tour:", err);
  //     alert("Something went wrong while Delete the tour.");
  //   }
  // };

  const deleteTour = async (id: number) => {
    try {
      console.log("🧹 Deleting tour ID:", id);
      console.log("🛡️ Using token:", token);

      const res = await fetch(`http://localhost:8000/api/admin/tours/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this tour?"
      );
      if (!confirmDelete) return;
      if (!res.ok) {
        const data = await res.json(); // Get backend error message
        console.error("❌ Backend error during delete:", data);
        alert("Delete failed: " + (data.message || "Unknown error"));
        return;
      }

      alert("✅ Tour deleted successfully!");
      setData(prevTours => prevTours.filter(tour => tour.tour_id !== id)); // <<<< FIXED
      fetchTours(); // Reload tours
    } catch (err: any) {
      console.error("🔥 Fetch or network error:", err.message || err);
      alert("Something went wrong while deleting the tour.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Admin Tour Management</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {Data.length === 0 && !error ? (
            <p>Loading tours...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Data.map((tour) => (
                <div
                  key={tour.id}
                  className="border p-4 rounded-lg shadow-sm bg-gray-50"
                >
                  <h2 className="text-xl font-semibold">{tour.title}</h2>
                  <p className="text-gray-700">{tour.description}</p>
                  <p className="text-blue-600 font-medium mt-2">
                    ${tour.price_per_person}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div> */}

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Admin Tour Management</h1>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              name="title"
              placeholder="Title"
              value={form.title || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              name="destination"
              placeholder="Destination"
              value={form.destination || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              name="duration_days"
              placeholder="Duration (days)"
              type="number"
              value={form.duration_days || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              name="price_per_person"
              placeholder="Price per person"
              type="number"
              value={form.price_per_person || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              name="available_slots"
              placeholder="Available slots"
              type="number"
              value={form.available_slots || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <input
              name="image_url"
              placeholder="Image URL"
              value={form.image_url || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description || ""}
              onChange={handleChange}
              className="p-2 border rounded col-span-2"
            />

            {/* {editingId ? (
              <button
                onClick={updateTour}
                className="bg-yellow-500 text-white py-2 rounded col-span-2"
              >
                Update Tour
              </button>
            ) : (
              <button
                onClick={createTour}
                className="bg-green-500 text-white py-2 rounded col-span-2 z-10"
              >
                Create Tour
              </button>
            )} */}

            <button
              onClick={createTour}
              className="bg-green-500 text-white py-2 rounded col-span-2 z-10"
            >
              Create Tour
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Data.map((tour) => (
              <div
                key={tour.tour_id}
                className="border p-4 rounded-lg shadow-sm bg-gray-50"
              >
                <h2 className="text-xl font-semibold">{tour.title}</h2>
                <p className="text-gray-700">{tour.description}</p>
                <p className="text-blue-600 font-medium mt-2">
                  ${tour.price_per_person}
                </p>
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => {
                      
                    }} ///change something
                    className="text-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTour(tour.id)}
                    className="text-red-600  py-2 rounded col-span-2 z-10 "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tours;
//let fix this error with crud opearation  delete and update
