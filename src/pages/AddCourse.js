import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse, deleteCourse } from "../store/courseSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [showModal, setShowModal] = useState(false);
  const [courseIdToDelete, setCourseIdToDelete] = useState(null);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
  });

  // ✅ Redirect if the user is a Student (not allowed to add courses)
  if (user.role === "student") {
    navigate("/courses");
    return null;
  }

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      ...courseData,
      instructorId: user.id, // ✅ Automatically assign Instructor ID
    };

    dispatch(addCourse(newCourse));
    navigate("/courses");
  };

  // ✅ Handle Delete Button Click (Show Modal)
  const handleDeleteClick = (courseId) => {
    setCourseIdToDelete(courseId);
    setShowModal(true);
  };

  // ✅ Confirm Deletion
  const confirmDelete = () => {
    dispatch(deleteCourse(courseIdToDelete));
    setShowModal(false);
    navigate("/courses");
  };

  return (
    <div className="container mt-4">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{width:"200px"}}>Add Course</button>

        {/* ✅ Show "Delete" button only for Instructor/Admin */}
        {user && (user.role === "instructor" || user.role === "admin") && (
          <button type="button" className="btn btn-danger" style={{width:"200px"}} onClick={() => handleDeleteClick(courseData.id)}>
            Delete Course
          </button>
        )}
      </form>

      {/* ✅ Bootstrap Modal for Delete Confirmation */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this course?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  No
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourse;
