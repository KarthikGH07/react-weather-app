import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WeatherCard from './common/WeatherCard';
import FavouriteIcon from '../../assets/icons/icon_favourite.png';
import FavouriteActiveIcon from '../../assets/icons/icon_favourite_Active.svg';
import TempToggle from './common/TempToggle';
import { getIconId } from '../../utils/helpers';
import AppLogo from '../../assets/icons/logo_web.png';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocalWeather } from '../../actions/weather';
import { addToFavourites } from '../../actions/favourites';
import { addToRecents } from '../../actions/recentSearch';

const Home = () => {
  const weather = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const [favourite, setFavourite] = useState(false);
  const [tempUnit, setTempUnit] = useState('c');

  useEffect(() => {
    dispatch(fetchLocalWeather());
  }, []);

  useEffect(() => {
    if (Object.keys(weather).length) {
      let oldData = JSON.parse(localStorage.getItem('weather-app')) || {
        recent: [],
        favourite: [],
      };
      if (oldData.favourite.some((obj) => obj.id === weather.id)) {
        const selected = oldData.favourite.find((obj) => obj.id === weather.id).favourite;
        setFavourite(selected);
      } else setFavourite(false);

      dispatch(
        addToRecents({
          id: weather.id,
          city: `${weather?.name}, ${weather?.sys?.country}`,
          weather: {
            main: weather?.weather[0]?.description,
            temp: weather?.main?.temp,
            icon: weather?.weather[0]?.icon,
          },
        }),
      );
    }
  }, [weather]);

  const toggleTemperature = () => {
    if (tempUnit === 'c') {
      setTempUnit('f');
    } else {
      setTempUnit('c');
    }
  };

  const handleFavourite = () => {
    dispatch(
      addToFavourites({
        id: weather.id,
        city: `${weather?.name}, ${weather?.sys?.country}`,
        weather: {
          main: weather?.weather[0]?.description,
          temp: weather?.main?.temp,
          icon: weather?.weather[0]?.icon,
        },
        favourite: !favourite,
      }),
    );
    setFavourite(!favourite);
  };

  if (!Object.keys(weather).length) {
    return (
      <div className="loading">
        <img src={AppLogo} alt="Loading" />
      </div>
    );
  }

  return (
    <>
      <Wrapper iconID={Object.keys(weather).length ? getIconId(weather?.weather[0].icon) : ''}>
        <section className="city-container">
          <h2>
            {weather?.name}, {weather?.sys?.country}
          </h2>
          <div>
            <img
              className="favourite-icon"
              src={favourite ? FavouriteActiveIcon : FavouriteIcon}
              alt="favourite"
              onClick={handleFavourite}
            />
            <span className={`favourite ${favourite && 'active'}`}>
              {favourite ? 'Added to favourite' : 'Add to favourite'}
            </span>
          </div>
        </section>
        {Object.keys(weather).length !== 0 && (
          <>
            <section className="temp-container">
              <img className="weather-icon" alt="weather" />
              <div className="temp-toggle">
                <h1 className="temp">
                  {tempUnit === 'f'
                    ? Math.round(weather?.main?.temp * 1.8 + 32)
                    : Math.round(weather?.main?.temp)}
                </h1>
                <TempToggle tempUnit={tempUnit} toggleTemperature={toggleTemperature} />
              </div>
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
                <WeatherCard
                  data={{
                    title: 'precipitation',
                    value: weather['rain'] !== undefined ? `${weather?.rain['1h']}` : 0,
                  }}
                />
                <WeatherCard data={{ title: 'humidity', value: weather?.main?.humidity }} />
                <WeatherCard data={{ title: 'wind', value: weather?.wind?.speed }} />
                <WeatherCard data={{ title: 'visibility', value: weather?.visibility }} />
              </div>
            </section>
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  margin: 3rem 0;

  .city-container {
    display: flex;
    flex-direction: column;
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

  .city-container div {
    margin-top: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.325rem;
  }

  .city-container img {
    width: 18px;
    height: 17px;
  }

  .city-container .favourite {
    color: #ffffff;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 15px;
  }

  .favourite.active {
    color: #fad05b;
  }

  .temp-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .temp-container .weather-icon {
    height: 84px;
    width: 80px;
    content: ${(props) => `url(./assets/icons/icon_${props.iconID}.svg)`};
  }

  .temp-container .temp {
    color: #ffffff;
    font-size: 64px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 75px;
    margin: 0;
  }

  .temp-toggle {
    display: flex;
    align-items: center;
    gap: 6px;
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

  @media only screen and (max-width: 500px) {
    margin: 0.625rem 0;
    .city-container {
      align-items: center;
      margin-bottom: 2rem;
    }
    .city-container h2 {
      font-size: 18px;
      line-height: 21px;
    }
    .temp-container {
      margin-top: 4rem;
    }
    .temp-container .temp {
      font-size: 52px;
      line-height: 61px;
    }
    .description {
      font-size: 18px;
      line-height: 21px;
    }
    .footer {
      background-color: rgba(255, 255, 255, 0.1);
      height: max-content;
    }
    .centered-footer {
      margin: 0 1rem 1.8rem 1rem;
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
    .centered-footer::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }
`;

export default Home;
