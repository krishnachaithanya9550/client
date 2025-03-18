// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import courseService from "../services/courseService";

// // ✅ Fetch all courses
// export const fetchCourses = createAsyncThunk(
//   "courses/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       return await courseService.getCourses();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
//     }
//   }
// );

// // ✅ Enroll in a course
// export const enrollCourse = createAsyncThunk(
//   "courses/enroll",
//   async (courseId, thunkAPI) => {
//     try {
//       await courseService.enrollInCourse(courseId);
//       return courseId;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to enroll");
//     }
//   }
// );

// // ✅ Unenroll from a course
// export const unenrollCourse = createAsyncThunk(
//   "courses/unenroll",
//   async (courseId, thunkAPI) => {
//     try {
//       await courseService.unenrollFromCourse(courseId);
//       return courseId;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to unenroll");
//     }
//   }
// );

// // ✅ Add a new course
// export const addCourse = createAsyncThunk(
//   "courses/add",
//   async (courseData, thunkAPI) => {
//     try {
//       return await courseService.addCourse(courseData);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add course");
//     }
//   }
// );

// // ✅ Course slice
// const courseSlice = createSlice({
//   name: "courses",
//   initialState: {
//     courses: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ✅ Fetch Courses
//       .addCase(fetchCourses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCourses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courses = action.payload;
//       })
//       .addCase(fetchCourses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ✅ Enroll Course
//       .addCase(enrollCourse.fulfilled, (state, action) => {
//         state.courses = state.courses.map((course) =>
//           course.id === action.payload ? { ...course, enrolled: true } : course
//         );
//       })

//       // ✅ Unenroll Course
//       .addCase(unenrollCourse.fulfilled, (state, action) => {
//         state.courses = state.courses.map((course) =>
//           course.id === action.payload ? { ...course, enrolled: false } : course
//         );
//       })

//       // ✅ Add Course
//       .addCase(addCourse.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(addCourse.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courses.push(action.payload);
//       })
//       .addCase(addCourse.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default courseSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "../services/courseService";

// ✅ Fetch all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await courseService.getCourses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch courses");
    }
  }
);

// ✅ Enroll in a course
export const enrollCourse = createAsyncThunk(
  "courses/enroll",
  async (courseId, thunkAPI) => {
    try {
      await courseService.enrollInCourse(courseId);
      return courseId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to enroll");
    }
  }
);

// ✅ Unenroll from a course
export const unenrollCourse = createAsyncThunk(
  "courses/unenroll",
  async (courseId, thunkAPI) => {
    try {
      await courseService.unenrollFromCourse(courseId);
      return courseId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to unenroll");
    }
  }
);

// ✅ Add a new course
export const addCourse = createAsyncThunk(
  "courses/add",
  async (courseData, thunkAPI) => {
    try {
      return await courseService.addCourse(courseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to add course");
    }
  }
);

// ✅ Delete a course
export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (courseId, thunkAPI) => {
    try {
      await courseService.deleteCourse(courseId);
      return courseId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete course");
    }
  }
);

// ✅ Course slice
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
      // ✅ Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Enroll Course
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((course) =>
          course.id === action.payload ? { ...course, enrolled: true } : course
        );
      })

      // ✅ Unenroll Course
      .addCase(unenrollCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((course) =>
          course.id === action.payload ? { ...course, enrolled: false } : course
        );
      })

      // ✅ Add Course
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Delete Course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course.id !== action.payload);
      });
  },
});

export default courseSlice.reducer;
