import { combineReducers } from "redux";

import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import offerReducer from "./offerReducer";
import activityReducer from "./activityReducer";
import notificationReducer from "./notificationReducer"

export default combineReducers({
  offer: offerReducer,
  activity: activityReducer,
  notifications: notificationReducer,
  error: errorReducer,
  auth: authReducer
});
