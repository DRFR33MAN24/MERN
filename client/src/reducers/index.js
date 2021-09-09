import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import offerReducer from "./offerReducer";

export default combineReducers({
  offer: offerReducer,
  error: errorReducer,
  auth: authReducer
});
