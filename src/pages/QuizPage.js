import React from "react";
import { useNavigate } from "react-router-dom";

const QuizPage = () => {
  const quizId = localStorage.getItem("quizId");
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate(`/quiz/${quizId}/questions`);
  };

  return (
    <div  >
      <h2 style={{textAlign:"center"}}>Quiz</h2>
      <p style={{paddingLeft:"80px"}}>Get ready for the quiz! Click below to start.</p>
      <h4 style={{textAlign:"left", paddingLeft:"80px"}}>Instructions before starting Quiz</h4>
      <ul style={{textAlign:"left", paddingLeft:"110px"}}>
        <li><p>This quiz consists of only MCQ's</p></li>
        <li><p>View all questions</p></li>
        <li><p>Read the question completely and answer the questions</p></li>
      
      <button className="btn btn-success" style={{width:"200px"}} onClick={startQuiz}>
        Start Quiz
      </button>
      </ul>
    </div>
  );
};

export default QuizPage;

