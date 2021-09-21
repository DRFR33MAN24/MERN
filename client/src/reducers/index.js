import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import offerReducer from "./offerReducer";
import activityReducer from "./activityReducer";

export default combineReducers({
  offer: offerReducer,
  activity: activityReducer,
  error: errorReducer,
  auth: authReducer
});
