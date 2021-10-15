import { GET_NOTIFICATIONS } from "./types";
import { tokenConfig } from "./authAction";
import axios from "axios";
import { returnErrors } from "./errorAction";

export const getNotifications = subid => dispatch => {
  // dispatch(setOffersLoading());
  //console.log(country, device, subid);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ subid });
  axios
    .post("/api/notifications", body, config)
    .then(res => {
      //console.log(res.data.offers);
      dispatch({
        type: GET_NOTIFICATIONS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
