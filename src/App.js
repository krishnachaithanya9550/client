// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile } from "./store/authSlice";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Courses from "./pages/Courses";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import "./style.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Enrollment from "./pages/Enrollment";

// function App() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   // Fetch user profile if logged in
//   useEffect(() => {
//     if (localStorage.getItem("authtoken")) {
//       dispatch(fetchUserProfile());
//     }
//   }, [dispatch]);

//   return (
//     <Router>
//       <Navbar />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

//           {/* Protected Routes - Only accessible when logged in */}
//           <Route
//             path="/courses"
//             element={
//               <ProtectedRoute>
//                 <Courses />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//            <Route path="/courses" element={<Courses />} />
//            <Route path="/enroll/:courseId" element={<Enrollment />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./store/authSlice";
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
// import Profile from "./pages/Profile";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
           <Route path="/course/:courseId" element={<CourseDetails />} />
           <Route path="/user/:id" element={<Profile />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enroll/:courseId"
            element={
              <ProtectedRoute>
                <Enrollment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
