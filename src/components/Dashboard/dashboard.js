import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDashBoardErrors,
  clearFilters,
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
  const [data, setdata] = React.useState([]);
  const [reset, setReset] = React.useState(false);
  const [showAllCheck, setShowAllCheck] = React.useState(true);
  useEffect(() => {
    dispatch(fetchDashBoardData());
  }, [dispatch]);

  useEffect(() => {
    if (dashBoardState.filteredData) {
      //data grid expects an id field  to be exist in our collection
      //this useEffect is is not needed in actual project as there'll be an id presetn in each collection
      const updatedData = dashBoardState.filteredData.map((item, index) => {
        return {
          ...item,
          id: index,
        };
      });
      setdata(updatedData);
    }
  }, [dispatch, dashBoardState, reset]);
  console.log(dashBoardState.filteredData);
  useEffect(() => {
    if (dashBoardState.checkedBoxes.length > 0) {
      setShowAllCheck(false);
    } else {
      setShowAllCheck(true);
    }
  }, [dispatch, dashBoardState.checkedBoxes.length]);
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
  function handleAllCheckBox(event) {
    const { checked } = event.target;
    if (checked) {
      setShowAllCheck(true);
      dispatch(clearFilters());
      setReset((prev) => !prev);
    } else {
      setShowAllCheck(false);
      setdata([]);
    }
  }
  return (
    <Box>
      <FormGroup>
        <Grid container sx={checkBoxContainerStyles}>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              control={
                <Checkbox onChange={handleAllCheckBox} checked={showAllCheck} />
              }
              label="All"
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type0Styles}
              control={
                <Checkbox
                  value={0}
                  checked={dashBoardState.checkedBoxes.includes(0) ? 1 : 0}
                  onChange={handleCheckboxChange}
                />
              }
              label="Type 0"
            />
          </Grid>

          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type1Styles}
              control={
                <Checkbox
                  value={1}
                  checked={dashBoardState.checkedBoxes.includes(1) ? 1 : 0}
                  onChange={handleCheckboxChange}
                />
              }
              label="Type 1"
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type2Styles}
              control={
                <Checkbox
                  value={2}
                  checked={dashBoardState.checkedBoxes.includes(2) ? 1 : 0}
                  onChange={handleCheckboxChange}
                />
              }
              label="Type 2"
            />
          </Grid>

          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type3Styles}
              control={
                <Checkbox
                  value={3}
                  checked={dashBoardState.checkedBoxes.includes(3) ? 1 : 0}
                  onChange={handleCheckboxChange}
                />
              }
              label="Type 3"
            />
          </Grid>
          <Grid item xs={2} md={1}>
            <FormControlLabel
              sx={type4Styles}
              control={
                <Checkbox
                  value={4}
                  checked={dashBoardState.checkedBoxes.includes(4) ? 1 : 0}
                  onChange={handleCheckboxChange}
                />
              }
              label="Type 4"
            />
          </Grid>
        </Grid>
      </FormGroup>
      {dashBoardState.loading && (
        <Lottie loop animationData={Loader} fontSize={1000} play />
      )}
      {!dashBoardState.loading && dashBoardState.error && (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {dashBoardState.error}
          </Alert>
        </Snackbar>
      )}
      {!dashBoardState.loading && dashBoardState.filteredData && (
        <CustomDataGrid rows={data} />
      )}
    </Box>
  );
};
