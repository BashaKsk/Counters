import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import routesConfig from "./config/routesConfig.json";
import { LoginDialog } from "./components/Login/login";
import { Dashboard } from "./components/Dashboard/dashboard";
import { CustomAppBar } from "./components/AppBar/appBar";
import "./App.css";

const { homeRoute, loginRoute, dashboardRoute } = routesConfig.ROUTES;
function App() {
  return (
    <BrowserRouter>
      <CustomAppBar />
      <Routes>
        <Route
          path={homeRoute}
          element={<Navigate replace to={loginRoute} />}
        />
        <Route path={loginRoute} element={<LoginDialog />} />
        <Route path={dashboardRoute} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
