import {
  PRODUCTS_LIST_REQUEST,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAILURE,
  PRODUCTS_DETAILS_REQUEST,
  PRODUCTS_DETAILS_SUCCESS,
  PRODUCTS_DETAILS_FAILURE,
} from '../constants/productConstants';

export const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCTS_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCTS_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCTS_DETAILS_REQUEST:
      return { loading: true, product: [] };
    case PRODUCTS_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCTS_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
