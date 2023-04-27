import React from "react";
import { Button } from "@mui/material";
import { ContextCounter } from "../../contexts/counterContext";
import { ButtonStyles } from "../../styles/common";
const ContextChildCounter = () => {
  return (
    <>
      <ContextCounter.Consumer>
        {(value) => {
          const { count, increase, reset, decrease } = value;
          return (
            <div style={ButtonStyles}>
              <Button
                variant="contained"
                color="success"
                onClick={() => increase()}
              >
                Increase
              </Button>
              <Button variant="contained" onClick={() => reset()}>
                Reset
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => decrease()}
              >
                Decrease
              </Button>
            </div>
          );
        }}
      </ContextCounter.Consumer>
    </>
  );
};

export default ContextChildCounter;
