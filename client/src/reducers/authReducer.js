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
  EMAIL_SENT,
  SENT_SUCCESS,
  RESET_SUCCESS,
  RESET_FAIL
} from "../actions/types";
import { tr } from "date-fns/locale";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: {},
  updated: false,
  mail_sent: false,
  resetted: false
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
        updated: true,
        isLoading: false
      };
    case UPDATE_FAIL:
      return {
        ...state,
        updated: false,
        isLoading: false
      };
    case RESET_SUCCESS:
      return {
        ...state,
        resetted: true,
        isLoading: false
      };
    case RESET_FAIL:
      return {
        ...state,
        resetted: false,
        isLoading: false
      };
    case SENT_SUCCESS:
      return {
        ...state,
        mail_sent: action.payload
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
