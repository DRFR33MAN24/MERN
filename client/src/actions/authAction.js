import axios from "axios";
import { returnErrors } from "./errorAction";
import { sendEmail } from "./sendEmailAction";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register user

export const register = ({
  name,
  email,
  password,
  active,
  token
}) => dispatch => {
  dispatch({ type: USER_LOADING });
  //dispatch(sendEmail(email));
  //console.log("access-able");
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password, active, token });
  axios
    .post("/api/users", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(sendEmail(email));
    })

    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const updateDetails = ({
  name,
  email,
  password,
  id,
  wallet
}) => dispatch => {
  dispatch({ type: USER_LOADING });
  // Headers
  console.log("updateDetails Called");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password, id, wallet });
  axios
    .post("/api/users/update", body, config)
    .then(res =>
      dispatch({
        type: UPDATE_SUCCESS
      })
    )
    .then(() => {
      dispatch(sendEmail(email));
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "UPDATE_FAIL")
      );
      dispatch({
        type: UPDATE_FAIL
      });
    });
};

export const resetPassword = ({ email, password, token }) => dispatch => {
  dispatch({ type: USER_LOADING });
  // Headers
  console.log("resetPassword Called");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password, token });
  axios
    .post("/api/users/reset", body, config)
    .then(res =>
      dispatch({
        type: RESET_SUCCESS
      })
    )
    .then(() => {
      dispatch(sendEmail(email));
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "RESET_FAIL")
      );
      dispatch({
        type: RESET_FAIL
      });
    });
};

// Login User
export const login = ({ email, password, token }) => dispatch => {
  dispatch({ type: USER_LOADING });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email, password, token });
  axios
    .post("/api/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token

export const tokenConfig = getState => {
  // Get token from loacalStorage

  const token = getState().auth.token;

  //Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // If token, add to headers

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
