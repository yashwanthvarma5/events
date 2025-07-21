import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setOtpSent(false);
    try {
      await api.post("/users/signup", { name, email, password, role });
      setOtpSent(true);
      setSuccess("OTP sent to your email. Please verify to complete signup.");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setError("");
    setSuccess("");
    try {
      await api.post("/users/verify-signup-otp", { email, otp });
      setSuccess("Signup complete! You can now login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
      <div className="bg-[#1a1a1a] shadow-2xl rounded-3xl p-0 w-full max-w-2xl flex flex-col md:flex-row overflow-hidden text-white">
        {/* Left: Brand */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-400 p-10 w-1/2">
          <div className="flex flex-col items-center">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="30" cy="30" r="30" fill="#EA580C" />
              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                fill="#fff"
                fontSize="2rem"
                fontWeight="bold"
                dy=".3em"
              >
                EV
              </text>
            </svg>
            <span className="text-white text-2xl font-bold mt-4 tracking-wide">
              EventsNow
            </span>
            <span className="text-orange-100 text-sm mt-2 text-center">
              Create & join college events with ease
            </span>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-6 text-orange-400 text-center tracking-tight">
            Sign Up for EventsNow
          </h2>
          {!otpSent ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3 border border-gray-700 bg-[#0f0f0f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-gray-700 bg-[#0f0f0f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-700 bg-[#0f0f0f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 text-lg"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.36 2.64A9.97 9.97 0 0021 12c0-5-4-9-9-9S3 7 3 12c0 1.61.38 3.13 1.06 4.47" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.36 2.64A9.97 9.97 0 0021 12c0-5-4-9-9-9S3 7 3 12c0 1.61.38 3.13 1.06 4.47" />
                    </svg>
                  )}
                </button>
              </div>
              <select
                className="w-full px-4 py-3 border border-gray-700 bg-[#0f0f0f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="organizer">Club Organizer</option>
              </select>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              {success && <div className="text-orange-400 text-sm text-center">{success}</div>}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-lg"
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <input
                type="text"
                placeholder="Enter OTP sent to your email"
                className="w-full px-4 py-3 border border-gray-700 bg-[#0f0f0f] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                autoFocus
              />
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              {success && <div className="text-orange-400 text-sm text-center">{success}</div>}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-lg"
                disabled={verifying}
              >
                {verifying ? "Verifying..." : "Verify OTP & Complete Signup"}
              </button>
            </form>
          )}
          <div className="text-center mt-4 text-sm">
            Already have an account? {" "}
            <Link to="/login" className="text-orange-400 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
