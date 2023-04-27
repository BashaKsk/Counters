import { createContext } from "react";

const initialState = {
  count: 0,
  increase: () => {},
  decrease: () => {},
  reset: () => {},
};

export const ContextCounter = createContext(initialState);
