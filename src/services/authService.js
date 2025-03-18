
// services/AuthServices.js
import axios from "axios";

const API_URL = "http://localhost:5138/api/User";

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed. Try again." };
  }
};

const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    localStorage.setItem("authtoken", response.data.token); // Store token
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed. Check credentials." };
  }
};

export const getUserIdByEmail = async (email) => {
  try {
    const response = await axios.get(`http://localhost:5138/api/User/email/${email}`);
    if(response)
        console.log(response.data.id);
      else{
        console.log("responses are not there")
      }
    return response.data.id; // Extract user ID from API response
  } catch (error) {
    console.error("Failed to fetch user ID:", error);
    return null;
  }
};

const AuthService = { register, login };
export default AuthService;
