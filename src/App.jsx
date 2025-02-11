import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidenav from "./components/Sidenav";
import AppRoutes from "./router/AppRoutes";
import { ProSidebarProvider } from "react-pro-sidebar";
import React, { useReducer } from "react";
import { initialUserState, userReducer } from "./reducers/userReducer";
import { AuthProvider } from "./services/AuthProvider";

function App() {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <React.Fragment>
      <ProSidebarProvider>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider
            userState={userState}
            userDispatch={userDispatch}
          ></AuthProvider>
          <Navbar userState={userState} userDispatch={userDispatch} />
          <Box sx={styles.container}>
            <Sidenav userState={userState} userDispatch={userDispatch} />
            <Box component={"main"} sx={styles.mainSection}>
              <AppRoutes />
            </Box>
          </Box>
        </BrowserRouter>
        <Footer />
      </ProSidebarProvider>
    </React.Fragment>
  );
}

/** @type {import("@mui/material").SxProps}  */
const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
    height: "calc(100% - 71.58px)",
  },
  mainSection: {
    width: "100%",
    height: "auto",
    top: "71.58px",
    position: "relative",
    overflow: "auto",
  },
};

export default App;
