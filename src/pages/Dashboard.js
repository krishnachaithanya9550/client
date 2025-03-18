const Dashboard=()=>{
    return(
        <div>
            <h1>welcome to dashboard</h1>
        </div>
    )
}
export default Dashboard;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProfile } from "../store/authSlice";
// import { fetchCourses } from "../store/courseSlice";
// import { fetchEnrollments } from "../store/enrollmentSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);
//   const courses = useSelector((state) => state.courses.list);
//   const enrollments = useSelector((state) => state.enrollments.list);

//   useEffect(() => {
//     dispatch(fetchUserProfile());
//     dispatch(fetchCourses());
//     dispatch(fetchEnrollments());
//   }, [dispatch]);

//   return (
//     <div className="dashboard-container">
//       <h2>Welcome, {user?.first_name}!</h2>
      
//       <section>
//         <h3>Your Courses</h3>
//         {enrollments.length > 0 ? (
//           <ul>
//             {enrollments.map((enrollment) => {
//               const course = courses.find(c => c.id === enrollment.courseId);
//               return <li key={enrollment.id}>{course?.title || "Unknown Course"}</li>;
//             })}
//           </ul>
//         ) : (
//           <p>No enrolled courses.</p>
//         )}
//       </section>

//       <section>
//         <h3>Profile Details</h3>
//         <p><strong>Username:</strong> {user?.username}</p>
//         <p><strong>Email:</strong> {user?.email}</p>
//         <p><strong>Role:</strong> {user?.role}</p>
//       </section>
//     </div>
//   );
// };

// export default Dashboard;
