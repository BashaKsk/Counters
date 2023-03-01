import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Logout } from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/features/login/loginSlice";
import Cookies from "js-cookie";
import Constants from "../../config/constants.json";
import {
  AppBarStyles,
  logOutButtonStyles,
  toolBarActionStyles,
  toolbarHeaderStyles,
  toolBarStyles,
} from "./styles";
import routesConfig from "../../config/routesConfig.json";
const { loginRoute } = routesConfig.ROUTES;

const { title, logout } = Constants.Headers;
export const CustomAppBar = () => {
  const user = useSelector((state) => state.user);

  const navigator = useNavigate();
  const location = useLocation();
  const [showAppBar, setShowAppBar] = React.useState(true);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (token === undefined) {
      navigator(`${loginRoute}`, { replace: true });
    }
  }, [dispatch, user, token, navigator]);
  React.useEffect(() => {
    if (location.pathname === `${loginRoute}`) {
      setShowAppBar(false);
    } else {
      setShowAppBar(true);
    }
  }, [location]);

  const handleLogOut = async () => {
    dispatch(logOutUser());
  };

  return showAppBar ? (
    <Box sx={{ display: "flex", marginBottom: 10 }}>
      <CssBaseline />
      <AppBar id="app_bar" elevation={1} position="fixed" sx={AppBarStyles}>
        <Toolbar sx={toolBarStyles}>
          <Box sx={toolbarHeaderStyles}>
            <React.Fragment key={1}>
              <MenuIcon sx={{ color: "white", zIndex: 1, marginRight: 5 }} />
              <Drawer></Drawer>
            </React.Fragment>
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Box sx={toolBarActionStyles}>
            <Box sx={logOutButtonStyles}>
              <Button
                onClick={() => handleLogOut()}
                variant="h6"
                component="div"
                endIcon={<Logout />}
              >
                {logout}
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  ) : null;
};
