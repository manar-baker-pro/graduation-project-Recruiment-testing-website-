import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import styles from "../userDash.module.css";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import ProfileModal from "./companyprofile/modalUi";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Link, useLocation } from "react-router-dom";
// import { CompanyComponent } from "../model";
import { useDispatch } from "react-redux";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ProfileModalUser from "./userProfile/modalUi";

import { Logout } from "../../../setup/store/actionsCreators/authActionCreators/userSignIn.actionCreators";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  [theme.breakpoints.down("sm")]: {
    width: `100%`,
    zIndex: "100",
    // backgroundColor:"red"
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    width: `0`,
    // backgroundColor:"red"
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.down("sm")]: {
    // width: `0`,
    zIndex: "0",
  },
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function TempDrweUserDash() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const drawerWidth = 240;
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    dispatch(Logout());
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        open={open}
        sx={{
          backgroundColor: "white",
          display: "flex",
          alignIteems: "center",
        }}
      >
        <Toolbar>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="http://localhost:3000/userDash/homePage">
                <div className={styles.logo}></div>
              </Link>
            </div>

            {/* <div className={styles.headerSearch}>
              <IconButton>
                <SearchIcon className={styles.iconShare} />
              </IconButton>
              <input type="text" name="search" placeholder="Search" />
            </div> */}
            <div className={styles.headerRight}>
              <IconButton>
                {location.pathname.includes("createSurvey") && (
                  <VisibilityOutlinedIcon
                    className={styles.formHeaderIcon}
                    style={{ color: "#5f6368" }}
                  />
                )}
              </IconButton>
              <IconButton className={styles.IconTempTop}>
                <NotificationsRoundedIcon className={styles.iconShare} />
              </IconButton>
              <IconButton className={styles.IconTempTop} onClick={handleLogout}>
                <LogoutRoundedIcon className={styles.iconShare} />
              </IconButton>

              <ProfileModalUser />
            </div>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            className={styles.item}
            sx={{ display: "block", padding: "0" }}
          >
            <Link
              to="http://localhost:3000/userDash/homePage"
              className={styles.tempLinkItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  width: "100%",
                  justifyContent: open ? "initial" : "center",
                  padding: "10px !important",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText
                  primary="My Runing Survey"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
