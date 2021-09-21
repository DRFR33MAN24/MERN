import { GET_ACTIVITY, ACTIVITY_LOADING } from "../actions/types";

const initialState = {
  activity: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
        loading: false
      };

    case ACTIVITY_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
