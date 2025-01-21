/* eslint-disable react/prop-types */
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";


const NotificationAlert = ({ message = "Operation completed", severity = "success", open, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationAlert;
