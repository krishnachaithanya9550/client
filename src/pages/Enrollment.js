// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useNavigate } from "react-router-dom";
// import { enrollCourse } from "../store/enrollmentSlice";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Enrollment = () => {
//   const { courseId } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.auth.user);
  
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("creditCard");
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!user) {
//       alert("You must be logged in to enroll.");
//       navigate("/login");
//       return;
//     }

//     dispatch(enrollCourse({ courseId, userId: user.id, phoneNumber, paymentMethod }))
//       .then(() => {
//         alert("Enrolled successfully!");
//         navigate("/dashboard");
//       })
//       .catch((error) => alert("Enrollment failed!"));
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center">Course Enrollment</h2>
//       <form onSubmit={handleSubmit} className="card p-4">
//         <div className="mb-3">
//           <label className="form-label">Phone Number</label>
//           <input 
//             type="text" 
//             className="form-control" 
//             value={phoneNumber} 
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Payment Method</label>
//           <select 
//             className="form-control" 
//             value={paymentMethod} 
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           >
//             <option value="creditCard">Credit Card</option>
//             <option value="debitCard">Debit Card</option>
//             <option value="upi">UPI</option>
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary" style={{width:"200px"}}>Enroll Now</button>
//       </form>
//     </div>
//   );
// };

// export default Enrollment;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { enrollCourse } from "../store/enrollmentSlice";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Enrollment = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [modal, setModal] = useState({ show: false, message: "", success: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setModal({ show: true, message: "You must be logged in to enroll.", success: false });
      return;
    }

    dispatch(enrollCourse({ courseId, userId: user.id, phoneNumber, paymentMethod }))
      .then(() => {
        setModal({ show: true, message: "Enrolled successfully!", success: true });
      })
      .catch(() => {
        setModal({ show: true, message: "Enrollment failed!", success: false });
      });
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
        <button type="submit" className="btn btn-primary" style={{ width: "200px" }}>
          Enroll Now
        </button>
      </form>

      {/* Bootstrap Modal */}
      <Modal show={modal.show} onHide={() => setModal({ show: false, message: "", success: false })} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modal.success ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModal({ show: false, message: "", success: false })}>
            Close
          </Button>
          {modal.success && (
            <Button variant="primary" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Enrollment;
