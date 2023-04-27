import React from "react";
import { ContextCounter } from "../../contexts/counterContext";
import ContextChildCounter from "../ContextCounterChild";
import { Box } from "@mui/material";

const ContextCounterApp = () => {
  return (
    <>
      <ContextCounter.Consumer>
        {(value) => {
          const { count } = value;
          return (
            <div>
              <h1>Context Counter: {count}</h1>
              <Box sx={{ mt: 20 }}>
                <ContextChildCounter />
              </Box>
            </div>
          );
        }}
      </ContextCounter.Consumer>
    </>
  );
};

export default ContextCounterApp;
