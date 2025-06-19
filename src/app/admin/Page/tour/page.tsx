"use client";
import React, { useEffect, useState } from "react";
import {
  fetchAdminTours,
  deleteAdminTour,
  createAdminTour,
  updateAdminTour,
} from "@/app/lib/api";
interface Tour {
  tour_id: number;

  title: string;
  description: string;
  destination: string;
  duration_days: number;
  price_per_person: number;
  available_slots: number;
  image_url: string;
}
const Page = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    destination: "",
    duration_days: "",
    price_per_person: "",
    available_slots: "",
    image_url: "",
  });
  const loadTours = async () => {
    try {
      const data = await fetchAdminTours();
      setTours(data);
      // alert("✅ Tour fetch successfully!");
    } catch (error) {
      console.error("Failed to fetch tours", error);
    }
  };
  useEffect(() => {
    loadTours();
  }, []);

  const handleDeleteTour = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour?"
    );
    if (!confirmDelete) {
      return; // User canceled
    }
    try {
      await deleteAdminTour(id);
      alert("✅ Tour deleted successfully!");
      setTours((prevTours) => prevTours.filter((tour) => tour.tour_id !== id)); // <<<< FIXED
      loadTours();
    } catch (error: any) {
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("General error:", error.message);
      }
      alert("❌ Failed to delete tour!");
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const tourData = {
      ...form,
      duration_days: Number(form.duration_days),
      price_per_person: Number(form.price_per_person),
      available_slots: Number(form.available_slots),
    };

    try {
      if (editingId !== null) {
        // If editingId is set, update the tour
        await updateAdminTour(editingId, tourData);
        alert("✅ Tour updated successfully!");
      } else {
        // If no editingId, create a new tour
        await createAdminTour(tourData);
        alert("✅ Tour created successfully!");
      }

      setForm({
        title: "",
        description: "",
        destination: "",
        duration_days: "",
        price_per_person: "",
        available_slots: "",
        image_url: "",
      });
      setEditingId(null);
      loadTours(); // reload the list
    } catch (error) {
      console.error(error);
      alert("❌ Failed to create tour.");
    }
  };

  // const handleUpdateTour = async (id: number) => {
  //   try {
  //     await updateAdminTour(id, {
  //       ...form,
  //       duration_days: Number(form.duration_days),
  //       price_per_person: Number(form.price_per_person),
  //       available_slots: Number(form.available_slots),
  //     });
  //     alert("✅ Tour updated successfully!");
  //     loadTours();
  //   } catch (error) {
  //     console.error("Update failed:", error);
  //     alert("❌ Failed to update tour.");
  //   }
  // };

  // const handleUpdate = async () => {
  //   if (editingId === null) return;
  //   try {
  //     await updateAdminTour(editingId, {
  //       ...form,
  //       duration_days: Number(form.duration_days),
  //       price_per_person: Number(form.price_per_person),
  //       available_slots: Number(form.available_slots),
  //     });
  //     alert('✅ Tour updated successfully!');
  //     setEditingId(null);
  //     setForm({
  //       title: '',
  //       description: '',
  //       destination: '',
  //       duration_days: '',
  //       price_per_person: '',
  //       available_slots: '',
  //       image_url: '',
  //     });
  //     loadTours();
  //   } catch (error) {
  //     console.error('Failed to update tour', error);
  //     alert('❌ Failed to update tour.');
  //   }
  // };

  const handleEditClick = (tour: Tour) => {
    setEditingId(tour.tour_id);
    setForm({
      title: tour.title,
      description: tour.description,
      destination: tour.destination,
      duration_days: String(tour.duration_days),
      price_per_person: String(tour.price_per_person),
      available_slots: String(tour.available_slots),
      image_url: tour.image_url,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      destination: "",
      duration_days: "",
      price_per_person: "",
      available_slots: "",
      image_url: "",
    });
    setEditingId(null);
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with gradient */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Admin Tour Manager
          </h1>
          <p className="text-gray-500">
            Manage your travel experiences with ease
          </p>
        </div>

        {/* FORM - Card with subtle glow */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mb-10 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            {editingId ? (
              <>
                <span className="text-yellow-500">✏️</span>
                <span>Update Tour</span>
              </>
            ) : (
              <>
                <span className="text-blue-500">➕</span>
                <span>Create New Tour</span>
              </>
            )}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {Object.keys(form).map((key) => (
              <div key={key} className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  {key.replaceAll("_", " ").toUpperCase()}
                </label>
                <input
                  name={key}
                  value={(form as any)[key]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            ))}

            <div className="md:col-span-2 flex gap-3 pt-3">
              <button
                type="submit"
                className={`px-6 py-3 rounded-lg text-white font-medium transition-all transform hover:scale-105 ${
                  editingId
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:shadow-lg"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg"
                }`}
              >
                {editingId ? "Update Tour" : "Create Tour"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TOUR LIST - Grid layout */}
        <div className="grid gap-8">
          {tours.map((tour) => (
            <div
              key={tour.tour_id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all overflow-hidden group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative overflow-hidden rounded-lg md:w-72 h-48 flex-shrink-0">
                  <img
                    src={tour.image_url}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-white font-bold text-lg">
                      {tour.destination}
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {tour.title}
                      </h2>
                      <p className="text-gray-600 mt-2">{tour.description}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                      ${tour.price_per_person}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="bg-gray-100 p-2 rounded-full">📅</span>
                      <span>{tour.duration_days} days</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="bg-gray-100 p-2 rounded-full">🧍</span>
                      <span>{tour.available_slots} slots</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => handleEditClick(tour)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTour(tour.tour_id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
