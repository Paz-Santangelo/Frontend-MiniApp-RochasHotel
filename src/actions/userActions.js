import ApiService from "../services/ApiService";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_IS_AUTHENTICATED = "USER_IS_AUTHENTICATED";

export const login = async (dispatch, loginDetails) => {
  dispatch({ type: USER_LOGIN_REQUEST });

  try {
    const response = await ApiService.loginUser(loginDetails);
    //console.log(response);
    // Validar y guardar token y rol
    if (response.data.token && response.data.role) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
    } else {
      throw new Error("Datos incompletos del servidor");
    }
    // Despachar acción de éxito
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    const status = error.response?.status;
    const message =
      status === 401
        ? "Credenciales incorrectas. Por favor, verifica tu correo o contraseña."
        : status === 403
        ? "Acceso denegado"
        : error.response?.data?.message || "Error de conexión";

    // Despachar acción de error
    dispatch({ type: USER_LOGIN_FAILURE, payload: message });
  }
};

export const logout = (dispatch) => {
  ApiService.logout();
  dispatch({ type: USER_LOGOUT });
};

export const isAuthenticated = (dispatch) => {
  const isAuth = ApiService.isAuthenticated();
  dispatch({ type: USER_IS_AUTHENTICATED, payload: isAuth });
};
