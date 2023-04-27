import { configureStore } from "@reduxjs/toolkit";
import { ReduxCounterReducer } from "../features/ReducCounter/counterSlice";
const store = configureStore({
  reducer: {
    counter: ReduxCounterReducer,
  },
});

export default store;
