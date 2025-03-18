// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import enrollmentService from "../services/enrollmentService";

// // Thunk for enrolling in a course
// export const enrollInCourse = createAsyncThunk(
//   "enrollment/enroll",
//   async (courseId, { rejectWithValue }) => {
//     try {
//       return await enrollmentService.enroll(courseId);
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Failed to enroll");
//     }
//   }
// );

// const enrollmentSlice = createSlice({
//   name: "enrollment",
//   initialState: { enrolledCourses: [], status: "idle", error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(enrollInCourse.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(enrollInCourse.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.enrolledCourses.push(action.payload);
//       })
//       .addCase(enrollInCourse.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export default enrollmentSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import EnrollmentService from "../services/enrollmentService";

// Async thunk to fetch enrollments
export const fetchEnrollments = createAsyncThunk(
  "enrollments/fetchEnrollments",
  async (_, { rejectWithValue }) => {
    try {
      return await EnrollmentService.fetchEnrollments();
    } catch (error) {
      return rejectWithValue(error.message || "Error fetching enrollments.");
    }
  }
);

// Async thunk to enroll in a course
export const enrollInCourse = createAsyncThunk(
  "enrollments/enrollInCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      return await EnrollmentService.enrollInCourse(courseId);
    } catch (error) {
      return rejectWithValue(error.message || "Error enrolling in course.");
    }
  }
);

// Async thunk to unenroll from a course
export const unenrollFromCourse = createAsyncThunk(
  "enrollments/unenrollFromCourse",
  async (enrollmentId, { rejectWithValue }) => {
    try {
      return await EnrollmentService.unenrollFromCourse(enrollmentId);
    } catch (error) {
      return rejectWithValue(error.message || "Error unenrolling from course.");
    }
  }
);

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState: { list: [], error: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(unenrollFromCourse.fulfilled, (state, action) => {
        state.list = state.list.filter((enrollment) => enrollment.id !== action.payload.id);
      });
  },
});

export default enrollmentSlice.reducer;
