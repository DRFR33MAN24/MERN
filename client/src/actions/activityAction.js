import { GET_ACTIVITY, ACTIVITY_LOADING, SUB_PAYMENT, SUB_FAIL } from "./types";
import { tokenConfig, loadUser } from "./authAction";
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
      // console.log(res.data);
      dispatch({
        type: GET_ACTIVITY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const submitPayment = subid => (dispatch, getState) => {
  dispatch(setActivityLoading());

  console.log("activity payment action called");
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // };
  const body = JSON.stringify({ subid });
  axios
    .post("/api/activity/payment", body, tokenConfig(getState))
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_ACTIVITY,
        payload: res.data
      });
    })
    .then(() => dispatch(loadUser()))

    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "SUB_FAIL")
      );
      dispatch({ type: SUB_FAIL });
    });
};

export const setActivityLoading = () => {
  return {
    type: ACTIVITY_LOADING
  };
};
