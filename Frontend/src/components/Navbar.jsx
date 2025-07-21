import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-[#1a1a1a] text-white shadow-xl sticky top-0 z-50 border-b border-orange-500">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-md">
            EV
          </span>
          <span className="text-2xl font-bold text-orange-400 tracking-wide">
            EventsNow
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex gap-4 md:gap-6 items-center">
          {/* Theme Toggle */}
          {/* <button
            onClick={() => setDarkMode((v) => !v)}
            className="p-2 rounded-full bg-[#2a2a2a] border border-gray-600 hover:bg-orange-600 transition"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1.5m0 15V21m8.485-8.485h-1.5m-15 0H3m15.364-6.364l-1.06 1.06M6.697 17.667l-1.06 1.06m12.727 0l-1.06-1.06M6.697 6.697l-1.06-1.06M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.64-7.64 6.348-9.165a.75.75 0 01.81 1.301A7.501 7.501 0 0012 19.5a7.48 7.48 0 006.114-3.09.75.75 0 01.976-.098.75.75 0 01.325.908z"/>
              </svg>
            )}
          </button> */}

          {/* Events */}
          <Link
            to="/events"
            className={`font-medium transition hover:text-orange-400 ${
              location.pathname.startsWith("/events")
                ? "text-orange-400"
                : "text-gray-300"
            }`}
          >
            Events
          </Link>

          {/* Dashboard */}
          {user && (
            <Link
              to="/dashboard"
              className={`font-medium transition hover:text-orange-400 ${
                location.pathname.startsWith("/dashboard")
                  ? "text-orange-400"
                  : "text-gray-300"
              }`}
            >
              Dashboard
            </Link>
          )}

          {/* Greeting */}
          {user && (
            <span className="text-gray-400 text-sm hidden md:inline">
              Hi, <span className="text-white">{user.name.split(" ")[0]}</span>
            </span>
          )}

          {/* Auth Buttons */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 rounded bg-orange-500 hover:bg-orange-600 text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 rounded bg-green-500 hover:bg-green-600 text-white transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}
              className="px-4 py-1 rounded bg-gray-800 hover:bg-gray-600 text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
