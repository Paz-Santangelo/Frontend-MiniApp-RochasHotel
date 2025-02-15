/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  List,
  ListItem,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import LogoHotel from "../assets/logo-hotel.png";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../actions/userActions";
import { useProSidebar } from "react-pro-sidebar";

const pages = [
  { name: "Nosotros", url: "nosotros" },
  { name: "Habitaciones", url: "habitaciones" },
  { name: "Contáctanos", url: "contacto" },
  { name: "Regístrate", url: "registrate" },
];

const Navbar = ({ userState, userDispatch }) => {
  const navigate = useNavigate();
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const isMenuOpen = Boolean(menuAnchor);

  useEffect(() => {
    isAuthenticated(userDispatch);
  }, [userState.isAuthenticated, userDispatch]);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    logout(userDispatch);
    navigate("/");
  };

  return (
    <Box>
      <AppBar component="nav" sx={styles.appBar}>
        <Toolbar>
          {userState.isAuthenticated && (
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
            alt="Logo del Hotel"
            onClick={() => {
              if (!userState.isAuthenticated) {
                navigate("/");
              }
            }}
            sx={{
              ...styles.logoHotel,
              cursor: !userState.isAuthenticated ? "pointer" : "default",
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          {/* Menú para pantallas grandes */}
          {!userState.isAuthenticated ? (
            <>
              <Box sx={styles.boxItemsNavigation}>
                <List sx={styles.listItemsNavigation}>
                  {pages.map((page) => (
                    <ListItem key={page.name}>
                      <NavLink
                        to={page.url}
                        style={({ isActive }) =>
                          isActive ? styles.navlinkActive : styles.navlink
                        }
                      >
                        <Typography variant="body1">{page.name}</Typography>
                      </NavLink>
                    </ListItem>
                  ))}

                  <ListItem sx={styles.listItem}>
                    <IconButton
                      component={NavLink}
                      to="/login"
                      sx={{ color: "white" }}
                      style={({ isActive }) =>
                        isActive ? styles.navlinkActive : styles.navlink
                      }
                    >
                      <PersonIcon />
                    </IconButton>
                  </ListItem>
                </List>
              </Box>

              {/* Menú hamburguesa para pantallas pequeñas */}
              <IconButton
                sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={menuAnchor}
                open={isMenuOpen}
                onClose={handleMenuClose}
                sx={{ display: { xs: "block", sm: "none" } }}
                MenuListProps={{
                  sx: { bgcolor: "black" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={handleMenuClose}
                    sx={{ bgcolor: "black", color: "white" }}
                  >
                    <NavLink
                      to={page.url}
                      style={({ isActive }) =>
                        isActive ? styles.navlinkActive : styles.navlink
                      }
                    >
                      {page.name}
                    </NavLink>
                  </MenuItem>
                ))}

                <MenuItem
                  onClick={handleMenuClose}
                  sx={{ bgcolor: "black", color: "white" }}
                >
                  <NavLink
                    to="/login"
                    style={({ isActive }) =>
                      isActive ? styles.navlinkActive : styles.navlink
                    }
                  >
                    Login
                  </NavLink>
                </MenuItem>
              </Menu>
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
    position: "fixed",
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
