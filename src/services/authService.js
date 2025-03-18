// // // services/authService.js
// // import axios from 'axios';

// // const API_URL = "http://localhost:5138/api/User";

// // export const registerUser = async (userData) => {
// //     try {
// //         const response = await axios.post(`${API_URL}/register`, userData);
// //         return response.data;
// //     } catch (error) {
// //         throw error; 
// //     }
// // };

// // export const loginUser = async (loginData) => {
// //     try {
// //         const response = await axios.post(`${API_URL}/login`, loginData);
// //             return response.data; // Typically a token or user data
// //     } catch (error) {
// //         throw error; 
// //     }
// // };


// import axios from "axios";

// const API_URL = "http://localhost:5138/api/User";

// // Register a new user
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error.message;
//   }
// };

// // Login a user
// export const loginUser = async (credentials) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, credentials);
//     localStorage.setItem("authtoken", response.data.token);
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error.message;
//   }
// };

// // Logout function
// export const logoutUser = () => {
//   localStorage.removeItem("authtoken");
// };


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

const AuthService = { register, login };
export default AuthService;
