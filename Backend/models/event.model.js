import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    date: { type: Date, required: true },
    venue: String,
    club: String,
    category: String,
    image: String,
    registrationLink: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isPast: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);