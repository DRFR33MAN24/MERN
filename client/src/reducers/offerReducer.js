import { GET_OFFERS, OFFERS_LOADING, GET_OFFER_ID } from "../actions/types";

const initialState = {
  offers: [],
  offer: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
        loading: false
      };
    case GET_OFFER_ID:
      return {
        ...state,
        offer: action.payload,
        loading: false
      };

    case OFFERS_LOADING:
      return { ...state, loading: true };

    default:
      return state;
  }
}
