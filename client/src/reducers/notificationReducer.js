import { GET_NOTIFICATIONS, CLEAR_NOTIFICATIONS } from "../actions/types";

const initialState = {
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state
      };

    default:
      return state;
  }
}
