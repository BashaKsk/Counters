import React from "react";
import { useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
} from "../../redux/features/ReducCounter/counterSlice";
import { Button } from "@mui/material";
import { ButtonStyles } from "../../styles/common";

const ReduxCounterChild = () => {
  const dispatch = useDispatch();
  return (
    <div style={ButtonStyles}>
      <Button
        variant="contained"
        color="success"
        onClick={() => dispatch(increment())}
      >
        Increase
      </Button>
      <Button variant="contained" onClick={() => dispatch(reset())}>
        Reset
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => dispatch(decrement())}
      >
        Decrease
      </Button>
    </div>
  );
};

export default ReduxCounterChild;
