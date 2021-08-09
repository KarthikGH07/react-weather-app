import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import WeatherCard from './WeatherCard';

const Footer = () => {
  const weather = useSelector((state) => state.weather).data;

  return (
    <Wrapper className="footer">
      <div className="centered-footer">
        <WeatherCard
          data={{
            title: 'temperature',
            value: { min: weather?.temp_min, max: weather?.temp_max },
          }}
        />
        <WeatherCard
          data={{
            title: 'precipitation',
            value: `${weather?.pop}`,
          }}
        />
        <WeatherCard data={{ title: 'humidity', value: weather?.humidity }} />
        <WeatherCard data={{ title: 'wind', value: weather?.wind_speed }} />
        <WeatherCard data={{ title: 'visibility', value: weather?.visibility }} />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;

  .centered-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    display: flex;
    justify-content: center;
    margin: 0 7.5rem 3rem 7.5rem;
    padding-top: 2rem;
  }

  .centered-footer::-webkit-scrollbar {
    height: 5px;
    background: transparent;
  }
  /* Track */
  .centered-footer::-webkit-scrollbar-track {
    background-color: transparent;
  }

  /* Handle */
  .centered-footer::-webkit-scrollbar-thumb {
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 0.938rem;
  }

  @media only screen and (max-width: 576px) {
    background-color: rgba(255, 255, 255, 0.1);
    height: max-content;

    .centered-footer {
      margin: 0 0 1rem 0;
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 0.5rem;
      overflow-x: auto;
      overflow-y: hidden;
      display: -webkit-box;
      display: -moz-box;
    }
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    background-color: rgba(255, 255, 255, 0.1);
    .centered-footer {
      margin: 0 2rem 1rem 2rem;
      overflow-x: auto;
      overflow-y: hidden;
      display: -webkit-box;
      padding-bottom: 1rem;
    }
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    background-color: rgba(255, 255, 255, 0.1);
    .centered-footer {
      margin: 0 3rem 1rem 3rem;
      gap: 3rem;
      overflow-x: auto;
      overflow-y: hidden;
      display: -webkit-box;
      padding-bottom: 1rem;
    }
  }

  @media screen and (min-width: 2000px) {
    .centered-footer {
      margin: 0 20rem 5rem 20rem;
      padding-top: 3rem;
    }
  }
`;

export default Footer;
