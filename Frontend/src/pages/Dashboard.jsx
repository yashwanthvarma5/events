import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myEvents, setMyEvents] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (user.role === "organizer") {
      api
        .get(`/events?createdBy=${user.id || user._id}`)
        .then((res) => setMyEvents(res.data))
        .finally(() => setLoading(false));
    } else {
      api
        .get(`/users/${user.id || user._id}/registrations`)
        .then((res) => setRegistered(res.data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user)
    return (
      <div className="p-8 text-center text-lg">
        Please login to view your dashboard.
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200 p-6 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-orange-700 text-center">
          Dashboard
        </h2>
        {user.role === "organizer" ? (
          <React.Fragment>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-orange-800">Your Events</h3>
              <Link
                to="/create-event"
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
              >
                + Create Event
              </Link>
            </div>
            {loading ? (
              <div className="text-center text-lg text-gray-500">
                Loading...
              </div>
            ) : myEvents.length === 0 ? (
              <div className="text-center text-lg text-gray-500">
                No events created yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {myEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-2xl shadow-2xl border p-4 flex flex-col dark:bg-gray-800 dark:text-gray-100"
                  >
                    <h4 className="text-lg font-bold text-orange-700 mb-1">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {new Date(event.date).toLocaleDateString()} • {event.venue}
                    </p>
                    <div className="flex gap-2 mt-auto">
                      <button
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-xs"
                        onClick={() => {
                          navigate("/create-event", { state: { event } });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                        onClick={async () => {
                          if (
                            window.confirm("Are you sure you want to delete this event?")
                          ) {
                            try {
                              const token = localStorage.getItem("token");
                              await api.delete(`/events/${event._id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                              });
                              setMyEvents((prev) =>
                                prev.filter((e) => e._id !== event._id)
                              );
                            } catch (err) {
                              alert("Failed to delete event");
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3 className="text-xl font-bold text-orange-800 mb-4">
              Registered Events
            </h3>
            {loading ? (
              <div className="text-center text-lg text-gray-500">
                Loading...
              </div>
            ) : registered.length === 0 ? (
              <div className="text-center text-lg text-gray-500">
                No events registered yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {registered.map((event) => (
                  <EventRegistrationCard
                    key={event._id}
                    event={event}
                    setRegistered={setRegistered}
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

function EventRegistrationCard({ event, setRegistered }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState(event.comments || []);

  const handleCommentSubmit = async () => {
    if (!comment || rating < 1 || rating > 5) {
      alert("Please enter a comment and select a rating (1-5)");
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        `/events/${event._id}/comments`,
        { comment, rating },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(res.data.comments);
      setComment("");
      setRating(0);
    } catch (err) {
      alert("Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl border p-4 flex flex-col mb-4 dark:bg-gray-800 dark:text-gray-100">
      <h4 className="text-lg font-bold text-orange-700 mb-1">{event.title}</h4>
      <p className="text-gray-600 text-sm mb-2">
        {new Date(event.date).toLocaleDateString()} • {event.venue}
      </p>
      <div className="flex gap-2 mt-auto mb-2">
        <button
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
          onClick={async () => {
            if (
              window.confirm("Are you sure you want to unregister from this event?")
            ) {
              try {
                const token = localStorage.getItem("token");
                await api.delete(`/events/${event._id}/unregister`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                setRegistered((prev) =>
                  prev.filter((e) => e._id !== event._id)
                );
              } catch (err) {
                alert("Failed to unregister from event");
              }
            }
          }}
        >
          Unregister
        </button>
      </div>
      <div className="mb-2">
        <div className="font-semibold text-sm mb-1">Comments & Ratings:</div>
        <ul className="mb-2">
          {comments && comments.length > 0 ? (
            comments.map((c, idx) => (
              <li key={idx} className="text-xs text-gray-700 mb-1">
                <span className="font-bold">{c.user?.name || "User"}:</span> {c.comment}{" "}
                <span className="text-yellow-500">{c.rating}★</span>
              </li>
            ))
          ) : (
            <li className="text-xs text-gray-400">No comments yet.</li>
          )}
        </ul>
        <textarea
          className="w-full border rounded p-1 text-xs mb-1"
          rows={2}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex items-center gap-2 mb-1">
          <label className="text-xs">Rating:</label>
          <select
            className="border rounded text-xs"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={0}>Select</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}★
              </option>
            ))}
          </select>
        </div>
        <button
          className="px-2 py-1 bg-orange-500 text-white rounded text-xs hover:bg-orange-600"
          onClick={handleCommentSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Add Comment"}
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
