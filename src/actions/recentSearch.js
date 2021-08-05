import {
  FILTER_RECENTS,
  ADD_TO_RECENT,
  GET_RECENTS,
  REMOVE_ALL_RECENTS,
} from '../constants/actionTypes';

export const getRecents = () => {
  const data = JSON.parse(localStorage.getItem('weather-app')) || { recent: [], favourite: [] };
  return { type: GET_RECENTS, payload: data.recent };
};

export const addToRecents = (weatherData) => async (dispatch) => {
  let oldData = JSON.parse(localStorage.getItem('weather-app')) || { recent: [], favourite: [] };
  if (oldData?.recent.some((obj) => obj.id === weatherData.id)) {
    console.log('move up');
  } else {
    localStorage.setItem(
      'weather-app',
      JSON.stringify({ ...oldData, recent: [...oldData.recent, weatherData] }),
    );
    dispatch({ type: ADD_TO_RECENT, payload: weatherData });
  }
};

export const filterRecents = (query) => {
  return { type: FILTER_RECENTS, payload: query };
};

export const removeAllRecents = () => {
  let oldData = JSON.parse(localStorage.getItem('weather-app'));
  localStorage.setItem('weather-app', JSON.stringify({ ...oldData, recent: [] }));
  return { type: REMOVE_ALL_RECENTS };
};
