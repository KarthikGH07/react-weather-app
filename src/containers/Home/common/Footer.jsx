import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import WeatherCard from './WeatherCard';

const Footer = () => {
  const weather = useSelector((state) => state.weather);

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
    gap: 3rem;
    justify-content: center;
    margin: 0 7.5rem 3rem 7.5rem;
    padding-top: 2rem;
  }

  .centered-footer::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }

  @media only screen and (max-width: 576px) {
    background-color: rgba(255, 255, 255, 0.1);
    height: max-content;

    .centered-footer {
      margin: 0 0 1.8rem 0;
      padding-left: 1rem;
      padding-right: 1rem;
      overflow-x: auto;
      gap: 2rem;
      display: -webkit-box;
      cursor: default;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    background-color: rgba(255, 255, 255, 0.1);
    .centered-footer {
      margin: 0 2rem 2rem 2rem;
      gap: 2rem;
      overflow-x: auto;
      display: -webkit-box;
    }
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    background-color: rgba(255, 255, 255, 0.1);
    .centered-footer {
      margin: 0 3rem 3rem 3rem;
      gap: 3rem;
      overflow-x: auto;
      display: -webkit-box;
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
