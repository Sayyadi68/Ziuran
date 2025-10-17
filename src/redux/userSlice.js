import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// لاگ گرفتن token برای دیباگ
console.log("Access Token:", localStorage.getItem("grushell_access_token")); 

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("userdetail/"); // فقط endpoint
    // برگردوندن اولین کاربر از لیست
    return response.data.results[0] || null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;      
      localStorage.removeItem("grushell_access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        console.log("Fetching user...");
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;  // ✅ فقط اولین کاربر
        state.isAuthenticated = !!action.payload;
        state.loading = false;
        console.log("User fetched successfully:", state.user);
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        console.error("Failed to fetch user:", action.payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
