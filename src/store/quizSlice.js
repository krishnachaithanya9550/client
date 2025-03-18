import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "../services/quizService";

// Thunk for fetching quizzes
export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",
  async (courseId, { rejectWithValue }) => {
    try {
      return await quizService.getQuizzes(courseId);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load quizzes");
    }
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: { quizzes: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default quizSlice.reducer;
