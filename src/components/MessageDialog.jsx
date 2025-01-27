/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Button,
  Box,
} from "@mui/material";

const MessageDialog = ({
  open,
  handleClose,
  totalPrice,
  totalGuests,
  onConfirmBooking,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ padding: "1.5rem" }}>
        <DialogTitle id="alert-dialog-title">
          Confirmación de Reserva
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h6">Total Price: ${totalPrice}</Typography>
            <Typography variant="h6">Total Guests: {totalGuests}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancelar
          </Button>
          <Button
            onClick={onConfirmBooking}
            variant="contained"
            color="success"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default MessageDialog;
