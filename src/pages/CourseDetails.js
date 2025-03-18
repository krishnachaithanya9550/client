import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5138/api/Course/3`)
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load course details");
        setLoading(false);
      });
  }, [courseId]);

  if (loading) return <p className="text-center mt-3">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{course.title}</h2>
          <p className="card-text">{course.description}</p>
          <p><strong>Instructor:</strong> {course.instructorUsername}</p>
          <p><strong>Duration:</strong> {course.duration} 8 hours</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
