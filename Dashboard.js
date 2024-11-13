
import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard!</h2>
      <div className="nav-buttons">
        <Link to="/view-rooms" className="btn">View Rooms</Link>
        <Link to="/book-room" className="btn">Book a Room</Link>
        <Link to="/my-bookings" className="btn">My Bookings</Link>
        <Link to="/profile" className="btn">Profile</Link>
      </div>
    </div>
  );
}

export default Dashboard;
