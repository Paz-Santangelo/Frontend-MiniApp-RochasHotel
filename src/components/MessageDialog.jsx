/* eslint-disable react/prop-types */
import { InfoOutlined, WarningAmber } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";

const MessageDialog = ({ open, handleClose, onConfirmBooking, children, type = "info" }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "16px",
          padding: "1.5rem",
          minWidth: "350px",
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        {/* Ícono dinámico */}
        {type === "info" ? (
          <InfoOutlined sx={{ fontSize: 48, color: "primary.main" }} />
        ) : (
          <WarningAmber sx={{ fontSize: 48, color: "error.main" }} />
        )}
        <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
          {children.title}
        </DialogTitle>
      </Box>
      <Divider />
      <DialogContent sx={{ textAlign: "center", mt: 1 }}>
        <Typography variant="body1" color="text.secondary">
          {children.body}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mt: 1 }}>
        <Button onClick={handleClose} variant="outlined" color="error" sx={{ px: 3 }}>
          Cancelar
        </Button>
        <Button
          onClick={onConfirmBooking}
          variant="contained"
          color="success"
          sx={{ px: 3 }}
          autoFocus
        >
          {type === "warning" ? "Eliminar" : "Aceptar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
