import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "../services/courseService";

// Async thunk to fetch courses
export const fetchCourses = createAsyncThunk("courses/fetchAll", async (_, thunkAPI) => {
  try {
    return await courseService.getCourses();
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch courses");
  }
});

// Async thunk to enroll in a course
export const enrollCourse = createAsyncThunk("courses/enroll", async (courseId, thunkAPI) => {
  try {
    await courseService.enrollInCourse(courseId);
    return courseId;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to enroll");
  }
});

// Async thunk to unenroll from a course
export const unenrollCourse = createAsyncThunk("courses/unenroll", async (courseId, thunkAPI) => {
  try {
    await courseService.unenrollFromCourse(courseId);
    return courseId;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to unenroll");
  }
});

// Course slice
const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((course) =>
          course.id === action.payload ? { ...course, enrolled: true } : course
        );
      })
      .addCase(unenrollCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((course) =>
          course.id === action.payload ? { ...course, enrolled: false } : course
        );
      });
  },
});

export default courseSlice.reducer;
