/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../actions/userActions";

export const AuthProvider = ({ children, userState, userDispatch }) => {
  const navigate = useNavigate();

  //console.log(userState);

  useEffect(() => {
    isAuthenticated(userDispatch);
    const handleLogoutOnClose = () => {
      if (userState.isAuthenticated) {
        navigate("/");
      }
      if (!userState.isAuthenticated) {
        navigate("/");
      }
    };

    window.addEventListener("beforeunload", handleLogoutOnClose);
    return () => {
      window.removeEventListener("beforeunload", handleLogoutOnClose);
    };
  }, [userState.isAuthenticated, navigate, userDispatch]);

  return <>{children}</>;
};
