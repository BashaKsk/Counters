import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  value: 0,
};

const ReduxCounter = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    reset: (state) => {
      state.value = 0;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const ReduxCounterReducer = ReduxCounter.reducer;
export const { increment, decrement, reset } = ReduxCounter.actions;
