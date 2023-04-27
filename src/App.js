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
        <h1 style={{textAlign : "center"}}>Counter in Two Ways </h1>

      <div className="App">
        <ReduxCounter />
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
      </div>
    </>
  );
}

export default App;
