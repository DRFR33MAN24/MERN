import { GET_NOTIFICATIONS } from "../actions/types";

const initialState = {
    notifications: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            };


        default:
            return state;
    }
}
