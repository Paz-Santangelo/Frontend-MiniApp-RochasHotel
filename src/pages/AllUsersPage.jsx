import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  CircularProgress,
  Container,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import {
  deleteUserAction,
  getAllUsersAction,
  getUserData,
} from "../actions/userActions";
import NotificationAlert from "../components/NotificationAlert";
import MessageDialog from "../components/MessageDialog";


const columns = [
  { id: "imageUser", label: "Imagen", minWidth: 100, align: "center" },
  { id: "name", label: "Nombre", minWidth: 100, align: "center" },
  { id: "phoneNumber", label: "Teléfono", minWidth: 170, align: "center" },
  { id: "email", label: "Email", minWidth: 170, align: "center" },
  { id: "role", label: "Rol", minWidth: 170, align: "center" },
  { id: "action", label: "Acción", minWidth: 170, align: "center" },
];

const AllUsersPage = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [alertOpen, setAlertOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  //console.log(userState);

  useEffect(() => {
    getUserData(userDispatch);
    getAllUsersAction()(userDispatch);
  }, []);

  useEffect(() => {
    if (userState.successMessage) setAlertOpen(true);

    if (userState.error) setAlertOpen(true);
  }, [userState.successMessage, userState.error]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (user) => {
    setUserToDelete(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleDeleteUser = async () => {
    await deleteUserAction(userToDelete?.id)(userDispatch);
    setOpenDialog(false);
    setUserToDelete(null);
    getAllUsersAction()(userDispatch);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h4" gutterBottom>
          Todos los Usuarios Registrados
        </Typography>
        <Typography variant="body1">
          Antes de eliminar cualquier usuario, debe tener en cuenta que, en caso
          de haber reservas del mismo, también se eliminarán del registro de la
          base de datos.
        </Typography>
      </Box>
      <Paper sx={{ width: "90%" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "black" }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userState.loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Box
                      sx={{ display: "flex", justifyContent: "center", py: 5 }}
                    >
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : userState.allUsers && userState.allUsers.length > 0 ? (
                userState.allUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "imageUser" ? (
                              <Avatar
                                src={row.imageUser?.urlImage}
                                alt="Avatar"
                                sx={{ width: 40, height: 40, margin: "auto" }}
                              />
                            ) : column.id === "action" ? (
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleOpenDialog(row)}
                              >
                                Eliminar
                              </Button>
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No hay usuarios disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={userState.allUsers ? userState.allUsers.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            display: "flex",
            justifyContent: "end",
            "& .css-11cfq65-MuiTablePagination-displayedRows": {
              margin: 0,
            },
            "& .css-s09cke-MuiTablePagination-selectLabel": {
              margin: 0,
            },
          }}
        />
      </Paper>

      <NotificationAlert
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={userState.error ? "error" : "success"}
        message={userState.error || userState.successMessage}
      />

      <MessageDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        onConfirm={handleDeleteUser}
        type="warning"
      >
        {{
          title: "Eliminar Perfil",
          body: `¿${userState.user?.name} estás seguro/a de eliminar el perfil de ${userToDelete?.name}?`,
        }}
      </MessageDialog>
    </Container>
  );
};

export default AllUsersPage;
