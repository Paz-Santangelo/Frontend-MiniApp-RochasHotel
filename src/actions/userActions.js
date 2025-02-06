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
export const USER_UPDATE = "USER_UPDATE";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAILURE = "USER_UPDATE_FAILURE";
export const USER_DELETE = "USER_DELETE";
export const USER_DELETE_SUCCESS = "USER_DELETE_SUCCESS";
export const USER_DELETE_FAILURE = "USER_DELETE_FAILURE";
export const USER_BOOKINGS_SUCCESS = "USER_BOOKINGS_SUCCESS";
export const USER_BOOKINGS_FAILURE = "USER_BOOKINGS_FAILURE";

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

export const updateUserAction = (userId, userData) => async (dispatch) => {
  dispatch({ type: USER_UPDATE });

  try {
    const result = await ApiService.updateUser(userId, userData);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: result.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";
    //console.error(message);
    dispatch({ type: USER_UPDATE_FAILURE, payload: message });
  }
};

/* Falta implementar esta funcion. */
export const deleteUserAction = (userId) => async (dispatch) => {
  dispatch({ type: USER_DELETE });

  try {
    const response = await ApiService.deleteUser(userId);

    dispatch({ type: USER_DELETE_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

    dispatch({ type: USER_DELETE_FAILURE, payload: message });
  }
};

export const getUserBookingsAction = (userId) => async (dispatch) => {
  try {
    const response = await ApiService.getUserBookings(userId);

    dispatch({ type: USER_BOOKINGS_SUCCESS, payload: response.data });
  } catch (error) {
    const message =
      error.response?.data?.error ||
      error.response?.data ||
      "Error de conexión con el servidor. Inténtelo nuevamente más tarde.";

    dispatch({ type: USER_BOOKINGS_FAILURE, payload: message });
  }
};
