import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice";
import enrollmentReducer from "./enrollmentSlice"; //  Ensure this is included

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    enrollment: enrollmentReducer, // Ensure "enrollments" exists
  },
});

export default store;
