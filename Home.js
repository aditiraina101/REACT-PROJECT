// Home.js
import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Home() {
  return (
    <div className="home">
      <header className="header">
        <h1 className="logo">Book My Stay</h1>
        <nav>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Create an Account</Link>
        </nav>
      </header>
    </div>
  );
}

export default Home;
