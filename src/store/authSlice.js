import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/authService";
import axios from "axios";

// ✅ Async thunk for login
export const loginUser = createAsyncThunk("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    const userData = await AuthService.login(loginData);
    localStorage.setItem("authtoken", userData.token); // ✅ Store token
    localStorage.setItem("UserEmail", loginData.email); // ✅ Store email for fetching role
    return userData;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed");
  }
});

// ✅ Async thunk for registration
export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    return await AuthService.register(userData);
  } catch (error) {
    return rejectWithValue(error.response?.data || "Registration failed");
  }
});

// ✅ Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem("authtoken");
  if (!token) {
    return rejectWithValue("No token found");
  }

  try {
    const response = await axios.get("http://localhost:5138/api/User", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch user data");
  }
});

// ✅ Async thunk to fetch user role using stored email
export const fetchUserRole = createAsyncThunk("auth/fetchUserRole", async (_, { rejectWithValue }) => {
  const userEmail = localStorage.getItem("UserEmail"); // ✅ Get stored email
  if (!userEmail) {
    return rejectWithValue("No email found in local storage");
  }

  try {
    const response = await axios.get(`http://localhost:5138/api/User/email/${userEmail}`); // ✅ Fetch user by email
    return response.data; // ✅ Return user data with role
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch user role");
  }
});

// ✅ Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, error: null },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("authtoken");
      localStorage.removeItem("UserEmail"); // ✅ Remove stored email on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.user = action.payload; // ✅ Store fetched user data (includes role)
      })
      .addCase(fetchUserRole.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
