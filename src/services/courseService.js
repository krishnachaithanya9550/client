import axios from "axios";

const API_URL = "http://localhost:5138/api/Course";

//  Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authtoken");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Get all courses
const getCourses = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error.response?.data || error.message);
    throw error.response?.data || "Failed to fetch courses";
  }
};

//  Enroll in a course
const enrollInCourse = async (courseId) => {
  try {
    await axios.post(`${API_URL}/${courseId}/enroll`, {}, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error enrolling in course:", error.response?.data || error.message);
    throw error.response?.data || "Failed to enroll in course";
  }
};

//  Unenroll from a course
const unenrollFromCourse = async (courseId) => {
  try {
    await axios.delete(`${API_URL}/${courseId}/unenroll`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error unenrolling from course:", error.response?.data || error.message);
    throw error.response?.data || "Failed to unenroll from course";
  }
};

//  Add a new course
const addCourse = async (courseData) => {
  try {
    const response = await axios.post(API_URL, courseData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error.response?.data || error.message);
    throw error.response?.data || "Failed to add course";
  }
};

//  Delete a course
const deleteCourse = async (courseId) => {
  try {
    await axios.delete(`${API_URL}/${courseId}`, {
      headers: getAuthHeaders(),
    });
  } catch (error) {
    console.error("Error deleting course:", error.response?.data || error.message);
    throw error.response?.data || "Failed to delete course";
  }
};

//  Export course service functions
const courseService = {
  getCourses,
  enrollInCourse,
  unenrollFromCourse,
  addCourse, 
  deleteCourse, // Added deleteCourse function
};

export default courseService;
