import { Avatar, Box, Typography } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useReducer } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { useEffect } from "react";
import {
  getUserData,
  isAdmin,
  isAuthenticated,
  isUser,
} from "../actions/userActions";
import ApiService from "../services/ApiService";
import HotelIcon from "@mui/icons-material/Hotel";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const Sidenav = () => {
  const location = useLocation();
  const { collapsed } = useProSidebar();
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const token = ApiService.isAuthenticated();
  //console.log(userState);

  useEffect(() => {
    if (token) {
      isAuthenticated(userDispatch);
      isAdmin(userDispatch);
      isUser(userDispatch);
      getUserData(userDispatch);
    }
  }, [token, userState.isAuthenticated, userState.isAdmin, userState.isUser]);

  //console.log(localStorage.getItem("token"));
  if (!localStorage.getItem("token")) return null;

  return (
    <Sidebar
      style={{ minHeight: "calc(100vh - 71.58px)", top: "auto" }}
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
          routerLink={<Link to="/profile" />}
          active={location.pathname === "/profile"}
          icon={<AdminPanelSettingsIcon />}
        >
          <Typography variant="body2" sx={styles.link}>
            Mi Perfil
          </Typography>
        </MenuItem>

        <MenuItem
          routerLink={<Link to="/habitaciones" />}
          active={location.pathname === "/habitaciones"}
          icon={<HotelIcon />}
        >
          <Typography variant="body2" sx={styles.link}>
            Habitaciones
          </Typography>
        </MenuItem>

        <MenuItem
          routerLink={<Link to="/reserva/buscar" />}
          active={location.pathname === "/reserva/buscar"}
          icon={<ContentPasteSearchIcon />}
        >
          <Typography variant="body2" sx={styles.link}>
            Buscar Reserva
          </Typography>
        </MenuItem>

        <MenuItem
          routerLink={<Link to="/reservas" />}
          active={location.pathname === "/reservas"}
          icon={<CalendarMonthIcon />}
        >
          <Typography variant="body2" sx={styles.link}>
            Reservas
          </Typography>
        </MenuItem>

        {userState.isAdmin && (
          <MenuItem
            routerLink={<Link to="/usuarios" />}
            active={location.pathname === "/usuarios"}
            icon={<PeopleAltIcon />}
          >
            <Typography variant="body2" sx={styles.link}>
              Usuarios
            </Typography>
          </MenuItem>
        )}
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
