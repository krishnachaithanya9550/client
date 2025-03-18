// import axios from "axios";

// const API_URL = "http://localhost:5138/api/Enrollments";

// const enroll = async (courseId) => {
//   const token = localStorage.getItem("authtoken");
//   const response = await axios.post(
//     `${API_URL}/enroll`,
//     { courseId },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// };

// const enrollmentService = { enroll };
// export default enrollmentService;


import axios from "axios";

const API_URL = "http://localhost:5138/api/enrollments";

// Fetch enrollments for the logged-in user
const fetchEnrollments = async () => {
  const token = localStorage.getItem("authtoken");
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch enrollments." };
  }
};

// Enroll in a course
const enrollInCourse = async (courseId) => {
  const token = localStorage.getItem("authtoken");
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.post(
      `${API_URL}/enroll`,
      { courseId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Enrollment failed." };
  }
};

// Unenroll from a course
const unenrollFromCourse = async (enrollmentId) => {
  const token = localStorage.getItem("authtoken");
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.delete(`${API_URL}/unenroll/${enrollmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Unenrollment failed." };
  }
};

const EnrollmentService = { fetchEnrollments, enrollInCourse, unenrollFromCourse };
export default EnrollmentService;
