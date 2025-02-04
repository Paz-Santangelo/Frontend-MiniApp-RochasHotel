import ApiService from "../services/ApiService";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_IS_AUTHENTICATED = "USER_IS_AUTHENTICATED";
export const USER_IS_ADMIN = "USER_IS_ADMIN";
export const USER_IS_USER = "USER_IS_USER";
export const USER_DATA = "USER_DATA";
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";

export const login = async (dispatch, loginDetails) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const response = await ApiService.loginUser(loginDetails);
    //console.log(response);
    if (response.data.token && response.data.role) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    } else {
      throw new Error("Datos incompletos del servidor.");
    }
    const token = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();

    dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
    dispatch({ type: USER_IS_AUTHENTICATED, payload: token });
    dispatch({ type: USER_IS_ADMIN, payload: isAdmin });
    dispatch({ type: USER_IS_USER, payload: isUser });
  } catch (error) {
    const message =
      error.response?.data || "Error de conexión con el servidor.";

    dispatch({ type: USER_LOGIN_FAILURE, payload: message });
  }
};

export const logout = (dispatch) => {
  ApiService.logout();
  dispatch({ type: USER_LOGOUT });
};

export const isAuthenticated = (dispatch) => {
  const token = ApiService.isAuthenticated();
  dispatch({ type: USER_IS_AUTHENTICATED, payload: token });
};

export const isAdmin = (dispatch) => {
  const isAdmin = ApiService.isAdmin();
  dispatch({ type: USER_IS_ADMIN, payload: isAdmin });
};

export const isUser = (dispatch) => {
  const isUser = ApiService.isUser();
  dispatch({ type: USER_IS_USER, payload: isUser });
};

export const getUserData = async (dispatch) => {
  const userData = await ApiService.getUserProfile();
  dispatch({ type: USER_DATA, payload: userData });
};

export const registerUser = async (dispatch, registrationDetails) => {
  dispatch({ type: USER_REGISTER_REQUEST });

  try {
    const response = await ApiService.registerUser(registrationDetails);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response?.data ||
      "Error de conexión con el servidor, inténtelo de nuevo más tarde.";
    console.log(message);
    dispatch({ type: USER_REGISTER_FAILURE, payload: message });
  }
};
