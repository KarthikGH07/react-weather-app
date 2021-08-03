import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getLatLongWeather, searchWeather } from '../../services/homeServices';
import WeatherCard from './common/WeatherCard';
import Header from '../../components/Header';

const Home = () => {
  const [weather, setWeather] = useState();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        getLatLongWeather(position.coords.latitude, position.coords.longitude).then((res) =>
          setWeather(res),
        );
      });
    };
    fetchWeather();
  }, []);

  const handleSearch = (query) => {
    searchWeather(query).then((res) => setWeather(res));
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      <Wrapper>
        <section className="city-container">
          <h2>
            {weather?.name}, {weather?.sys?.country}
          </h2>
        </section>
        <section className="temp-container">
          <img
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt="weather"
          />
          <h1 className="temp">{Math.round(weather?.main?.temp)}</h1>
          <p className="description">{weather?.weather[0]?.description}</p>
        </section>
        <section className="footer">
          <div className="centered-footer">
            <WeatherCard
              data={{
                title: 'temperature',
                value: { min: weather?.main?.temp_min, max: weather?.main?.temp_min },
              }}
            />
            <WeatherCard data={{ title: 'precipitation', value: weather?.main?.pressure }} />
            <WeatherCard data={{ title: 'humidity', value: weather?.main?.humidity }} />
            <WeatherCard data={{ title: 'wind', value: weather?.wind?.speed }} />
            <WeatherCard data={{ title: 'visibility', value: weather?.visibility }} />
          </div>
        </section>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  margin: 3rem 7.5rem;

  .city-container {
    display: flex;
    justify-content: flex-start;
  }

  .city-container h2 {
    margin: 0;
    color: #ffffff;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 24px;
  }

  .temp-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
  }

  .temp-container .weather-icon {
    height: 6.25rem;
    width: 6.25rem;
  }

  .temp-container .temp {
    color: #ffffff;
    font-size: 64px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 75px;
    margin: 0;
  }

  .description {
    color: #ffffff;
    font-size: 22px;
    letter-spacing: 0;
    line-height: 25px;
    margin: 0.625rem;
    text-transform: capitalize;
  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .centered-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    gap: 3rem;
    justify-content: center;
    margin: 0 7.5rem 3rem 7.5rem;
    padding-top: 2rem;
  }
`;

export default Home;
