import {
  FILTER_RECENTS,
  ADD_TO_RECENT,
  GET_RECENTS,
  REMOVE_ALL_RECENTS,
} from '../constants/actionTypes';

const initialState = [];

const recents = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECENTS:
      return [...action.payload];
    case ADD_TO_RECENT:
      return [...state, action.payload];
    case FILTER_RECENTS:
      console.log(action.payload);
      if (!action.payload) {
        return JSON.parse(localStorage.getItem('weather-app')).recent || [];
      }
      return [
        ...state.filter((obj) => obj.city.toLowerCase().includes(action.payload.toLowerCase())),
      ];
    case REMOVE_ALL_RECENTS:
      return [];
    default:
      return state;
  }
};

export default recents;