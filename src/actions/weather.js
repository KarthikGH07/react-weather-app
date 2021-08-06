import { FETCH_LOCAL_WEATHER, SEARCH_WEATHER, SET_LOADING } from '../constants/actionTypes';
import { getLatLongWeather, getWeather } from '../services/homeServices';

export const fetchLocalWeather = () => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  await navigator.geolocation.getCurrentPosition((position) => {
    getLatLongWeather(position.coords.latitude, position.coords.longitude).then((res) =>
      dispatch({ type: FETCH_LOCAL_WEATHER, payload: res }),
    );
  });
};

export const searchWeather = (query) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  await getWeather(query).then((res) => dispatch({ type: SEARCH_WEATHER, payload: res }));
};
