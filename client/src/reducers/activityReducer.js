import { GET_ACTIVITY, ACTIVITY_LOADING, SUB_PAYMENT, SUB_FAIL } from "../actions/types";

const initialState = {
  activity: {},
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
        loading: false
      };

    case SUB_FAIL:
      return {
        ...state,
        loading: false
      };

    case ACTIVITY_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
