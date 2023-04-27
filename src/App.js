import { Grid } from "@mui/material";
import "./App.css";
import ContextCounterApp from "./components/ContextCounter";
import ReduxCounter from "./components/ReduxCounter";
import { ContextCounter } from "./contexts/counterContext";
import { useState } from "react";
function App() {
  const [value, setvalue] = useState(0);

  const handleIncrement = () => {
    setvalue((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setvalue((prev) => prev - 1);
  };

  const handleReset = () => {
    setvalue(0);
  };
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Counter in Two Ways </h1>
      <div className="App">
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <ReduxCounter />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <ContextCounter.Provider
              value={{
                count: value,
                increase: handleIncrement,
                decrease: handleDecrement,
                reset: handleReset,
              }}
            >
              <ContextCounterApp />
            </ContextCounter.Provider>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
