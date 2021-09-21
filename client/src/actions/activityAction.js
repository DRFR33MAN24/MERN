import { GET_ACTIVITY, ACTIVITY_LOADING } from "./types";
import { tokenConfig } from "./authAction";
import axios from "axios";
import { returnErrors } from "./errorAction";

export const getActivity = subid => dispatch => {
  dispatch(setActivityLoading());
  console.log("activity action called");
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ subid });
  axios
    .post("/api/activity", body, config)
    .then(res => {
      //console.log(res.data.offers);
      dispatch({
        type: GET_ACTIVITY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setActivityLoading = () => {
  return {
    type: ACTIVITY_LOADING
  };
};
