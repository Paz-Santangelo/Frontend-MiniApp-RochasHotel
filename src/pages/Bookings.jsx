import { useEffect, useReducer } from "react";
import { initialUserState, userReducer } from "../reducers/userReducer";
import { getUserData, isAdmin } from "../actions/userActions";
import AllBookings from "../components/AllBookings";
import MyBookings from "../components/MyBookings";


const Bookings = () => {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    isAdmin(userDispatch);
    getUserData(userDispatch);
  }, []);

  return <>{userState.isAdmin ? <AllBookings /> : <MyBookings />}</>;
};

export default Bookings;
