import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    club: "",
    category: "",
    image: null,
    registrationLink: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      const token = localStorage.getItem("token");
      await api.post("/events", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Event created successfully!");
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-white to-yellow-500 p-6 flex items-center justify-center">
      <form
        className="bg-white rounded-2xl shadow-2xl shadow-orange-500 p-8 w-full max-w-lg space-y-5 dark:bg-gray-900 dark:text-gray-100"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-orange-700 mb-4 text-center dark:text-orange-200">
          Create New Event
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Event Title"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="venue"
          placeholder="Venue"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={form.venue}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="club"
          placeholder="Club Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={form.club}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="registrationLink"
          placeholder="Registration Link "
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
          value={form.registrationLink}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full px-4 py-2 border rounded-lg"
          onChange={handleChange}
        />

        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}
        {success && (
          <div className="text-green-600 text-center text-sm">{success}</div>
        )}

        <button
          type="submit"
          className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition shadow"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}

export default CreateEvent;
