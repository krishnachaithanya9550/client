
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../store/courseSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./course.css"; // Importing custom styles

const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleEnroll = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  if (loading) return <p className="text-center mt-3">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Available Courses</h2>
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
