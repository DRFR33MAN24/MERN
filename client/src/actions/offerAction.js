import { GET_OFFERS, OFFERS_LOADING } from "./types";
import { tokenConfig } from "./authAction";
import axios from "axios";
import { returnErrors } from "./errorAction";

export const getOffers = (subid, country, device) => dispatch => {
  dispatch(setOffersLoading());
  console.log(country, device);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ subid, country, device });
  axios
    .post("/api/offers", body, config)
    .then(res => {
      console.log(res.data.offers);
      dispatch({
        type: GET_OFFERS,
        payload: res.data.offers
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// const url = new URL(
//   "http://cpalead.com/dashboard/reports/campaign_json.php?id=1721323"
// );
// const config = {
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//     "Content-Type": "application/json"
//   }
// };

// export const getOffers = (subid, number, country, offerType, device) => (
//   dispatch,
//   getState
// ) => {
//   dispatch(setOffersLoading());

//   url.searchParams.set("subid", subid);
//   url.searchParams.set("show", number);
//   url.searchParams.set("country", country);
//   url.searchParams.set("offer_type", offerType);
//   url.searchParams.set("device", device);

//   axios
//     .get(url)
//     .then(res => {
//       // const offers = {}
//       // console.log(res.data.offers);
//       dispatch({
//         type: GET_OFFERS,
//         payload: res.data.offers
//       });
//     })
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
export const setOffersLoading = () => {
  return {
    type: OFFERS_LOADING
  };
};
