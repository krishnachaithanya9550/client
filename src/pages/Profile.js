import React, { useEffect, useState } from "react";
import { getUserIdByEmail } from "../services/authService";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = localStorage.getItem("userEmail"); // Retrieve stored email
      if (email) {
        const id = await getUserIdByEmail(email);
        setUserId(id); // Store retrieved ID

        if (id) {
          const response = await fetch(`http://localhost:5138/api/User/${id}`);
          const data = await response.json();
          setUserDetails(data); // Store user details
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <h2>My Profile Page</h2>
      {userDetails ? (
        <div>
          <p><strong>Platform ID:</strong> {userDetails.id}</p>
          <p><strong>UserName:</strong> {userDetails.username}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;
