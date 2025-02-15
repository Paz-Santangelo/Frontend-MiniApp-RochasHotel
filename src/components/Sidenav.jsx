/* eslint-disable react/prop-types */
import { Avatar, Box, Typography, Tooltip } from "@mui/material";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  getUserData,
  isAdmin,
  isAuthenticated,
  isUser,
} from "../actions/userActions";
import HotelIcon from "@mui/icons-material/Hotel";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InfoIcon from "@mui/icons-material/Info";

const Sidenav = ({ userState, userDispatch }) => {
  const location = useLocation();
  const { collapsed } = useProSidebar();

  useEffect(() => {
    isAuthenticated(userDispatch);
    isAdmin(userDispatch);
    isUser(userDispatch);
    getUserData(userDispatch);
  }, [
    userState.isAuthenticated,
    userState.isAdmin,
    userState.isUser,
    userDispatch,
  ]);

  if (!userState.isAuthenticated) return null;

  return (
    <Sidebar
      style={{ minHeight: "calc(100vh - 71.58px)", top: "71.58px" }}
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
          src={userState.user?.imageUser?.urlImage || ""}
        />
        {!collapsed ? (
          <>
            <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
              {userState.user?.name || "Usuario"}
            </Typography>
            <Typography variant="overline" sx={{ color: "white" }}>
              {userState.user?.role || "Sin rol"}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" sx={{ mt: 1, color: "white" }}>
            {userState.user?.name || "Usuario"}
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
        <Tooltip
          title="Mi Perfil"
          placement="right"
          disableHoverListener={!collapsed}
        >
          <MenuItem
            routerLink={<Link to="/perfil" />}
            active={location.pathname === "/perfil"}
            icon={<AdminPanelSettingsIcon />}
          >
            {!collapsed && (
              <Typography variant="body2" sx={styles.link}>
                Mi Perfil
              </Typography>
            )}
          </MenuItem>
        </Tooltip>

        <Tooltip
          title={userState.isAdmin ? "Habitaciones" : "Reservar"}
          placement="right"
          disableHoverListener={!collapsed}
        >
          <MenuItem
            routerLink={<Link to="/habitaciones" />}
            active={location.pathname === "/habitaciones"}
            icon={<HotelIcon />}
          >
            {!collapsed && (
              <Typography variant="body2" sx={styles.link}>
                {userState.isAdmin ? "Habitaciones" : "Reservar"}
              </Typography>
            )}
          </MenuItem>
        </Tooltip>

        {userState.isUser && (
          <Tooltip
            title="Buscar Reserva"
            placement="right"
            disableHoverListener={!collapsed}
          >
            <MenuItem
              routerLink={<Link to="/reserva/buscar" />}
              active={location.pathname === "/reserva/buscar"}
              icon={<ContentPasteSearchIcon />}
            >
              {!collapsed && (
                <Typography variant="body2" sx={styles.link}>
                  Buscar Reserva
                </Typography>
              )}
            </MenuItem>
          </Tooltip>
        )}

        <Tooltip
          title={userState.isAdmin ? "Reservas" : "Mis Reservas"}
          placement="right"
          disableHoverListener={!collapsed}
        >
          <MenuItem
            routerLink={<Link to="/reservas" />}
            active={location.pathname === "/reservas"}
            icon={<CalendarMonthIcon />}
          >
            {!collapsed && (
              <Typography variant="body2" sx={styles.link}>
                {userState.isAdmin ? "Reservas" : "Mis Reservas"}
              </Typography>
            )}
          </MenuItem>
        </Tooltip>

        {userState.isAdmin && (
          <Tooltip
            title="Usuarios"
            placement="right"
            disableHoverListener={!collapsed}
          >
            <MenuItem
              routerLink={<Link to="/admin/usuarios" />}
              active={location.pathname === "/admin/usuarios"}
              icon={<PeopleAltIcon />}
            >
              {!collapsed && (
                <Typography variant="body2" sx={styles.link}>
                  Usuarios
                </Typography>
              )}
            </MenuItem>
          </Tooltip>
        )}

        <Tooltip
          title="Información"
          placement="right"
          disableHoverListener={!collapsed}
        >
          <MenuItem
            routerLink={<Link to="/" />}
            active={location.pathname === "/"}
            icon={<InfoIcon />}
          >
            {!collapsed && (
              <Typography variant="body2" sx={styles.link}>
                Información
              </Typography>
            )}
          </MenuItem>
        </Tooltip>
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
