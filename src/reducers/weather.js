import {
  FETCH_LOCAL_WEATHER,
  SEARCH_WEATHER,
  SET_LOADING,
  SET_UNIT,
  SET_ERROR,
} from '../constants/actionTypes';

const initialState = { data: {}, loading: false, unit: 'metric', error: false };
const weather = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOCAL_WEATHER:
      return { ...state, data: action.payload, loading: false };
    case SEARCH_WEATHER:
      if (!action.payload) {
        return { ...state, loading: false, error: true };
      }
      return { ...state, data: action.payload, loading: false };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_UNIT:
      return { ...state, unit: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default weather;
