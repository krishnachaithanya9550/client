import axios from "axios";

const API_URL = "http://localhost:5138/api/Quiz";

const getQuizzes = async (courseId) => {
  const token = localStorage.getItem("authtoken");
  const response = await axios.get(`${API_URL}/course/${courseId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const quizService = { getQuizzes };
export default quizService;
