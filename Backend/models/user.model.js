import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "organizer", "admin"],
      default: "student",
    },
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    otp: { type: String },
    otpExpires: { type: Date },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
