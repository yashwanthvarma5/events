import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1e1e1e] transition-colors-bg duration-500 relative overflow-hidden">
      {/* Animated Angled Gradient Stripes */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#ff9e44] via-[#ff6f3c] to-[#2e2e2e] opacity-40 rotate-12 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tr from-[#ff6f3c] via-[#ff9e44] to-[#2e2e2e] opacity-40 -rotate-12 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-[#ffb77c] via-[#ff9e44] to-[#2e2e2e] opacity-30 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl animate-spin-slow" />
      </div>
      <div className="w-full max-w-3xl bg-[#2a2a2a] bg-opacity-90 shadow-2xl rounded-3xl p-10 flex flex-col items-center relative overflow-hidden transition-colors-bg duration-500 z-10">
        {/* Logo and Tagline */}
        <div className="relative z-10 flex flex-col items-center">
          <svg
            width="90"
            height="90"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 drop-shadow-xl animate-bounce-slow"
          >
            <defs>
              <radialGradient id="kgrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff9e44" />
                <stop offset="100%" stopColor="#ff6f3c" />
              </radialGradient>
            </defs>
            <circle cx="30" cy="30" r="30" fill="url(#kgrad)" />
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="#fff"
              fontSize="2.5rem"
              fontWeight="bold"
              dy=".3em"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              EN
            </text>
          </svg>
          <h1 className="text-5xl font-extrabold mb-2 text-orange-400 drop-shadow-lg tracking-tight text-center">
            Welcome to <span className="text-orange-500">EventsNow</span>
          </h1>
          <p className="mb-2 text-xl text-gray-300 text-center max-w-2xl font-semibold tracking-wide animate-fade-in">
            The all-in-one platform for college clubs & events
          </p>
          <p className="mb-8 text-lg text-gray-400 text-center max-w-xl animate-fade-in delay-200">
            Discover, create, and join amazing college events.
            <br />
            <span className="font-semibold text-orange-400">
              For students, organizers, and everyone in between.
            </span>
          </p>
          <div className="flex gap-6 mb-8 animate-fade-in delay-300">
            <Link
              to="/signup"
              className="px-8 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-lg hover:bg-orange-600 transition-colors-bg duration-500 text-lg focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 bg-gray-700 text-white rounded-full font-semibold shadow-lg hover:bg-gray-600 transition-colors-bg duration-500 text-lg focus:outline-none focus:ring-4 focus:ring-gray-500"
            >
              Login
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-4 animate-fade-in delay-500">
            <span className="inline-flex items-center px-4 py-2 bg-[#333] text-orange-300 rounded-full text-sm font-medium shadow">
              🎉 Event Discovery
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-[#333] text-orange-300 rounded-full text-sm font-medium shadow">
              📝 Easy Registration
            </span>
            <span className="inline-flex items-center px-4 py-2 bg-[#333] text-orange-300 rounded-full text-sm font-medium shadow">
              📅 Club Management
            </span>

          </div>
        </div>
      </div>
      {/* Subtle floating shapes for extra depth */}
      <div className="pointer-events-none absolute left-10 top-1/4 w-24 h-24 bg-orange-400 opacity-30 rounded-full blur-2xl animate-float-slow z-0" />
      <div className="pointer-events-none absolute right-10 bottom-1/4 w-20 h-20 bg-orange-300 opacity-30 rounded-full blur-2xl animate-float-slow2 z-0" />
    </div>
  );
}
