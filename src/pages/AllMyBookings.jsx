import { Typography } from "@mui/material";
import { useEffect, useReducer } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { getUserBookingsAction, getUserData } from "../actions/userActions";

/* En este codigo, si el que ingresa es el administrador, debera ver todas las reservas caso contrario, si es user, debera ver sus propias reservas */
const AllMyBookings = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  //const navigate = useNavigate();

  useEffect(() => {
    getUserData(userDispatch);
  }, []);

  useEffect(() => {
    if (userState.user?.id) {
      getUserBookingsAction(userState.user.id)(userDispatch);
    }
  }, [userState.user?.id]);

  //console.log(userState.user?.id); // Ahora no imprimirá undefined
  //console.log(userState.userBookings);

  return <Typography variant="h4">Todas mis reservas</Typography>;
};

export default AllMyBookings;
