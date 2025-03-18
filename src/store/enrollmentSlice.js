
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to enroll in a course
export const enrollCourse = createAsyncThunk(
  "enrollment/enrollCourse",
  async (courseId, { rejectWithValue }) => {
    courseId=localStorage.getItem("courseId");
    try {
      const token = localStorage.getItem("authtoken");
      const response = await axios.post(
        `http://localhost:5138/api/enrollment/${courseId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Enrollment failed");
    }
  }
);

// Async thunk to fetch enrolled courses
export const fetchEnrolledCourses = createAsyncThunk(
  "enrollment/fetchEnrolledCourses",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authtoken");
      const response = await axios.get("http://localhost:5138/api/enrollment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch enrollments");
    }
  }
);

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState: { enrolledCourses: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(enrollCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses.push(action.payload);
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.enrolledCourses = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default enrollmentSlice.reducer;
