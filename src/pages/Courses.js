import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, deleteCourse } from "../store/courseSlice";
import { fetchUserRole } from "../store/authSlice"; // Fetch user role
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./course.css";

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const user = useSelector((state) => state.auth.user);

  const [selectedCourse, setSelectedCourse] = useState(null); // For delete confirmation
  const [showEnrollModal, setShowEnrollModal] = useState(false); // Enroll modal state

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchUserRole()); // Fetch user role when loading courses
  }, [dispatch]);

  const handleEnroll = (courseId) => {
    if (!user) {
      setShowEnrollModal(true); // Show modal if user is not logged in
    } else {
      navigate(`/enroll/${courseId}`);
      localStorage.setItem("courseId", courseId);
    }
  };

  const handleAddCourse = () => {
    navigate("/add-course");
  };

  const confirmDelete = (courseId) => {
    setSelectedCourse(courseId);
  };

  const handleDelete = () => {
    if (selectedCourse) {
      dispatch(deleteCourse(selectedCourse));
      setSelectedCourse(null);
    }
  };

  if (loading) return <p className="text-center mt-3">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Available Courses</h2>

      {/* Show "Add Course" button only for Instructor or Admin */}
      {user && (user.role === "instructor" || user.role === "admin") && (
        <button className="btn btn-primary mb-3" onClick={handleAddCourse}>
          Add Course
        </button>
      )}

      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card course-card">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p><strong>Instructor:</strong> {course.instructorUsername}</p>
                <div className="d-flex justify-content-between">
                  <button 
                    className="btn btn-success btn-sm" 
                    onClick={() => handleEnroll(course.id)}
                  >
                    Enroll
                  </button>

                  {/* Show Delete Button only for Instructor/Admin */}
                  {user && (user.role === "instructor" || user.role === "admin") && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmDelete(course.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bootstrap Delete Confirmation Modal */}
      {selectedCourse && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedCourse(null)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this course?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedCourse(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Unauthenticated Users Trying to Enroll */}
      {showEnrollModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Authentication Required</h5>
                <button type="button" className="btn-close" onClick={() => setShowEnrollModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Please register or login to enroll in courses.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button type="button" className="btn btn-danger" onClick={() => setShowEnrollModal(false)}>
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

export default Courses;
