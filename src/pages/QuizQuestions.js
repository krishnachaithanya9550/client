// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { Modal, Button } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const QuizQuestions = () => {
//   const { quizId } = useParams();
//   const token = localStorage.getItem("authtoken");
//   const navigate = useNavigate();
//   const courseId = localStorage.getItem("courseId");

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [submittedResponses, setSubmittedResponses] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (!quizId) {
//       setError("Quiz ID is missing.");
//       setLoading(false);
//       return;
//     }

//     const fetchQuestionsAndOptions = async () => {
//       try {
//         const questionsResponse = await axios.get(`http://localhost:5138/api/QuizQuestion`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         let filteredQuestions = questionsResponse.data.filter((q) => q.quizId === parseInt(quizId));

//         if (filteredQuestions.length === 0) {
//           throw new Error("No questions found for this quiz.");
//         }

//         const optionsResponse = await axios.get(`http://localhost:5138/api/QuizOption`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const questionsWithOptions = filteredQuestions.map((question) => ({
//           ...question,
//           options: optionsResponse.data.filter((option) => option.questionId === question.id),
//         }));

//         setQuestions(questionsWithOptions);
//       } catch (error) {
//         console.error("Error fetching questions or options:", error);
//         setError("Failed to load quiz data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestionsAndOptions();
//   }, [quizId, token]);

//   const saveResponse = async (questionId, optionId) => {
//     if (!optionId) return;
  
//     const userId = localStorage.getItem("userId"); // Fetch userId from localStorage or API
  
//     const responseData = {
//       userId: parseInt(userId),  // Ensure userId is correctly set
//       quizId: parseInt(quizId),
//       questionId: parseInt(questionId),
//       selectedOptionId: parseInt(optionId),
//     };
  
//     console.log("Submitting response:", responseData);
  
//     // Validation check
//     if (Object.values(responseData).some((value) => isNaN(value) || value === 0)) {
//       console.error("Invalid response data:", responseData);
//       return;
//     }
  
//     try {
//       const response = await axios.post("http://localhost:5138/api/QuizResponse", responseData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (response.status === 200 || response.status === 201) {
//         setSubmittedResponses((prev) => ({ ...prev, [questionId]: response.data.id }));
//       }
//     } catch (error) {
//       console.error("Error saving response:", error.response ? error.response.data : error);
//     }
//   };
  
  

//   const handleOptionChange = (questionId, optionId) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questionId]: optionId,
//     }));
//   };

//   const nextQuestion = async () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     if (selectedAnswers[currentQuestion.id]) {
//       await saveResponse(currentQuestion.id, selectedAnswers[currentQuestion.id]);
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//     }
//   };

//   const prevQuestion = async () => {
//     const currentQuestion = questions[currentQuestionIndex];
//     if (selectedAnswers[currentQuestion.id]) {
//       await saveResponse(currentQuestion.id, selectedAnswers[currentQuestion.id]);
//     }

//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
//     }
//   };

//   const submitQuiz = async () => {
//     try {
//       for (const question of questions) {
//         if (selectedAnswers[question.id]) {
//           await saveResponse(question.id, selectedAnswers[question.id]);
//         }
//       }

//     //   alert("Quiz submitted successfully!");
//       setShowModal(false);
//       navigate(`/course/${courseId}`);
//     } catch (error) {
//       console.error("Quiz submission failed:", error);
//       alert("Failed to submit quiz. Please try again.");
//     }
//   };

//   if (loading) return <p className="text-center">Loading questions...</p>;
//   if (error) return <p className="text-danger text-center">{error}</p>;
//   if (questions.length === 0) return <p className="text-center">No questions available.</p>;

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Quiz Questions</h2>

//       <div className="mb-4">
//         <h5>{currentQuestion.questionText}</h5>

//         {currentQuestion.options && currentQuestion.options.length > 0 ? (
//           currentQuestion.options.map((option) => (
//             <div key={option.id} className="form-check">
//               <input
//                 className="form-check-input"
//                 type="radio"
//                 name={`question-${currentQuestion.id}`}
//                 value={option.id}
//                 checked={selectedAnswers[currentQuestion.id] === option.id}
//                 onChange={() => handleOptionChange(currentQuestion.id, option.id)}
//               />
//               <label className="form-check-label">{option.optionText}</label>
//             </div>
//           ))
//         ) : (
//           <p className="text-danger">No options available for this question.</p>
//         )}
//       </div>

//       <div className="d-flex justify-content-between">
//         <button className="btn btn-secondary" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
//           Previous
//         </button>

//         {currentQuestionIndex === questions.length - 1 ? (
//           <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//             Submit
//           </button>
//         ) : (
//           <button className="btn btn-success" onClick={nextQuestion}>
//             Next
//           </button>
//         )}
//       </div>

//       {/* Modal for Quiz Submission */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Submission</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to submit the quiz?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={submitQuiz}>
//             Submit Quiz
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default QuizQuestions;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserIdByEmail } from "../services/authService";

const QuizQuestions = () => {
  const { quizId } = useParams();
  const token = localStorage.getItem("authtoken");
  const navigate = useNavigate();
  const courseId = localStorage.getItem("courseId");

  const [userId, setUserId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedResponses, setSubmittedResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch user ID using email
  useEffect(() => {
    const fetchUserId = async () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        const id = await getUserIdByEmail(email);
        setUserId(id);
      }
    };
    fetchUserId();
  }, []);
  console.log("user id is:", userId)

  useEffect(() => {
    if (!quizId) {
      setError("Quiz ID is missing.");
      setLoading(false);
      return;
    }

    const fetchQuestionsAndOptions = async () => {
      try {
        const questionsResponse = await axios.get(`http://localhost:5138/api/QuizQuestion`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        let filteredQuestions = questionsResponse.data.filter((q) => q.quizId === parseInt(quizId));

        if (filteredQuestions.length === 0) {
          throw new Error("No questions found for this quiz.");
        }

        const optionsResponse = await axios.get(`http://localhost:5138/api/QuizOption`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const questionsWithOptions = filteredQuestions.map((question) => ({
          ...question,
          options: optionsResponse.data.filter((option) => option.questionId === question.id),
        }));

        setQuestions(questionsWithOptions);
      } catch (error) {
        console.error("Error fetching questions or options:", error);
        setError("Failed to load quiz data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndOptions();
  }, [quizId, token]);

  const saveResponse = async (questionId, optionId) => {
    if (!optionId) {
      console.error("No option selected for question ID:", questionId);
      return;
    }

    if (!userId || isNaN(userId)) {
      console.error("Invalid user ID retrieved:", userId);
      return;
    }

    const responseData = {
      userId: parseInt(userId),
      quizId: parseInt(quizId),
      questionId: parseInt(questionId),
      selectedOptionId: parseInt(optionId),
    };

    console.log("🚀 Submitting response:", responseData);

    if (Object.values(responseData).some((value) => isNaN(value) || value === 0)) {
      console.error("❌ Invalid response data:", responseData);
      return;
    }

    try {
      if (submittedResponses[questionId]) {
        // Update existing response
        await axios.put(`http://localhost:5138/api/QuizResponse/${submittedResponses[questionId]}`, responseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create new response
        const response = await axios.post("http://localhost:5138/api/QuizResponse", responseData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200 || response.status === 201) {
          setSubmittedResponses((prev) => ({ ...prev, [questionId]: response.data.id }));
        }
      }
    } catch (error) {
      console.error("❌ Error saving response:", error.response?.data || error);

      if (error.response?.data?.errors) {
        console.error("🔍 Validation Errors:", error.response.data.errors);
      }
    }
  };

  const handleOptionChange = (questionId, optionId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const nextQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswers[currentQuestion.id]) {
      await saveResponse(currentQuestion.id, selectedAnswers[currentQuestion.id]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevQuestion = async () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswers[currentQuestion.id]) {
      await saveResponse(currentQuestion.id, selectedAnswers[currentQuestion.id]);
    }

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const submitQuiz = async () => {
    try {
      for (const question of questions) {
        if (selectedAnswers[question.id]) {
          await saveResponse(question.id, selectedAnswers[question.id]);
        }
      }

      setShowModal(false);
      navigate(`/course/${courseId}`);
    } catch (error) {
      console.error("Quiz submission failed:", error);
      alert("Failed to submit quiz. Please try again.");
    }
  };

  if (loading) return <p className="text-center">Loading questions...</p>;
  if (error) return <p className="text-danger text-center">{error}</p>;
  if (questions.length === 0) return <p className="text-center">No questions available.</p>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mt-5">
      <h2 className="text-center">Quiz Questions</h2>

      <div className="mb-4">
        <h5>{currentQuestion.questionText}</h5>

        {currentQuestion.options && currentQuestion.options.length > 0 ? (
          currentQuestion.options.map((option) => (
            <div key={option.id} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option.id}
                checked={selectedAnswers[currentQuestion.id] === option.id}
                onChange={() => handleOptionChange(currentQuestion.id, option.id)}
              />
              <label className="form-check-label">{option.optionText}</label>
            </div>
          ))
        ) : (
          <p className="text-danger">No options available for this question.</p>
        )}
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
          Previous
        </button>

        {currentQuestionIndex === questions.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Submit
          </button>
        ) : (
          <button className="btn btn-success" onClick={nextQuestion}>
            Next
          </button>
        )}
      </div>

      {/* Modal for Quiz Submission */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit the quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitQuiz}>
            Submit Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QuizQuestions;
