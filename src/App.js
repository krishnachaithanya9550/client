// import logo from './logo.svg';
// import { useState } from 'react';
// import './App.css';
// import LoginComponent from './pages/Login';
// import  { Link, Route,Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Dashboard from './pages/Dashboard'
// import ProtectedRoute from './components/ProtectedRoute';
// import Register from './pages/Register';

// function App() {
//     const [authentication,setauthentication]=useState(false);

//     const doLogin=()=>{
//         setauthentication(true);
//     }
//     const doLogout=()=>{
//       setauthentication(false);
//   }
//   return (
//     <div className="App">
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//                     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//                         <span className="navbar-toggler-icon"></span>
//                     </button>
//                     <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
//                         <Link className="navbar-brand" to="/">Nav bar</Link>
//                         {/* <Link className="nav-link" to="/LoginComponent" style={{marginRight:"30px"}}>Login</Link>
//                         <Link className="nav-link" to="/" style={{marginRight:"30px"}}>HomePage</Link>
//                         <Link className="nav-link" to="/Signup" style={{marginRight:"0px"}}>SignUp</Link> */}
//                         {authentication && (
//                         <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
//                         <li className="nav-item active">
//                             <Link className="nav-link" to="/Dashboard">Dashboard</Link>
//                         </li>
//                         {/* <li className="nav-item">
//                             <Link className="nav-link" to="/Home">Home</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/About">About</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/EmployeeList">EmployeeList</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/LoginComponent" style={{marginLeft:"800px",color:"red"}}>Logout</Link>
//                         </li> */}
//                         </ul>
//                         )}
//                         <Link className="nav-link" to="/LoginComponent" style={{marginRight:"10px"}}>Login</Link>
//                         {/* <Link className="nav-link" to="/Home" style={{marginRight:"10px"}}>HomePage</Link> */}
//                          <Link className="nav-link" to="/Register" style={{marginRight:"0px"}}>Register</Link>
//                         </div>
//                         </nav>
//             {/*  )} */}
//             <Routes>
           
//             {/* <Route path='/Home' Component={Home}></Route> */}
//             <Route path="/Register" Component={Register}></Route>
//             <Route element={<ProtectedRoute isauthentication={authentication}/>}>
//             {/* <Route path='/Dashboard' Component={Dashboard}></Route>
//             <Route path='/About' Component={About}></Route>
//             <Route path='/EmployeeList' Component={EmployeeList}></Route>
//             <Route path="/AddUser" Component={AddUser}></Route> */}
//             </Route>
//             <Route path="/Dashboard" Component={Dashboard}></Route>
//             {/* <Route path="/" Component={Default}></Route> */}
//             <Route path='/LoginComponent' element={<LoginComponent/>}/>
//             </Routes>

//     </div>
//   );
// }

// export default App;


// // App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useSelector } from "react-redux";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";

// import "./App.css";

// const App = () => {
//   const user = useSelector((state) => state.auth.user);

//   return (
//     <Router>
//       <div className="app-container">
        // <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#d3d3d3' }}>
        //   <div className="container">
        //     <Link className="navbar-brand" to="/" style={{ color: 'black' }}>ELearning</Link>
        //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //       <span className="navbar-toggler-icon"></span>
        //     </button>
        //     <div className="collapse navbar-collapse" id="navbarNav">
        //       <ul className="navbar-nav ms-auto">
        //         {!user ? (
        //           <>
        //             <li className="nav-item">
        //               <Link className="nav-link" to="/login" style={{ color: 'black' }}>Login</Link>
        //             </li>
        //             <li className="nav-item">
        //               <Link className="nav-link" to="/register" style={{ color: 'black' }}>Register</Link>
        //             </li>
        //           </>
        //         ) : (
        //           <li className="nav-item">
        //             <Link className="nav-link" to="/dashboard" style={{ color: 'black' }}>Dashboard</Link>
        //           </li>
        //         )}
        //       </ul>
        //     </div>
        //   </div>
        // </nav>

//         <div className="content container mt-4">
//           <Routes>
//             <Route path="/" element={<Navigate to="/login" />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
// App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Navbar from "./components/Navbar";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Courses from "./pages/Courses";  // Correct import
// import Profile from "./pages/Profile";
// import "./style.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

// function App() {
//   const user = useSelector((state) => state.auth.user); // Get user state from Redux

//   return (
//     <Router>
//       <Navbar />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/courses" element={<Courses />} /> {/* This route is correct */}
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./store/authSlice";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Fetch user profile if logged in
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Profile Route */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
