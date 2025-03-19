import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const token = localStorage.getItem("authtoken");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5138/api/Course/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(response.data);
      } catch (error) {
        setError("Failed to load course details");
      }
    };

    const fetchProgress = async () => {
      try {
        const response = await axios.get(`http://localhost:5138/api/Enrollment/${courseId}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
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

  const updateProgress = async () => {
    setUpdateLoading(true);
    try {
      await axios.put(
        `http://localhost:5138/api/Enrollment/${courseId}/progress`,
        { progress: Math.min(progress + 10, 100) }, // Ensure max is 100%
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProgress((prev) => Math.min(prev + 10, 100));
    } catch (error) {
      alert("Failed to update progress");
    } finally {
      setUpdateLoading(false);
    }
  };

  const startQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5138/api/Quiz/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const quizId = response.data.id;
      localStorage.setItem("quizId", quizId);
      navigate(`/quiz/${quizId}`);
    } catch (error) {
      alert("Quiz not found for this course.");
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
          <p><strong>Duration:</strong> {course?.duration}8 hours</p>

          <div className="progress mb-3">
            <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}>
              {progress}%
            </div>
          </div>

          <button className="btn btn-primary me-2" onClick={updateProgress} disabled={updateLoading}>
            {updateLoading ? "Updating..." : "Update Progress"}
          </button>

          <button className="btn btn-success" onClick={startQuiz} disabled={progress < 100}>
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

