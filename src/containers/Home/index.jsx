import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FavouriteIcon from '../../assets/icons/icon_favourite.png';
import FavouriteActiveIcon from '../../assets/icons/icon_favourite_Active.svg';
import TempToggle from './common/TempToggle';
import { getIconId } from '../../utils/helpers';
import AppLogo from '../../assets/icons/logo_web.png';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocalWeather } from '../../actions/weather';
import { addToFavourites } from '../../actions/favourites';
import { addToRecents } from '../../actions/recentSearch';
import Footer from './common/Footer';

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
          city: `${weather?.name}, ${weather?.country}`,
          weather: {
            main: weather?.description,
            temp: weather?.temp,
            icon: weather?.icon,
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
        city: `${weather?.name}, ${weather?.country}`,
        weather: {
          main: weather?.description,
          temp: weather?.temp,
          icon: weather?.icon,
        },
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
      <Wrapper iconID={Object.keys(weather).length ? getIconId(weather?.icon) : ''}>
        <section className="city-container">
          <h2>
            {weather?.name}, {weather?.country}
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
                    ? Math.round(weather?.temp * 1.8 + 32)
                    : Math.round(weather?.temp)}
                </h1>
                <TempToggle tempUnit={tempUnit} toggleTemperature={toggleTemperature} />
              </div>
              <p className="description">{weather?.description}</p>
            </section>
            <Footer />
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
    font-size: 1.25rem;
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
    font-size: 4rem;
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

  @media only screen and (max-width: 576px) {
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
  }

  @media only screen and (min-height: 869px) {
    .temp-container {
      margin-top: 6rem;
    }
  }

  @media only screen and (min-width: 1024px) and (min-height: 1025px) {
    .city-container h2 {
      font-size: 2rem;
    }

    .city-container .favourite {
      font-size: 1rem;
    }

    .temp-container {
      margin-top: 14rem;
    }

    .temp-container .weather-icon {
      height: 6.25rem;
      width: 6.5rem;
    }

    .temp-container .temp {
      font-size: 6rem;
    }

    .description {
      font-size: 2rem;
      font-weight: 400;
    }
  }
`;

export default Home;
