// // store/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user:null,
//   token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     logoutUser: (state) => {
//       state.user = null;
//       state.token = null;
//     },
//   },
// });

// export const { setUser, logoutUser } = authSlice.actions;
// export default authSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { loginUser, registerUser, logoutUser } from "../services/authService";

// // Async thunk for login
// export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
//   try {
//     return await loginUser(credentials);
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// });

// // Async thunk for registration
// export const register = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
//   try {
//     return await registerUser(userData);
//   } catch (error) {
//     return rejectWithValue(error);
//   }
// });

// const authSlice = createSlice({
//   name: "auth",
//   initialState: { user: null, error: null, loading: false },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       logoutUser();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

// store/AuthSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/authService";
import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk("auth/login", async (loginData, { rejectWithValue }) => {
  try {
    return await AuthService.login(loginData);
  } catch (error) {
    return rejectWithValue(error);
  }
});


// Async thunk to fetch user profile based on user ID
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue, getState }) => {
    const token = localStorage.getItem("authtoken");
    if (!token) {
      return rejectWithValue("No token found");
    }

    // Get user ID from the Redux state
    const userId = getState().auth.user?.id;
    if (!userId) {
      return rejectWithValue("No user ID found");
    }

    try {
      // Updated API call with user ID
      const response = await axios.get(`http://localhost:5138/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch user data" });
    }
  }
);



// Async thunk for registration
export const registerUser = createAsyncThunk("auth/register", async (userData, { rejectWithValue }) => {
  try {
    return await AuthService.register(userData);
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, error: null },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("authtoken");
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
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;


