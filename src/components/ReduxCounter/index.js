import { useSelector } from "react-redux";
import ReduxCounterChild from "../ReduxChildCounter";

import { Box } from "@mui/material";

function ReduxCounter() {
  const counter = useSelector((state) => state.counter);

  return (
    <div>
      <h1>Redux Counter: {counter.value}</h1>
      <Box sx={{ mt: 20 }}>
        <ReduxCounterChild />
      </Box>
    </div>
  );
}

export default ReduxCounter;
