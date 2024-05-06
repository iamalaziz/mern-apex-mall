import { LIKE_ADD_ITEM, LIKE_REMOVE_ITEM } from '../constants/likeConstants';

export const likeReducer = (state = { likedItems: [] }, action) => {
  switch (action.type) {
    case LIKE_ADD_ITEM:
      const item = action.payload;
      const existItem = state.likedItems.find((x) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          likedItems: state.likedItems.map((x) =>
            x._id === existItem._id ? item : x
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
          (x) => x._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
