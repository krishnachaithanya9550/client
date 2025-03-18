import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5138/api/Course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourse(response.data);
      } catch (error) {
        setError("Failed to load course details");
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5138/api/Enrollment/${courseId}/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProgress(response.data.progress);
      } catch (error) {
        setError("Failed to load progress");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
    fetchProgress();
  }, [courseId, token]);

  // Update Progress
  const updateProgress = async () => {
    setUpdateLoading(true);
    try {
      await axios.put(
        `http://localhost:5138/api/Enrollment/${courseId}/progress`,
        { progress: progress + 10 }, // Increment progress by 10% (Modify as needed)
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProgress((prev) => Math.min(prev + 10, 100)); // Ensure max progress is 100%
    } catch (error) {
      alert("Failed to update progress");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-3">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-3">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{course?.title}</h2>
          <p className="card-text">{course?.description}</p>
          <p><strong>Instructor:</strong> {course?.instructorUsername}</p>
          <p><strong>Duration:</strong> {course?.duration} hours</p>

          {/*  Show Course Progress */}
          <div className="progress mb-3">
            <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>

          {/*  Update Progress Button */}
          <button className="btn btn-success" onClick={updateProgress} disabled={updateLoading}>
            {updateLoading ? "Updating..." : "Update Progress"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
