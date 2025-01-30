/* eslint-disable no-unused-vars */
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initialRoomState, roomReducer } from "../reducers/roomReducer";
import { fetchRoomDetails, updateRoomAction } from "../actions/roomActions"; // Importamos la acción updateRoomAction
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationAlert from "../components/NotificationAlert";

const EditRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomState, roomDispatch] = useReducer(roomReducer, initialRoomState);
  const [roomData, setRoomData] = useState({
    existingImages: [],
    files: [],
    roomType: "",
    roomDescription: "",
    roomPrice: "",
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  // Extraemos el estado de actualización y errores
  const { selectedRoom, isUpdating, updateError } = roomState;

  //console.log(selectedRoom.imagesRoom[2].name);

  // Cargar los detalles de la habitación al montar el componente
  useEffect(() => {
    fetchRoomDetails(roomId)(roomDispatch);
  }, [roomId]);

  // Actualizar el estado local (roomData) cuando selectedRoom cambie
  useEffect(() => {
    if (selectedRoom) {
      setRoomData({
        existingImages:
          selectedRoom.imagesRoom?.map((img) => img.urlImage) || [],
        files: [], // Mantener las nuevas imágenes por separado
        roomType: selectedRoom.roomType || "",
        roomDescription: selectedRoom.roomDescription || "",
        roomPrice: selectedRoom.roomPrice || "",
      });
    }
  }, [selectedRoom]);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  // Manejar cambios en las imágenes
  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setRoomData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  const handleRemoveExistingImage = (index) => {
    const updatedImages = [...roomData.existingImages];
    const removedImage = updatedImages.splice(index, 1)[0];
    setRoomData({ ...roomData, existingImages: updatedImages });
    setImagesToDelete([...imagesToDelete, removedImage]);
  };

  const handleRemoveNewImage = (index) => {
    const updatedFiles = [...roomData.files];
    updatedFiles.splice(index, 1);
    setRoomData({ ...roomData, files: updatedFiles });
  };

  // Convertir una URL de imagen en un archivo File
  const urlToFile = async (url, index) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], `${selectedRoom.imagesRoom[index].name}`, {
      type: blob.type,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomDescription", roomData.roomDescription);
    formData.append("roomPrice", roomData.roomPrice);

    // Convertir imágenes existentes a archivos y agregarlas a FormData
    const existingFiles = await Promise.all(
      roomData.existingImages.map((url, index) => urlToFile(url, index))
    );

    existingFiles.forEach((file) => {
      formData.append("files", file);
    });

    // Agregar nuevas imágenes
    roomData.files.forEach((file) => {
      formData.append("files", file);
    });

    imagesToDelete.forEach((image) => {
      formData.append("imagesToDelete", image);
    });

    //console.log("Enviando datos:", formData.entries());

    updateRoomAction(roomId, formData)(roomDispatch);

    setAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box sx={styles.boxContainerEditRoomPage}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Editar Habitación
      </Typography>

      {/* Mostrar errores de actualización */}
      {updateError && (
        <Typography color="error" align="center" gutterBottom>
          {updateError}
        </Typography>
      )}

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
          {/* Imágenes previas */}
          {roomData.existingImages.map((urlImage, index) => (
            <Box key={`existing-${index}`} sx={styles.boxImages}>
              <img
                src={urlImage}
                alt={`Preview ${index}`}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
              <IconButton
                sx={styles.iconButton}
                onClick={() => handleRemoveExistingImage(index)}
              >
                <DeleteIcon fontSize="small" color="black" />
              </IconButton>
            </Box>
          ))}

          {/* Imágenes nuevas */}
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
            disabled={isUpdating} // Deshabilitar el botón mientras se actualiza
          >
            {isUpdating ? "Guardando..." : "Guardar Cambios"}
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ mt: 2 }}
            onClick={() => navigate("/habitaciones")}
          >
            Volver
          </Button>
        </Box>
      </form>

      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={roomState.updateError ? "error" : "success"}
        message={
          roomState.updateError
            ? roomState.updateError
            : "La habitación fue actualizada con éxito."
        }
      />
    </Box>
  );
};

/** @type {import("@mui/material").SxProps}  */
const styles = {
  boxContainerEditRoomPage: {
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

export default EditRoomPage;
