import {
  FETCH_LOCAL_WEATHER,
  SEARCH_WEATHER,
  SET_LOADING,
  SET_UNIT,
  SET_ERROR,
} from '../constants/actionTypes';
import { getLatLongWeather, getWeather } from '../services/homeServices';

export const fetchLocalWeather = () => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  await navigator.geolocation.getCurrentPosition(
    (position) => {
      getLatLongWeather(position.coords.latitude, position.coords.longitude).then((res) =>
        dispatch({ type: FETCH_LOCAL_WEATHER, payload: res }),
      );
    },
    (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    },
    {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    },
  );
};

export const searchWeather = (query) => async (dispatch) => {
  dispatch({ type: SET_LOADING });
  await getWeather(query).then((res) => dispatch({ type: SEARCH_WEATHER, payload: res }));
};

export const setUnit = (value) => {
  const weatherAppData = JSON.parse(localStorage.getItem('weather-app'));
  if (!weatherAppData) {
    localStorage.setItem('weather-app', JSON.stringify({ recent: [], favourite: [], unit: value }));
  } else {
    localStorage.setItem('weather-app', JSON.stringify({ ...weatherAppData, unit: value }));
  }
  return { type: SET_UNIT, payload: value };
};

export const setError = (value) => {
  return { type: SET_ERROR, payload: value };
};
