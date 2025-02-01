import { Avatar, Box, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, NavLink, useLocation } from "react-router-dom";
import HotelIcon from "@mui/icons-material/Hotel";
import { useReducer } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { useEffect } from "react";
import { getUserData, isAuthenticated } from "../actions/userActions";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ApiService from "../services/ApiService";

const Sidenav = () => {
  const location = useLocation();
  const { collapsed } = useProSidebar();
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  console.log(userState);
  const token = ApiService.isAuthenticated();

  useEffect(() => {
    const fetchUserData = async () => {
      await isAuthenticated(userDispatch);
      await getUserData(userDispatch);
    };
    fetchUserData();
  }, [token, userState.isAuthenticated]);

  if (!userState.isAuthenticated) return null;

  return (
    <Sidebar
      style={{ minHeight: "100vh", top: "auto" }}
      breakPoint="md"
      backgroundColor="black"
    >
      <Box sx={styles.avatarContainer}>
        <Avatar
          sx={{
            width: collapsed ? 50 : 90,
            height: collapsed ? 50 : 90,
            borderRadius: "50%",
            objectFit: "cover",
            transition: "width 0.3s ease, height 0.3s ease",
          }}
          alt="profile photo"
          src={userState.user?.imageUser.urlImage}
        />
        {!collapsed ? (
          <>
            <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
              {userState.user?.name}
            </Typography>
            <Typography variant="overline" sx={{ color: "white" }}>
              {userState.user?.role}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
            {userState.user.name}
          </Typography>
        )}
      </Box>
      <Menu
        menuItemStyles={{
          button: ({ active }) => ({
            backgroundColor: "transparent",
            color: active ? "#daa700" : "white",
            "&:hover": {
              color: "#ad8500",
              backgroundColor: "transparent",
              transition: "0.3s ease",
            },
          }),
        }}
      >
        <MenuItem
          routerLink={<Link to="/dashboard" />}
          active={location.pathname === "/dashboard"}
          icon={<AdminPanelSettingsIcon />}
        >
          <NavLink to={"/dashboard"} style={styles.navLink}>
            <Typography variant="body2" sx={styles.link}>
              Mi Perfil
            </Typography>
          </NavLink>
        </MenuItem>
        <MenuItem
          routerLink={<Link to="/habitaciones" />}
          active={location.pathname === "/habitaciones"}
          icon={<HotelIcon />}
        >
          <NavLink to={"/habitaciones"} style={styles.navLink}>
            <Typography variant="body2" sx={styles.link}>
              Habitaciones
            </Typography>
          </NavLink>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    my: 5,
  },
  navLink: ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#daa700" : "white",
    width: "100%",
    display: "block",
  }),
  link: {
    fontSize: "1rem",
    "&:hover": {
      color: "#ad8500",
      backgroundColor: "transparent",
      transition: "0.3s ease, height 0.3s ease",
    },
  },
};

export default Sidenav;
