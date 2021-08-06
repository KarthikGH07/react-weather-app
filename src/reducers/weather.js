import { FETCH_LOCAL_WEATHER, SEARCH_WEATHER } from '../constants/actionTypes';

const initialState = {};
const weather = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCAL_WEATHER:
      return { ...state, ...action.payload };
    case SEARCH_WEATHER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default weather;
