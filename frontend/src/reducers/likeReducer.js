import { LIKE_ADD_ITEM, LIKE_REMOVE_ITEM } from '../constants/likeConstants';

export const likeReducer = (state = { likedItems: [] }, action) => {
  switch (action.type) {
    case LIKE_ADD_ITEM:
      const item = action.payload;
      const existItem = state.likedItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          likedItems: state.likedItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          likedItems: [...state.likedItems, item],
        };
      }
    case LIKE_REMOVE_ITEM:
      return {
        ...state,
        likedItems: state.likedItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    default:
      return state;
  }
};
