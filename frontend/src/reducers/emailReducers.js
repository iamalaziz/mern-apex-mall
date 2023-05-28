import { VERIFY_EMAIL_FAIL, VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS } from "../constants/emailConstants";

export const emailReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_EMAIL_REQUEST:
      return { loading: true };
    case VERIFY_EMAIL_SUCCESS:
      return { loading: false, status: true };
    case VERIFY_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};