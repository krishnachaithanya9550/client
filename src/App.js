import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRole } from "./store/authSlice";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Enrollment from "./pages/Enrollment";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseDetails from "./pages/CourseDetails";
import AddCourse from "./pages/AddCourse";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (localStorage.getItem("UserEmail")) {
      dispatch(fetchUserRole()); // ✅ Fetch user role on app load
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/add-course" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/enroll/:courseId" element={<ProtectedRoute><Enrollment /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
