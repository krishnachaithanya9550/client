// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute=(props)=>{
//     return(
//         props.isauthentication?<Outlet/>:<Navigate to='/'/>
        
//     )
// }
// export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
