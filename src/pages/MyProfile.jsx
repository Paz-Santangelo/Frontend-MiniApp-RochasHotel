import { Typography } from "@mui/material";
import { useEffect, useReducer } from "react";
import { getUserData, isAdmin, isAuthenticated, isUser } from "../actions/userActions";
import { initialUserState, userReducer } from "../reducers/userReducer";
const MyProfile = () => {

  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  //const token = ApiService.isAuthenticated();
  //console.log(userState);
  
  useEffect(() => {
    isAuthenticated(userDispatch);
    isAdmin(userDispatch);
    isUser(userDispatch);
    getUserData(userDispatch);
  }, [userState.isAuthenticated, userState.isAdmin, userState.isUser]);


  return (
    <>
      <Typography variant="h4">Hola usuario</Typography>
    </>
  );
};

export default MyProfile;
