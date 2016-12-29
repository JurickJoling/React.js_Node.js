import { ADD_ITINERARIES, ADD_ITINERARY, ITINERARY_ERROR, SHOW_ITINERARY, REMOVE_ITINERARY } from '../constants/Itinerary';

const defaultState = {
  items: [],
  item: {},
  errorMessage: null
};

export default function ItineraryReducer(state = defaultState, { type, items, item, itemId, errorMessage }) {
  switch (type) {
    case ADD_ITINERARIES:
      return {
        ...state,
        items
      };

    case ADD_ITINERARY:
      return {
        ...state,
        items: [
          ...state.items,
          item
        ]
      };

    case ITINERARY_ERROR:
      return {
        ...state,
        errorMessage
      };

    case SHOW_ITINERARY:
      return {
        ...state,
        item
      };

    case REMOVE_ITINERARY:
      return {
        ...state,
        items: state.items.filter(i => i.id !== itemId)
      };

    default:
      return state;
  }
}
