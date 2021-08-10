import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FavouriteActiveIcon from '../../assets/icons/icon_favourite_Active.svg';
import FavouriteIcon from '../../assets/icons/icon_favourite.png';
import { getIconId } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavourite, addToFavourites } from '../../actions/favourites';
import { setUnit } from '../../actions/weather';
import { useHistory, useLocation } from 'react-router-dom';

const ListItem = ({ data }) => {
  const unit = useSelector((state) => state.weather).unit;
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    dispatch(setUnit(JSON.parse(localStorage.getItem('weather-app')).unit || 'metric'));
  }, []);

  const handleButtonClick = () => {
    if (location.pathname === '/favourite') {
      dispatch(removeFavourite(data.id)); //remove from favourites
    } else {
      if (!data.favourite) dispatch(addToFavourites(data));
      else dispatch(removeFavourite(data.id));
    }
  };

  return (
    <Wrapper iconID={getIconId(data?.weather?.icon)}>
      <div className="weather-li">
        <h3
          onClick={() =>
            history.push({
              pathname: '/',
              state: { city: data.city },
            })
          }
          className="city"
        >
          {data.city}
        </h3>
        <div className="temperature-div">
          <img className="weather-icon" alt={data?.weather?.main} />
          <h1>
            {Math.round(unit === 'metric' ? data?.weather?.temp : data.weather.temp * 1.8 + 32)}
            &nbsp;<span className="degree">&deg;</span>
            <span className="temp-unit">{unit === 'metric' ? 'C' : 'F'}</span>
          </h1>
          <h3>{data?.weather?.main}</h3>
        </div>
      </div>
      <img
        className="fav-icon"
        src={
          location.pathname === '/favourite'
            ? FavouriteActiveIcon
            : data.favourite
            ? FavouriteActiveIcon
            : FavouriteIcon
        }
        alt="favourite"
        onClick={handleButtonClick}
      />
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  margin: 1px 0;
  list-style-type: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    .city {
      color: #ffe539;
    }
  }

  .weather-li {
    display: flex;
    width: 65%;
    align-items: center;
  }

  .city {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 19px;
    margin: 0;
    flex: 0 0 60%;
    cursor: pointer;
  }

  .temperature-div {
    display: flex;
    align-items: center;
  }

  .temperature-div h1 {
    color: #ffffff;
    font-size: 32px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 38px;
    margin: 0 0 0 0.75rem;
  }

  .temperature-div h3 {
    color: #ffffff;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 21px;
    font-weight: 300;
    margin: 0 0.75rem;
    text-transform: capitalize;
    white-space: nowrap;
  }

  h3 .degree {
    font-size: 11px;
    letter-spacing: 0;
    line-height: 13px;
  }

  .temp-unit {
    font-size: 16px;
    letter-spacing: 0;
    line-height: 19px;
    font-weight: 300;
    margin-right: 0.75rem;
  }

  .fav-icon {
    width: 18px;
    height: 17px;
    cursor: pointer;
  }

  .weather-icon {
    content: ${(props) => `url(./assets/icons/icon_${props.iconID}.svg)`};
    max-width: 40px;
    max-height: 30px;
    margin-right: 0.75rem;
  }

  @media only screen and (max-width: 576px) {
    .weather-li {
      flex-direction: column;
      width: auto;
      align-items: stretch;
    }

    .city {
      color: #ffe539;
      font-size: 15px;
      line-height: 18px;
      white-space: nowrap;
      margin-bottom: 0.625rem;
      flex: 0 1 auto;
    }

    .temperature-div img {
      height: 23px;
      width: 22px;
    }

    .temperature-div h1 {
      font-size: 18px;
      line-height: 21px;
    }

    .temperature-div h3 {
      font-size: 14px;
      line-height: 16px;
    }

    .degree {
      font-size: 10px;
      line-height: 11px;
    }

    .temp-unit {
      font-size: 13px;
      line-height: 15px;
    }
  }
`;

ListItem.propTypes = {
  data: PropTypes.object,
};

export default ListItem;
