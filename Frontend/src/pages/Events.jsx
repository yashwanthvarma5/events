import React, { useEffect, useState } from "react";
import api from "../api/axios";

function EventCard({ event, onClick }) {
  return (
    <div
      className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-xl ring-2 ring-orange-700 hover:shadow-2xl transition cursor-pointer flex flex-col text-white overflow-hidden"
      onClick={onClick}
    >
      <img
        src={event.image || "https://source.unsplash.com/400x200/?event,party"}
        alt={event.title}
        className="h-60 w-full object-cover object-center"
      />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-orange-400 mb-1">
            {event.title}
          </h3>
          <p className="text-gray-300 text-sm mb-2">
            {event.club} • {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-200 text-sm line-clamp-2">
            {event.description}
          </p>
        </div>
        <div className="mt-4 flex gap-2">
          <span className="bg-orange-700 text-orange-100 px-3 py-1 rounded-xl text-xs font-semibold">
            {event.category}
          </span>
          <span className="bg-gray-700 text-gray-100 px-3 py-1 rounded-xl text-xs font-semibold">
            {event.venue}
          </span>
        </div>
      </div>
    </div>
  );
}

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ club: "", category: "", date: "" });
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get("/events").then((res) => {
      setEvents(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    });
  }, []);

  const filtered = events.filter((e) => {
    return (
      (!filter.club || e.club === filter.club) &&
      (!filter.category || e.category === filter.category) &&
      (!filter.date || new Date(e.date).toLocaleDateString() === filter.date) &&
      (e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const clubs = [...new Set(events.map((e) => e.club).filter(Boolean))];
  const categories = [...new Set(events.map((e) => e.category).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-6 text-orange-400 text-center">
          Upcoming Events
        </h2>
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <input
            type="text"
            placeholder="Search events..."
            className="px-4 py-2 border border-orange-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-orange-700 bg-gray-800 text-white rounded-lg"
            value={filter.club}
            onChange={(e) => setFilter((f) => ({ ...f, club: e.target.value }))}
          >
            <option value="">All Clubs</option>
            {clubs.map((club) => (
              <option key={club} value={club}>
                {club}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-orange-700 bg-gray-800 text-white rounded-lg"
            value={filter.category}
            onChange={(e) => setFilter((f) => ({ ...f, category: e.target.value }))}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="px-4 py-2 border border-orange-700 bg-gray-800 text-white rounded-lg"
            value={filter.date}
            onChange={(e) => setFilter((f) => ({ ...f, date: e.target.value }))}
          />
        </div>
        {loading ? (
          <div className="text-center text-lg text-gray-400">
            Loading events...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-lg text-gray-400">
            No events found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onClick={() => setSelected(event)}
              />
            ))}
          </div>
        )}
        {selected && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fadeIn border border-orange-600">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-orange-400 text-2xl"
                onClick={() => setSelected(null)}
              >
                &times;
              </button>
              <img
                src={selected.image || "https://source.unsplash.com/400x200/?event,party"}
                alt={selected.title}
                className="h-60 w-full object-cover object-center rounded mb-4"
              />
              <h3 className="text-2xl font-bold text-orange-400 mb-2">
                {selected.title}
              </h3>
              <div className="flex gap-2 mb-2">
                <span className="bg-orange-700 text-orange-100 px-2 py-1 rounded text-xs font-semibold">
                  {selected.category}
                </span>
                <span className="bg-gray-700 text-gray-100 px-2 py-1 rounded text-xs font-semibold">
                  {selected.venue}
                </span>
                <span className="bg-gray-800 text-gray-100 px-2 py-1 rounded text-xs font-semibold">
                  {selected.club}
                </span>
              </div>
              <p className="text-gray-200 mb-4">
                {selected.description}
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={selected.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
                >
                  Register
                </a>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                    selected.title
                  )}&dates=${selected.date
                    .replace(/[-:]/g, "")
                    .replace(".000Z", "")}/${selected.date
                    .replace(/[-:]/g, "")
                    .replace(".000Z", "")}&details=${encodeURIComponent(
                    selected.description
                  )}&location=${encodeURIComponent(selected.venue)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Add to Google Calendar
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
