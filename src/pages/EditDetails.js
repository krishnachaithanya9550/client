import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = location.state || {}; // Get user data from navigation

  const [formData, setFormData] = useState({
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    username: userDetails?.username || "",
    email: userDetails?.email || "",
    role: userDetails?.role || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!userDetails?.id) {
      alert("User ID is missing. Cannot update profile.");
      return;
    }

    // Clone formData and optionally add PasswordHash if required
    const updatedData = { ...formData };

    if (userDetails.passwordHash) {
      updatedData.passwordHash = userDetails.passwordHash; // Use existing hash
    } else {
      updatedData.passwordHash = ""; // Send an empty string (if backend accepts it)
    }

    try {
      const token = localStorage.getItem("authtoken"); // Retrieve authentication token
      const response = await fetch(
        `http://localhost:5138/api/User/${userDetails.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully!");
        navigate("/profile"); // Redirect to profile page
      } else {
        const errorData = await response.json();
        console.error("Error updating profile:", errorData);
        alert(`Error: ${errorData.title || "Failed to update profile"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update profile. Please try again later.");
    }
  };

  return (
    <div style={{ padding: "30px", width: "100vw", height: "100vh" }}>
      <h2>Edit Profile</h2>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          disabled
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          disabled
        />

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          disabled
        />

        <button className="btn btn-primary"
          style={{
            padding: "10px 20px",
            // background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditDetails;
