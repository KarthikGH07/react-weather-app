import {
  FILTER_FAVOURITES,
  ADD_TO_FAVOURITES,
  REMOVE_FAVOURITE,
  GET_FAVOURITES,
  REMOVE_ALL_FAVOURITES,
} from '../constants/actionTypes';

export const getFavourites = () => {
  const data = JSON.parse(localStorage.getItem('weather-app')) || { recent: [], favourite: [] };
  return { type: GET_FAVOURITES, payload: data.favourite };
};

export const addToFavourites = (weatherData) => async (dispatch) => {
  let oldData = JSON.parse(localStorage.getItem('weather-app')) || { recent: [], favourite: [] };
  console.log(oldData?.favourite.some((obj) => obj.id === weatherData.id));
  if (oldData?.favourite.some((obj) => obj.id === weatherData.id)) {
    dispatch(removeFavourite(weatherData.id));
  } else {
    localStorage.setItem(
      'weather-app',
      JSON.stringify({ ...oldData, favourite: [...oldData.favourite, weatherData] }),
    );
    dispatch({ type: ADD_TO_FAVOURITES, payload: weatherData });
  }
};

export const removeFavourite = (id) => {
  let oldData = JSON.parse(localStorage.getItem('weather-app'));
  const filteredData = oldData.favourite.filter((obj) => obj.id !== id);
  localStorage.setItem('weather-app', JSON.stringify({ ...oldData, favourite: filteredData }));
  return { type: REMOVE_FAVOURITE, payload: id };
};

export const filterFavourite = (query) => {
  return { type: FILTER_FAVOURITES, payload: query };
};

export const removeAllFavourites = () => {
  let oldData = JSON.parse(localStorage.getItem('weather-app'));
  localStorage.setItem('weather-app', JSON.stringify({ ...oldData, favourite: [] }));
  return { type: REMOVE_ALL_FAVOURITES };
};
