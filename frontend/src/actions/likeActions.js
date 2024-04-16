import axios from 'axios';
import { LIKE_ADD_ITEM, LIKE_REMOVE_ITEM } from '../constants/likeConstants';

export const addToLiked = (productId) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${productId}`);

  dispatch({
    type: LIKE_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
    },
  });

  localStorage.setItem(
    'likedItems',
    JSON.stringify(getState().liked.likedItems)
  );
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: LIKE_REMOVE_ITEM, payload: id });
  localStorage.setItem(
    'likedItems',
    JSON.stringify(getState().liked.likedItems)
  );
};
