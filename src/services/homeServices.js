import axios from 'axios';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getLatLongWeather = async (lat, lon) => {
  const result = await (
    await axios.get(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_APP_ID}&units=metric`,
    )
  ).data;
  return result;
};

export const searchWeather = async (query) => {
  const result = await (
    await axios.get(`${BASE_URL}?q=${query}&appid=${process.env.REACT_APP_APP_ID}&units=metric`)
  ).data;
  return result;
};
