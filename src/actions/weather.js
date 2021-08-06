import { FETCH_LOCAL_WEATHER, SEARCH_WEATHER } from '../constants/actionTypes';
import { getLatLongWeather, getWeather } from '../services/homeServices';

export const fetchLocalWeather = () => async (dispatch) => {
  await navigator.geolocation.getCurrentPosition((position) => {
    getLatLongWeather(position.coords.latitude, position.coords.longitude).then((res) =>
      dispatch({ type: FETCH_LOCAL_WEATHER, payload: res }),
    );
  });
};

export const searchWeather = (query) => async (dispatch) => {
  await getWeather(query).then((res) => dispatch({ type: SEARCH_WEATHER, payload: res }));
};
