import {
  ADD_TO_FAVOURITES,
  FILTER_FAVOURITES,
  REMOVE_FAVOURITE,
  GET_FAVOURITES,
  REMOVE_ALL_FAVOURITES,
} from '../constants/actionTypes';

const initialState = [];

const favourites = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVOURITES:
      return [...action.payload];
    case ADD_TO_FAVOURITES:
      return [...state, action.payload];
    case REMOVE_FAVOURITE: {
      const newState = state.filter((obj) => obj.id !== action.payload);
      console.log(newState);
      return [...newState];
    }
    case FILTER_FAVOURITES:
      console.log(action.payload);
      if (!action.payload) {
        return JSON.parse(localStorage.getItem('weather-app')).favourite || [];
      }
      return [
        ...state.filter((obj) => obj.city.toLowerCase().includes(action.payload.toLowerCase())),
      ];
    case REMOVE_ALL_FAVOURITES:
      return [];
    default:
      return state;
  }
};

export default favourites;
