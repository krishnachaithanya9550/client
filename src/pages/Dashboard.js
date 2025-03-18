import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourses } from "../store/enrollmentSlice";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./course.css"; // Import custom styles

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enrolledCourses } = useSelector((state) => state.enrollment);

  useEffect(() => {
    dispatch(fetchEnrolledCourses()); // Fetch enrolled courses on mount
  }, [dispatch]);

  // Function to store `courseId` in localStorage and navigate
  const handleViewCourse = (courseId) => {
    if (courseId) {
      // console.log("Storing courseId:", courseId); // Debugging
      localStorage.setItem("courseId", courseId); // Store courseId
      navigate(`/course/${courseId}`); // Navigate to course details
    } else {
      console.error("Error: courseId is undefined");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <p className="text-center">No enrolled courses found.</p>
      ) : (
        <div className="row">
          {enrolledCourses.map((course, index) => (
            <div key={course.courseId || course.id || index} className="col-md-4 mb-4">
              <div className="card course-card">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewCourse(course.courseId || course.id)} // Ensure correct key
                  >
                    View Course
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
