/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Sidenav from "../components/Sidenav";

const MainLayout = ({ children, userState, userDispatch }) => {
  return (
    <Box sx={styles.container}>
      <Sidenav userState={userState} userDispatch={userDispatch} />
      <Box component={"main"} sx={styles.mainSection}>
        {children}
      </Box>
    </Box>
  );
};

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

export default MainLayout;