import * as React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  SnackbarContent,
  Box,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loginUser } from "../../redux/features/login/loginSlice";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Constants from "../../config/constants.json";
import { dialogActionsStyles, loginButtonStyles } from "./styles";
export const LoginDialog = () => {
  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
  });
  const [error, seterror] = useState({ username: "", password: "" });
  const [openSnackbar, setOpenSnackbar] = React.useState({
    status: false,
    message: "",
    color: "",
  });
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const token = Cookies.get("token");
  useEffect(() => {
    if (!userState.loading && userState.userDetails && token) {
      navigator("/dashboard", { replace: true });
    }
    if (!userState.loading && userState.error) {
      setOpenSnackbar((prev) => ({
        status: true,
        message: userState.error.message,
        color: "red",
      }));
    }

    setTimeout(() => {
      dispatch(clearErrors());
    }, 2000);
  }, [dispatch, userState, navigator, token]);

  const handleLogin = () => {
    seterror(() => ({ username: "", password: "" }));
    if (!userDetails.username) {
      seterror((prev) => ({ ...prev, username: "username is Required" }));
    }
    if (!userDetails.password) {
      seterror((prev) => ({ ...prev, password: "password is Required" }));
    }
    if (userDetails.username && userDetails.password) {
      dispatch(loginUser(userDetails));
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar((prev) => ({ ...prev, status: false }));
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Dialog
        open={true}
        BackdropProps={{ open: true }}
        sx={{ textAlign: "start" }}
      >
        <DialogTitle sx={{ color: "#26395c", fontWeight: "bold" }}>
          {Constants.login.welocme}
          <br />
          {Constants.login.name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{Constants.login.description}</DialogContentText>
          <TextField
            margin="dense"
            id="name"
            label="Username"
            type="name"
            fullWidth
            value={userDetails.username}
            onChange={(event) =>
              setuserDetails((prev) => ({
                ...prev,
                username: event.target.value,
              }))
            }
            variant="standard"
          />
          {error.username && <span className="error">{error.username}</span>}
          <TextField
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            value={userDetails.password}
            onChange={(event) =>
              setuserDetails((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            variant="standard"
          />
          {error.password && <span className="error">{error.password}</span>}
        </DialogContent>
        <DialogActions sx={dialogActionsStyles}>
          <Button
            variant="contained"
            onClick={() => handleLogin()}
            sx={loginButtonStyles}
          >
            {Constants.login.name.toLocaleUpperCase()}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar.status}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
      >
        <SnackbarContent
          message={`${openSnackbar.message}`}
          style={{ backgroundColor: `${openSnackbar.color}` }}
        />
      </Snackbar>
    </Box>
  );
};
