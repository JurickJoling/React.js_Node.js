import { ADD_BUNDLES, ADD_BUNDLE, SHOW_BUNDLE, REMOVE_BUNDLE } from '../constants/Bundle';

const defaultState = {
  items: [],
  item: {}
};

export default function BundleReducer(state = defaultState, { type, items, item, itemId }) {
  switch (type) {
    case ADD_BUNDLES:
      return {
        ...state,
        items
      };

    case ADD_BUNDLE:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case SHOW_BUNDLE:
      return {
        ...state,
        item
      };

    case REMOVE_BUNDLE:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
