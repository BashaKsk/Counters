import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import urlConfig from "../../../config/urlConfig.json";
import _ from "lodash";
const initialState = {
  data: null,
  isLoading: false,
  error: null,
  filteredData: null,
  checkedBoxes: [],
};
// Thunk for DashBoard
export const fetchDashBoardData = createAsyncThunk(
  "dashboard/fetchDashBoardData",
  async (payload, { rejectWithValue }) => {
    const token = Cookies.get("token");
    const requestOptions = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    return axios
      .get(
        urlConfig.URLS.baseURL + urlConfig.URLS.getDashBoardData,
        requestOptions
      )
      .then((response) => response.data)
      .catch((error) => {
        return rejectWithValue(error.response.data);
      });
  }
);

const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashBoardErrors: (state) => {
      state.error = null;
    },
    toggleCheckbox: (state, action) => {
      const { value, checked } = action.payload;
      if (checked) {
        state.checkedBoxes.push(parseInt(value));
      } else {
        state.checkedBoxes = state.checkedBoxes.filter(
          (item) => item !== parseInt(value)
        );
      }
      if (state.checkedBoxes.length > 0) {
        state.filteredData = _.filter(state.data.items, (item) =>
          state.checkedBoxes.includes(item.type)
        );
      } else {
        state.filteredData = state.data.items;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashBoardData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDashBoardData.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.data = actions.payload;
      state.filteredData = actions.payload.items;
    });
    builder.addCase(fetchDashBoardData.rejected, (state, actions) => {
      state.isLoading = false;
      state.error = actions.payload;
    });
  },
});

export const dashBoardReducer = dashBoardSlice.reducer;

export const { clearDashBoardErrors, toggleCheckbox } = dashBoardSlice.actions;
