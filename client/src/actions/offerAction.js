import { GET_OFFERS, OFFERS_LOADING } from "./types";

import axios from "axios";
import { returnErrors } from "./errorAction";

export const getOffers = () => dispatch => {
  dispatch(setOffersLoading());
  axios
    .get("/api/offers")
    .then(res =>
      dispatch({
        type: GET_OFFERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOffersLoading = () => {
  return {
    type: OFFERS_LOADING
  };
};
