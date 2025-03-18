import axios from "axios";

const API_URL = "http://localhost:5138/api/Course";

// Function to get all courses
const getCourses = async () => {
  const token = localStorage.getItem("authtoken");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Function to enroll in a course
const enrollInCourse = async (courseId) => {
  const token = localStorage.getItem("authtoken");
  await axios.post(`${API_URL}/${courseId}/enroll`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Function to unenroll from a course
const unenrollFromCourse = async (courseId) => {
  const token = localStorage.getItem("authtoken");
  await axios.delete(`${API_URL}/${courseId}/unenroll`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};



const courseService = {
  getCourses,
  enrollInCourse,
  unenrollFromCourse,
};

export default courseService;
