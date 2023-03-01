const drawerWidth = 240;
export const AppBarStyles = {
  zIndex: (theme) => theme.zIndex.drawer + 1,
  backgroundColor: "#26395c",
  width : "100%",

};
export const drawerStyle = {
  display: { xs: "none", sm: "block" },
  width: drawerWidth,
  flexShrink: 0,
  marginTop: 6,
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
};

export const toolBarStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundcolor: "#26395c",
};
export const toolbarHeaderStyles = {
  display: {
    sx: "block",
    sm: "none",
    display: "flex",
    alignItems: "center",
  },
};

export const toolBarActionStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const logOutButtonStyles = {
  display: "flex",
  alignItems: "center",
};

export const drawerItemsStyles = { overflow: "auto" };
