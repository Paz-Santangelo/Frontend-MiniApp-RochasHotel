import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoHotel from "../assets/logo-hotel.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { isAuthenticated, logout } from "../actions/userActions";
import ApiService from "../services/ApiService";
import { useProSidebar } from "react-pro-sidebar";

/* cuando el usuario está logueando se deben ocultar los links y que esté únicamente el botón de cerrar sesión */

const pages = [
  {
    name: "Nosotros",
    url: "nosotros",
  },
  {
    name: "Habitaciones",
    url: "habitaciones",
  },
  {
    name: "Contáctanos",
    url: "contacto",
  },
  {
    name: "Regístrate",
    url: "registrate",
  },
  {
    name: "",
    url: "login",
    icon: <PersonIcon />,
  },
];

const Navbar = () => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const navigate = useNavigate();
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();

  const token = ApiService.isAuthenticated();

  useEffect(() => {
    if (token) {
      isAuthenticated(dispatch);
    }
  }, [token, state.isAuthenticated]);

  const handleLogout = () => {
    logout(dispatch);
    navigate("/");
  };
  return (
    <Box>
      <AppBar component="nav" sx={styles.appBar}>
        <Toolbar>
          {state.isAuthenticated && (
            <IconButton
              onClick={() => (broken ? toggleSidebar() : collapseSidebar())}
              color="secondary"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box
            component="img"
            src={LogoHotel}
            sx={styles.logoHotel}
            alt="Logo del Hotel"
          />

          <Box sx={{ flexGrow: 1 }} />

          {!state.isAuthenticated ? (
            <>
              <Box sx={styles.boxItemsNavigation}>
                <List sx={styles.listItemsNavigation}>
                  {pages.map((page) => (
                    <ListItem key={page.name} sx={styles.listItem}>
                      <NavLink
                        to={page.url}
                        style={({ isActive }) =>
                          isActive ? styles.navlinkActive : styles.navlink
                        }
                      >
                        <Typography variant="body1">{page.name}</Typography>
                        {page.icon}
                      </NavLink>
                    </ListItem>
                  ))}
                </List>
              </Box>

              {/* Menú hamburguesa para pantallas pequeñas */}
              <IconButton
                sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={handleLogout}
              sx={{ color: "white" }}
              edge="start"
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  appBar: {
    bgcolor: "black",
    position: "sticky",
  },
  logoHotel: {
    width: "3.5rem",
    padding: "0.5rem",
  },
  boxItemsNavigation: {
    display: { xs: "none", sm: "block" },
  },
  listItemsNavigation: {
    display: "flex",
  },
  listItems: {
    display: "inline",
    width: "auto",
    padding: "0 1rem",
  },
  navlink: {
    textDecoration: "none",
    color: "white",
    fontWeight: "normal",
  },
  navlinkActive: {
    textDecoration: "none",
    color: "#eec43b",
    fontWeight: "bold",
  },
};

export default Navbar;
