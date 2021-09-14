import { USER_ACTIVATE_FAIL, USER_ACTIVATE_SUCCESS } from "./types";
import { tokenConfig } from "./authAction";
import axios from "axios";
import { returnErrors } from "./errorAction";

export const sendEmail = email => (dispatch, getState) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // Request body
  const body = JSON.stringify(email);
  axios
    .get("/send", body, config)
    .then(() => {
      // const offers = {}
      // console.log(res.data.offers);
      dispatch({
        type: EMAIL_SENT
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
