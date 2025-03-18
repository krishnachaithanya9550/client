// // import React, { useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { enrollCourse } from "../store/enrollmentSlice";
// // import "bootstrap/dist/css/bootstrap.min.css";

// // const Enrollment = () => {
// //   const { courseId } = useParams();
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
  
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [paymentMethod, setPaymentMethod] = useState("");

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     dispatch(enrollCourse({ courseId, phoneNumber, paymentMethod }));
// //     alert("Enrollment Successful!");
// //     navigate("/courses");
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="text-center">Enrollment Form</h2>
// //       <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
// //         <div className="mb-3">
// //           <label className="form-label">Phone Number:</label>
// //           <input 
// //             type="text" 
// //             className="form-control"
// //             value={phoneNumber} 
// //             onChange={(e) => setPhoneNumber(e.target.value)} 
// //             required 
// //           />
// //         </div>
// //         <div className="mb-3">
// //           <label className="form-label">Payment Method:</label>
// //           <select 
// //             className="form-control"
// //             value={paymentMethod} 
// //             onChange={(e) => setPaymentMethod(e.target.value)} 
// //             required
// //           >
// //             <option value="">Select Payment Method</option>
// //             <option value="Credit Card">Credit Card</option>
// //             <option value="Debit Card">Debit Card</option>
// //             <option value="UPI">UPI</option>
// //           </select>
// //         </div>
// //         <button type="submit" className="btn btn-primary w-100">Confirm Enrollment</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Enrollment;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { enrollCourse } from "../store/enrollmentSlice";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Enrollment = () => {
//   const { courseId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { courses } = useSelector((state) => state.courses);

//   const selectedCourse = courses.find((course) => course.id === Number(courseId));

//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(enrollCourse({ 
//       courseId, 
//       courseTitle: selectedCourse?.title || "Unknown Course",
//       phoneNumber, 
//       paymentMethod 
//     }));
//     alert("Enrollment Successful!");
//     navigate("/dashboard");
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Enrollment Form</h2>
//       <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
//         <div className="mb-3">
//           <label className="form-label">Phone Number:</label>
//           <input 
//             type="text" 
//             className="form-control"
//             value={phoneNumber} 
//             onChange={(e) => setPhoneNumber(e.target.value)} 
//             required 
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Payment Method:</label>
//           <select 
//             className="form-control"
//             value={paymentMethod} 
//             onChange={(e) => setPaymentMethod(e.target.value)} 
//             required
//           >
//             <option value="">Select Payment Method</option>
//             <option value="Credit Card">Credit Card</option>
//             <option value="Debit Card">Debit Card</option>
//             <option value="UPI">UPI</option>
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary w-100">Confirm Enrollment</button>
//       </form>
//     </div>
//   );
// };

// export default Enrollment;


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { enrollCourse } from "../store/enrollmentSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const Enrollment = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to enroll.");
      navigate("/login");
      return;
    }

    dispatch(enrollCourse({ courseId, userId: user.id, phoneNumber, paymentMethod }))
      .then(() => {
        alert("Enrolled successfully!");
        navigate("/dashboard");
      })
      .catch((error) => alert("Enrollment failed!"));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Course Enrollment</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input 
            type="text" 
            className="form-control" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select 
            className="form-control" 
            value={paymentMethod} 
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Enroll Now</button>
      </form>
    </div>
  );
};

export default Enrollment;