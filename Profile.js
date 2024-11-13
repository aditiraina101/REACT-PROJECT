// Profile.js
import React, { useState } from "react";
import "./Profile.css"; 
import { FaUser, FaEnvelope, FaPhone, FaSave, FaUpload } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "ENTER YOUR NAME ",
    email: "ENTER YOUR EMAIL",
    phone: "+1234567890",
    bio: "Travel enthusiast and adventure seeker.",
    profileImage: "/images/default-profile.jpg", 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(URL.createObjectURL(e.target.files[0]));
      setUser({ ...user, profileImage: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const validateFields = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = "Name is required.";
    if (!user.email) newErrors.email = "Email is required.";
    if (!user.phone) newErrors.phone = "Phone number is required.";
    if (user.phone && !/^\+\d{10,15}$/.test(user.phone)) newErrors.phone = "Phone number must be in international format.";
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
   

    alert("Changes saved!");
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={imageFile || user.profileImage} alt="Profile" className="profile-image" />
          {isEditing && (
            <label className="upload-button">
              <FaUpload /> Upload Image
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>
          )}
        </div>
      </div>

      <div className="profile-info">
        <div className="profile-field">
          <FaUser className="profile-icon" />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          ) : (
            <span>{user.name}</span>
          )}
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="profile-field">
          <FaEnvelope className="profile-icon" />
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Your Email"
            />
          ) : (
            <span>{user.email}</span>
          )}
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="profile-field">
          <FaPhone className="profile-icon" />
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              placeholder="Your Phone"
            />
          ) : (
            <span>{user.phone}</span>
          )}
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="profile-field">
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            placeholder="Your Bio"
            rows="4"
            disabled={!isEditing}
          />
        </div>
      </div>

      <button className="btn" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
        {isEditing ? <FaSave /> : "Edit Profile"}
      </button>
    </div>
  );
};

export default UserProfile;
