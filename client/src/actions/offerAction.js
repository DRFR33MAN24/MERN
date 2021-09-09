import { GET_OFFERS, OFFERS_LOADING } from "./types";
import { tokenConfig } from "./authAction";
import axios from "axios";
import { returnErrors } from "./errorAction";

export const getOffers = () => (dispatch, getState) => {
  dispatch(setOffersLoading());
  axios
    .get("/api/offers", tokenConfig(getState))
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
