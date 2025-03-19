// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserRole } from "./store/authSlice";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Courses from "./pages/Courses";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Enrollment from "./pages/Enrollment";
// import "bootstrap/dist/css/bootstrap.min.css";
// import CourseDetails from "./pages/CourseDetails";
// import AddCourse from "./pages/AddCourse";
// import QuizPage from "./pages/QuizPage";
// import QuizQuestions from "./pages/QuizQuestions";

// function App() {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   useEffect(() => {
//     if (localStorage.getItem("UserEmail")) {
//       dispatch(fetchUserRole()); // ✅ Fetch user role on app load
//     }
//   }, [dispatch]);

//   return (
//     <Router>
//       <Navbar />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
          
//           <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
//           <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

//           <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//           <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
//           <Route path="/course/:courseId" element={<CourseDetails />} />
//           <Route path="/user/:id" element={<Profile />} />
//           <Route path="/quiz/:courseId" element={<QuizPage />} />
//           <Route path="/quiz/:quizId" element={<QuizPage />} />
//           <Route path="/quiz/:quizId/questions" element={<QuizQuestions />} />
//           <Route path="/add-course" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
//           <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//           <Route path="/enroll/:courseId" element={<ProtectedRoute><Enrollment /></ProtectedRoute>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


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
import CourseDetails from "./pages/CourseDetails";
import AddCourse from "./pages/AddCourse";
import QuizPage from "./pages/QuizPage";
import QuizQuestions from "./pages/QuizQuestions";
import EditDetails from "./pages/EditDetails";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

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
          {/* Default Route */}
          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>

          {/* Auth Routes */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/editdetails" element={<EditDetails />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:courseId" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
          <Route path="/user/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/add-course" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
          <Route path="/enroll/:courseId" element={<ProtectedRoute><Enrollment /></ProtectedRoute>} />

          {/* Quiz Routes */}
          <Route path="/quiz/:quizId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/quiz/:quizId/questions" element={<ProtectedRoute><QuizQuestions /></ProtectedRoute>} />

         
        </Routes>
      </div>
    </Router>
  );
}

export default App;