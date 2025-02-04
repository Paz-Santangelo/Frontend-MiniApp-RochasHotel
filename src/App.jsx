import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Sidenav from "./components/Sidenav";
import AppRoutes from "./router/AppRoutes";
import { ProSidebarProvider } from "react-pro-sidebar";
import React from "react";

function App() {
  return (
    <React.Fragment>
      <ProSidebarProvider>
        <CssBaseline />
        <BrowserRouter>
            <Navbar />
            <Box sx={styles.container}>
              <Sidenav />
              <Box component={"main"} sx={styles.mainSection}>
                <AppRoutes />
              </Box>
            </Box>
        </BrowserRouter>
      </ProSidebarProvider>
    </React.Fragment>
  );
}

/** @type {import("@mui/material").SxProps}  */
const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
    height: "calc(100% - 64px)",
  },
  mainSection: {
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
};

export default App;
