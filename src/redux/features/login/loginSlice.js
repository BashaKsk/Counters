import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import urlConfig from "../../../config/urlConfig.json";
const initialState = {
  userDetails: null,
  isLoading: false,
  error: null,
};
// Thunk for login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, { rejectWithValue }) => {
    return axios
      .post(urlConfig.URLS.baseURL + urlConfig.URLS.signin, payload)
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.userDetails = {};
      state.error = null;
      state.isLoading = false;
      Cookies.remove("token");
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.userDetails = actions.payload;
      state.error = null;
      Cookies.set("token", actions.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
export const { logOutUser, clearErrors, updateUser } = userSlice.actions;
