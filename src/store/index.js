import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import enrollmentReducer from "./enrollmentSlice";
import quizReducer from "./quizSlice";
import courseReducer from "./courseSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    enrollment: enrollmentReducer,
    quiz: quizReducer,
    course: courseReducer,
  },
});

export default store;
