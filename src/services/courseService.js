import axios from "axios";

const API_URL = "http://localhost:5138/api/Courses";

const getCourses = async () => {
  const token = localStorage.getItem("authtoken");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const courseService = { getCourses };
export default courseService;
