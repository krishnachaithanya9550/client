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
    dispatch(fetchEnrolledCourses());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <p className="text-center">No enrolled courses found.</p>
      ) : (
        <div className="row">
          {enrolledCourses.map((course, index) => (
            <div key={course.id || index} className="col-md-4 mb-4">
              <div 
                className="card course-card"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text">{course.description}</p>
                  <button className="btn btn-primary">View Course</button>
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