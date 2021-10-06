import { SENT_SUCCESS, SENT_FAIL } from "./types";
import { tokenConfig } from "./authAction";
import axios from "axios";
import { returnErrors } from "./errorAction";

export const sendEmail = email => dispatch => {
  console.log("sendEmail enter");
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify({ email });
  console.log(body);
  axios
    .post("/api/email/send", body, config)
    .then(res => {
      console.log("send email get.then");
      // const offers = {}
      // console.log(res.data.offers);
      dispatch({
        type: SENT_SUCCESS,
        payload: res.data.sent
      });
    })
    .catch(err => {
      console.log("SentFail", err);
      dispatch(
        returnErrors(err.response.data, err.response.status, "SENT_FAIL")
      );
    });
};
