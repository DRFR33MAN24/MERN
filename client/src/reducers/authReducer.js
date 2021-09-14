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
  UPDATE_FAIL,
  EMAIL_SENT
} from "../actions/types";
import { tr } from "date-fns/locale";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  updated: false,
  mail_sent: false,
  isRegisterd: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
        updated: true
      };
    case EMAIL_SENT:
      return {
        ...state,
        mail_sent: true
      };

    case UPDATE_FAIL:
      return {
        ...state,
        updated: false
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };

    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isRegisterd: true,
        isLoading: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      console.log("logout fired");
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
}
