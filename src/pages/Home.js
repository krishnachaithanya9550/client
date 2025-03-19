import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  // Handle Enroll button click
  const handleEnrollClick = () => {
    if (!user) {
      setModalMessage("Please login or register to enroll in courses.");
      setShowModal(true);
    } else {
      navigate("/courses");
    }
  };

  // Handle Take Quiz button click
  const handleQuizClick = () => {
    if (!user) {
      setModalMessage("Please login or register to take quizzes.");
    } else {
      setModalMessage("Go to your Dashboard to view courses and take your quiz.");
    }
    setShowModal(true);
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold text-primary">Welcome to E-Learning Platform</h1>
      <p className="lead text-muted">
        Learn at your own pace with our interactive and engaging courses.
      </p>

      <div className="row mt-5">
        {/* Browse Courses */}
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h3 className="text-primary">📚 Browse Courses</h3>
            <p>Explore a wide range of courses and enhance your skills.</p>
            <Link to="/courses" className="btn btn-outline-primary">
              Explore Now
            </Link>
          </div>
        </div>

        {/* Take Quiz */}
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h3 className="text-success">📝 Take Quizzes</h3>
            <p>Test your knowledge with interactive quizzes.</p>
            <button onClick={handleQuizClick} className="btn btn-outline-success">
              Take Quiz
            </button>
          </div>
        </div>

        {/* Enroll in Course */}
        <div className="col-md-4">
          <div className="card shadow p-3">
            <h3 className="text-danger">🎓 Enroll in Courses</h3>
            <p>Join a course and start learning today.</p>
            <button onClick={handleEnrollClick} className="btn btn-outline-danger">
              Enroll Now
            </button>
          </div>
        </div>
      </div>

      {/* Login/Register Buttons */}
      {!user && (
        <div className="mt-4">
          <Link to="/register" className="btn btn-primary me-2">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Attention</h5>
                <button
                  type="button"
                  className="btn-close btn-sm"
                  aria-label="Close"
                  style={{ fontSize: "12px", color: "red", marginLeft: "auto" }}
                  onClick={() => setShowModal(false)}
                >
                  ✖
                </button>
              </div>
              <div className="modal-body">
                <p>{modalMessage}</p>
              </div>
              <div className="modal-footer">
                {!user ? (
                  <>
                    <Link to="/login" className="btn btn-primary" onClick={() => setShowModal(false)}>
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Register
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard" className="btn btn-primary" onClick={() => setShowModal(false)}>
                    Go to Dashboard
                  </Link>
                )}
                <button type="button" className="btn btn-danger" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
