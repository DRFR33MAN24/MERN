import { GET_OFFERS, OFFERS_LOADING, GET_OFFER_ID } from "./types";
import { tokenConfig } from "./authAction";
import axios from "axios";
import { returnErrors } from "./errorAction";

export const getOffers = (subid, country, device) => dispatch => {
  dispatch(setOffersLoading());
  //console.log(country, device, subid);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ subid, country, device });
  axios
    .post("/api/offers", body, config)
    .then(res => {
      //console.log(res.data.offers);
      dispatch({
        type: GET_OFFERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const getOfferByID = id => dispatch => {
  dispatch(setOffersLoading());
  //console.log(country, device, subid);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ id });
  axios
    .post("/api/offers/id", body, config)
    .then(res => {
      //console.log(res.data.offers);
      dispatch({
        type: GET_OFFER_ID,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOffersLoading = () => {
  return {
    type: OFFERS_LOADING
  };
};
