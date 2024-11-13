
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ViewRooms from "./ViewRooms"; 
import BookRoom from "./BookRoom";     
import MyBookings from "./MyBookings"; 
import Profile from "./Profile";      
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/view-rooms" element={<ViewRooms />} />
      <Route path="/book-room" element={<BookRoom />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
