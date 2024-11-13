// // Signup.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./App.css";

// function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     console.log("Signed up with:", email);

//     // Redirect to Login after signup
//     navigate("/login");
//   };

//   return (
//     <div className="form-container">
//       <h2>Create an Account</h2>
//       <form onSubmit={handleSignup}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;
// Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !phone || !address || !bio || !password) {
      alert("All fields are required!");
      return;
    }

    // Prepare user data
    const newUser = { username, email, phone, address, bio, password };

    // Save user data to JSON server
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Optionally, you could get the newly created user data
      const data = await response.json();
      console.log("User created:", data);

      // Redirect to Login after signup
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
