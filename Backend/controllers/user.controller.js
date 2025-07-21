import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/mailer.js";
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpires,
    });
    await user.save();
    // Send OTP email
    try {
      await sendMail({
        to: email,
        subject: "Kreapt Signup OTP",
        text: `Hi ${name},\n\nYour OTP for Kreapt signup is: ${otp}\n\nThis OTP is valid for 10 minutes.`,
        html: `<p>Hi <b>${name}</b>,</p><p>Your OTP for Kreapt signup is: <b>${otp}</b><br/>This OTP is valid for 10 minutes.</p>`,
      });
    } catch (mailErr) {
      console.error("Failed to send OTP email:", mailErr);
    }
    res.status(201).json({
      message: "OTP sent to email. Please verify to complete signup.",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.otp !== otp || !user.otpExpires || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();
    // Send welcome email
    try {
      await sendMail({
        to: user.email,
        subject: "Welcome to Kreapt!",
        text: `Hi ${user.name},\n\nWelcome to Kreapt! Your account has been created successfully.\n\nHappy eventing!`,
        html: `<p>Hi <b>${user.name}</b>,</p><p>Welcome to <b>Kreapt</b>! Your account has been created successfully.<br/>Happy eventing!</p>`,
      });
    } catch (mailErr) {
      console.error("Failed to send welcome email:", mailErr);
    }
    res.json({ message: "Signup verified. You can now login." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
