import axios from 'axios';
import {
  PRODUCTS_LIST_FAILURE,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_REQUEST,
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUEST });

    const { data } = await axios.get('/api/products');
    dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
