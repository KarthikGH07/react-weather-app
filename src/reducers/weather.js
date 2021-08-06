import { FETCH_LOCAL_WEATHER, SEARCH_WEATHER, SET_LOADING } from '../constants/actionTypes';

const initialState = { loading: false };
const weather = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCAL_WEATHER:
      return { ...state, ...action.payload, loading: false };
    case SEARCH_WEATHER:
      return { ...state, ...action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default weather;
