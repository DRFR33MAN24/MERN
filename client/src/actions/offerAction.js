import { GET_OFFERS, OFFERS_LOADING } from "./types";
import { tokenConfig } from "./authAction";
import axios from "axios";
import { returnErrors } from "./errorAction";

export const getOffers = () => (dispatch, getState) => {
  dispatch(setOffersLoading());
  axios
    .get("/api/offers", tokenConfig(getState))
    .then(res => {

      console.log(res.data);
      dispatch({
        type: GET_OFFERS,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// const url = new URL("https://cpalead.com/dashboard/reports/campaign_json.php?id=1721323");
// export const getOffers = (subid, number, country, offerType, device) => (dispatch, getState) => {
//   dispatch(setOffersLoading());

//   url.searchParams.set('subid', subid);
//   url.searchParams.set('show', number);
//   url.searchParams.set('country', country);
//   url.searchParams.set('offer_type', offerType);
//   url.searchParams.set('device', device);

//   axios
//     .get(url, tokenConfig(getState))
//     .then(res => {
//       // const offers = {}
//       dispatch({
//         type: GET_OFFERS,
//         payload: res.data
//       })
//     }
//     )
//     .catch(err =>
//       dispatch(returnErrors(err.response.data, err.response.status))
//     );
// };
export const setOffersLoading = () => {
  return {
    type: OFFERS_LOADING
  };
};
