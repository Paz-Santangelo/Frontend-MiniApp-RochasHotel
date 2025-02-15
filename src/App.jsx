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
import { ProSidebarProvider } from "react-pro-sidebar";
import React, { useReducer } from "react";
import { initialUserState, userReducer } from "./reducers/userReducer";
import { AuthProvider } from "./services/AuthProvider";
import MainLayout from "./services/MainLayout";
import PrivateRoutes from "./router/PrivateRoutes";
import PublicRoutes from "./router/PublicRoutes";

function App() {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <React.Fragment>
      <ProSidebarProvider>
        <CssBaseline />
        <BrowserRouter>
          <AuthProvider userState={userState} userDispatch={userDispatch}>
            <Navbar userState={userState} userDispatch={userDispatch} />
            {userState.isAuthenticated ? (
              <MainLayout userState={userState} userDispatch={userDispatch}>
                <PrivateRoutes />
              </MainLayout>
            ) : (
              <Box sx={styles.mainPublicRoutes}>
                <PublicRoutes />
              </Box>
            )}
          </AuthProvider>
          <Footer />
        </BrowserRouter>
      </ProSidebarProvider>
    </React.Fragment>
  );
}

/** @type {import("@mui/material").SxProps}  */
const styles = {
  mainPublicRoutes: {
    width: "100%",
    height: "auto",
    top: "71.58px",
    position: "relative",
  },
};

export default App;
