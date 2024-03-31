import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import QuizIcon from "@mui/icons-material/Quiz";
// import SearchIcon from "@mui/icons-material/Search";
// import AppsIcon from "@mui/icons-material/Apps";
// import Avatar from "@mui/material/Avatar";
// import avatar from "../../../../public/assets/images/cat.png";
import styles from "../adminDash.module.css";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Link } from "react-router-dom";
import ProfileModalUser from "../../userDash/components/userProfile/modalUi";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../../setup/store/actionsCreators/authActionCreators/userSignIn.actionCreators";
const drawerWidth = 260;

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
  backgroundColor: "#fff",
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

export default function TEMPDROWER() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
              <Link to="/adminDash">
                <div className={styles.logo}></div>
              </Link>
            </div>
            <div className={styles.headerRight}>
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
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link
              to="/adminDash/getCompaniesNotActive"
              style={{ textDecoration: "none", color: "#363232" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
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
                  primaryTypographyProps={{
                    style: {
                      fontSize: "16px",
                    },
                  }}
                  primary={"Manage Company"}
                  sx={{ opacity: open ? 1 : 0, fontSize: 10 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Link
              to="/adminDash/manageTechnologies"
              style={{ textDecoration: "none", color: "#363232" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MemoryRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      fontSize: "16px",
                    },
                  }}
                  primary={"Manage Techonologies"}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          {/* )
          )} */}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
          <Link
              to="/adminDash/manageSkillTest"
              style={{ textDecoration: "none", color: "#363232" }}
            >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage skill Tests"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
