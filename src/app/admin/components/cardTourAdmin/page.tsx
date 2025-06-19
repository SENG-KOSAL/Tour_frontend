"use client";
import React, { useEffect, useState } from "react";
import { fetchAdminTours, deleteAdminTour, updateAdminTour } from "@/app/lib/api";
import { FiX, FiSave, FiEdit2, FiTrash2, FiCalendar, FiUsers, FiDollarSign, FiMapPin, FiImage } from "react-icons/fi";

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

const AdminTourCards = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const loadTours = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminTours();
      setTours(data);
    } catch (error) {
      console.error("Failed to fetch tours", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!form.description.trim()) errors.description = "Description is required";
    if (!form.destination.trim()) errors.destination = "Destination is required";
    if (!form.duration_days || isNaN(Number(form.duration_days))) errors.duration_days = "Valid duration required";
    if (!form.price_per_person || isNaN(Number(form.price_per_person))) errors.price_per_person = "Valid price required";
    if (!form.available_slots || isNaN(Number(form.available_slots))) errors.available_slots = "Valid slots number required";
    if (!form.image_url.trim()) errors.image_url = "Image URL is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!editingId) return;

    try {
      const updatedTour = {
        ...form,
        duration_days: Number(form.duration_days),
        price_per_person: Number(form.price_per_person),
        available_slots: Number(form.available_slots),
      };

      await updateAdminTour(editingId, updatedTour);
      alert("✅ Tour updated successfully");
      loadTours();
      resetForm();
    } catch (err) {
      console.error("Update failed", err);
      alert("❌ Failed to update tour");
    }
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
    setFormErrors({});
  };

  useEffect(() => {
    loadTours();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this tour?");
    if (!confirmed) return;

    try {
      await deleteAdminTour(id);
      alert("✅ Tour deleted successfully");
      setTours((prev) => prev.filter((t) => t.tour_id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("❌ Failed to delete tour");
    }
  };

  const handleEdit = (tour: Tour) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : (
        <div className="grid gap-8">
          {tours.map((tour) => (
            <div key={tour.tour_id} className="relative">
              {editingId === tour.tour_id ? (
                <form 
                  onSubmit={handleSubmit}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Edit Tour</h2>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tour Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            formErrors.title ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {formErrors.title && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.title}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={form.description}
                          onChange={handleChange}
                          rows={4}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            formErrors.description ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {formErrors.description && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Destination *
                        </label>
                        <input
                          type="text"
                          name="destination"
                          value={form.destination}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            formErrors.destination ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {formErrors.destination && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.destination}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration (days) *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiCalendar className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            name="duration_days"
                            value={form.duration_days}
                            onChange={handleChange}
                            min="1"
                            className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              formErrors.duration_days ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {formErrors.duration_days && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.duration_days}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price per person ($) *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiDollarSign className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            name="price_per_person"
                            value={form.price_per_person}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              formErrors.price_per_person ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {formErrors.price_per_person && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.price_per_person}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Available slots *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiUsers className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            name="available_slots"
                            value={form.available_slots}
                            onChange={handleChange}
                            min="1"
                            className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              formErrors.available_slots ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {formErrors.available_slots && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.available_slots}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiImage className="text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="image_url"
                            value={form.image_url}
                            onChange={handleChange}
                            className={`w-full pl-10 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              formErrors.image_url ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        {formErrors.image_url && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.image_url}</p>
                        )}
                        {form.image_url && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
                            <img 
                              src={form.image_url} 
                              alt="Preview" 
                              className="h-70 w-full object-cover rounded border"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                    >
                      <FiSave className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-white p-5 rounded-xl shadow-md border hover:shadow-lg transition-all group">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative overflow-hidden rounded-lg md:w-72 h-48 flex-shrink-0">
                      <img
                        src={tour.image_url}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <span className="text-white font-semibold text-lg">
                          {tour.destination}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-bold">{tour.title}</h2>
                        <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          ${tour.price_per_person}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-2">{tour.description}</p>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                        <div className="flex items-center gap-2">
                          <span className="bg-gray-100 p-2 rounded-full">
                            <FiCalendar className="inline" />
                          </span>
                          {tour.duration_days} days
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-gray-100 p-2 rounded-full">
                            <FiUsers className="inline" />
                          </span>
                          {tour.available_slots} slots
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <button
                          onClick={() => handleEdit(tour)}
                          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition-all flex items-center"
                        >
                          <FiEdit2 className="mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(tour.tour_id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition-all flex items-center"
                        >
                          <FiTrash2 className="mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminTourCards;