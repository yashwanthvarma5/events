import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import api from "./api/axios";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Events from "./pages/Events";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import Home from "./pages/Home";

// Home page is now in ./pages/Home.jsx

// ...existing code...

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/events" element={<Events />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
