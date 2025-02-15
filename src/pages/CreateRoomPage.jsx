import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { initialRoomState, roomReducer } from "../reducers/roomReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { addRoomAction } from "../actions/roomActions";
import NotificationAlert from "../components/NotificationAlert";

const CreateRoomPage = () => {
  const [roomState, roomDispatch] = useReducer(roomReducer, initialRoomState);
  const [roomData, setRoomData] = useState({
    files: [],
    roomType: "",
    roomDescription: "",
    roomPrice: "",
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [imagesToDelete] = useState([]);
  const navigate = useNavigate();

  const { loading, successMessage, error } = roomState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setRoomData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  const handleRemoveNewImage = (index) => {
    const updatedFiles = [...roomData.files];
    updatedFiles.splice(index, 1);
    setRoomData({ ...roomData, files: updatedFiles });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomDescription", roomData.roomDescription);
    formData.append("roomPrice", roomData.roomPrice);

    roomData.files.forEach((file) => {
      formData.append("files", file);
    });

    imagesToDelete.forEach((image) => {
      formData.append("imagesToDelete", image);
    });

    addRoomAction(formData)(roomDispatch);
  };

  useEffect(() => {
    if (successMessage) {
      setAlertOpen(true);
      setTimeout(() => {
        navigate("/habitaciones");
      }, 3000);
    }
    if (error) setAlertOpen(true);
  }, [successMessage, error, navigate]);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box sx={styles.boxContainerCreateRoomPage}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Agregar nueva habitación
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="roomType"
          label="Tipo de habitación"
          value={roomData.roomType}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="roomPrice"
          label="Precio"
          type="number"
          value={roomData.roomPrice}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="roomDescription"
          label="Descripción"
          value={roomData.roomDescription}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          style={{ marginTop: 16 }}
        />
        <Box sx={styles.boxContainerImages}>
          {roomData.files.map((file, index) => (
            <Box key={`new-${index}`} sx={styles.boxImages}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
              <IconButton
                sx={styles.iconButton}
                onClick={() => handleRemoveNewImage(index)}
              >
                <DeleteIcon fontSize="small" color="black" />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box sx={styles.boxButtons}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => navigate("/habitaciones")}
          >
            Cancelar
          </Button>
        </Box>
      </form>

      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={error ? "error" : "success"}
        message={error || successMessage}
      />
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerCreateRoomPage: {
    maxWidth: 600,
    margin: "auto",
    p: 3,
  },
  boxContainerImages: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    marginTop: 2,
  },
  boxImages: {
    position: "relative",
    display: "inline-block",
  },
  boxButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 3,
    mt: 3,
  },
  iconButton: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "rgba(255, 255, 255, 0.57)",
    "&:hover": { backgroundColor: "rgba(250, 250, 250, 0.97)" },
    padding: "4px",
    minWidth: "28px",
    minHeight: "28px",
  },
};

export default CreateRoomPage;
