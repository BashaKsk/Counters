import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDashBoardErrors,
  fetchDashBoardData,
  toggleCheckbox,
} from "../../redux/features/dashboard/dashboardSlice";
import { CustomDataGrid } from "../Grid/grid";
import { Snackbar, Alert } from "@mui/material";
import {
  checkBoxContainerStyles,
  type0Styles,
  type1Styles,
  type2Styles,
  type3Styles,
  type4Styles,
} from "./styles";
import Lottie from "react-lottie-player";
import Loader from "../../utils/loader-animation.json";
export const Dashboard = () => {
  const dashBoardState = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  console.log(dashBoardState.filteredData);
  useEffect(() => {
    dispatch(fetchDashBoardData());
  }, [dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(clearDashBoardErrors());
  };

  function handleCheckboxChange(event) {
    const { value, checked } = event.target;
    dispatch(toggleCheckbox({ value, checked }));
  }
  return (
    <Box>
      <FormGroup>
        <Grid container sx={checkBoxContainerStyles}>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              control={<Checkbox checked={true} />}
              label="All"
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type0Styles}
              control={<Checkbox value={0} onChange={handleCheckboxChange} />}
              label="Type 0"
            />
          </Grid>

          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type1Styles}
              control={<Checkbox value={1} onChange={handleCheckboxChange} />}
              label="Type 1"
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type2Styles}
              control={<Checkbox value={2} onChange={handleCheckboxChange} />}
              label="Type 2"
            />
          </Grid>

          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type3Styles}
              control={<Checkbox value={3} onChange={handleCheckboxChange} />}
              label="Type 3"
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type4Styles}
              control={<Checkbox value={4} onChange={handleCheckboxChange} />}
              label="Type 4"
            />
          </Grid>
        </Grid>
      </FormGroup>
      {dashBoardState.loading && (
        <Lottie
          loop
          animationData={Loader}
          fontSize={1000}
          play
        />
      )}
      {!dashBoardState.loading && dashBoardState.error ? (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {dashBoardState.error}
          </Alert>
        </Snackbar>
      ) : null}
      {!dashBoardState.loading && dashBoardState.filteredData ? (
        <CustomDataGrid rows={dashBoardState.filteredData} />
      ) : (
        <Box></Box>
      )}
    </Box>
  );
};
