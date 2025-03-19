import React from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const quizId = localStorage.getItem("quizId");
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz/${quizId}/questions`);
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Quiz</h2>
      <p>Get ready for the quiz! Click below to start.</p>

      <button className="btn btn-success" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default QuizPage;

