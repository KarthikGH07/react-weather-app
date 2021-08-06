import axios from 'axios';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getLatLongWeather = async (lat, lon) => {
  const result = await (
    await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_APP_ID}&units=metric`,
    )
  ).data;

  const detailedData = await fetchDetailedWeatherData(result.coord.lat, result.coord.lon);
  const weatherData = mapResponseProperties(result, detailedData);
  return weatherData;
};

export const getWeather = async (query) => {
  const result = await (
    await axios.get(
      `${BASE_URL}/weather?q=${query}&appid=${process.env.REACT_APP_APP_ID}&units=metric`,
    )
  ).data;
  const detailedData = await fetchDetailedWeatherData(result.coord.lat, result.coord.lon);
  const weatherData = mapResponseProperties(result, detailedData);
  return weatherData;
};

const fetchDetailedWeatherData = async (lat, lon) => {
  const detailedWeatherData = await (
    await axios.get(
      `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,current, alerts,hourly&appid=${process.env.REACT_APP_APP_ID}&units=metric`,
    )
  ).data;
  return detailedWeatherData;
};

const mapResponseProperties = (result1, result2) => {
  return {
    id: result1.id,
    name: result1.name,
    country: result1.sys.country,
    timezone: result2.timezone,
    dt: result1.dt,
    cod: result1.cod,
    icon: result1.weather[0].icon,
    description: result1.weather[0].description,
    temp: result1.main.temp,
    humidity: result1.main.humidity,
    visibility: result1.visibility,
    wind_speed: result1.wind.speed,
    temp_min: result2.daily[0].temp.min,
    temp_max: result2.daily[0].temp.max,
    pop: result2.daily[0].pop,
  };
};
