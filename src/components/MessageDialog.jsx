/* eslint-disable react/prop-types */
import { InfoOutlined, WarningAmber } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Divider,
} from "@mui/material";

const MessageDialog = ({
  open,
  handleClose,
  onConfirm,
  children,
  type = "info",
}) => {
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
        <Box color="text.secondary">{children.body}</Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", mt: 1, gap: 2 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={type === "warning" ? "error" : "primary"}
          sx={{ px: 3 }}
          autoFocus
        >
          {type === "warning" ? "Eliminar" : "Aceptar"}
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="info"
          sx={{ px: 3 }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;
