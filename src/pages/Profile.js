import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import { getUserIdByEmail } from "../services/authService";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUserDetails = async () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        const id = await getUserIdByEmail(email);
        setUserId(id);

        if (id) {
          const response = await fetch(`http://localhost:5138/api/User/${id}`);
          const data = await response.json();
          setUserDetails(data);
        }
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div style={{ padding: "30px", width: "100vw", height: "100vh" }}>
      <h2>My Profile Page</h2>
      <button className="btn btn-primary"
        style={{
          position: "absolute",
          top: "80px",
          right: "30px",
          width:"120px",
          padding: "10px 10px ",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
        onClick={() => navigate("/editdetails", { state: { userDetails } })}
      >
        Edit Details
      </button>
      {userDetails ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <tbody>
            <tr>
              <td><strong>Platform ID:</strong></td>
              <td>{userDetails.id}</td>
            </tr>
            <tr>
              <td><strong>Username:</strong></td>
              <td>{userDetails.username}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{userDetails.email}</td>
            </tr>
            <tr>
              <td><strong>Role:</strong></td>
              <td>{userDetails.role}</td>
            </tr>
            <tr>
              <td><strong>First Name:</strong></td>
              <td>{userDetails.firstName || "N/A"}</td>
            </tr>
            <tr>
              <td><strong>Last Name:</strong></td>
              <td>{userDetails.lastName || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default Profile;
