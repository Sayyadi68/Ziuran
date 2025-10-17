// src/redux/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

// لاگ برای دیباگ
console.log("Access Token:", localStorage.getItem("grushell_access_token")); 

export const fetchUser = createAsyncThunk("user/fetchUser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("userdetail/");
    return response.data.results[0] || null;
  } catch (error) {
    const errorData = error.response?.data || { detail: "Failed to fetch user", code: error.code };
    if (errorData.code === 'bad_authorization_header') {
      // لاگ‌اوت یا ریدایرکت به لاگین
      localStorage.removeItem("grushell_access_token");
      // thunkAPI.dispatch(logout()); // اگر لاگ‌اوت لازم بود
    }
    return thunkAPI.rejectWithValue(errorData.detail);
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (formData, thunkAPI) => {
  try {
    const response = await axiosInstance.patch("userdetail/update/", formData);
    return response.data;
  } catch (error) {
    const errorData = error.response?.data || { detail: "Failed to update user", code: error.code };
    if (errorData.code === 'bad_authorization_header') {
      localStorage.removeItem("grushell_access_token");
      // thunkAPI.dispatch(logout());
    }
    return thunkAPI.rejectWithValue(errorData.detail);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    updateLoading: false,
    updateError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("grushell_access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.updateLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;