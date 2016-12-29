import { ADD_TAGS, ADD_TAG, TAG_ERROR, SHOW_TAG, REMOVE_TAG } from '../constants/Tag';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function TagReducer(state = defaultState, { type, items, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_TAGS:
      return {
        ...state,
        items
      };

    case ADD_TAG:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case TAG_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_TAG:
      return {
        ...state,
        item
      };

    case REMOVE_TAG:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
