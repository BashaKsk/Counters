import * as React from "react";

import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box, Grid } from "@mui/material";
import { gridBoxStyles, gridItemStyles } from "./styles";

const TYPE_COLORS = {
  0: "#48BEFF",
  1: "#3DFAFF",
  2: "#43C59E",
  3: "#3D7068",
  4: "#14453D",
};
const columns = [
  {
    headerName: "ID",

    field: "index",
    headerAlign: "center",
    align: "center",

    renderCell: (cell) => {
      return (
        <>
          <Box
            sx={{
              backgroundColor: TYPE_COLORS[cell.row.type],
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>{cell.row.index}</Typography>
          </Box>
        </>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "fullName",
    headerName: "Name",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "wallet1",
    headerName: "Wallet1",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "wallet2",
    headerName: "Wallet2",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "wallet3",
    headerName: "Wallet3",
    type: "number",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
];

export const CustomDataGrid = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  console.log(rows);
  const updatedRows = rows.map((item, index) => {
    return {
      ...item,
      id: index,
    };
  });

  return (
    <Grid container sx={gridBoxStyles}>
      <Grid item xs={12} sm={12} md={10} sx={gridItemStyles}>
        <DataGrid
          rows={updatedRows}
          columns={columns}
          pageSize={pageSize}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[10, 20, 30, 40, 50]}
        />
      </Grid>
    </Grid>
  );
};
