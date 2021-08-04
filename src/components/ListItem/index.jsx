import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FavouriteActiveIcon from '../../assets/icons/icon_favourite_Active.svg';
import FavouriteIcon from '../../assets/icons/icon_favourite.png';
import { getIconId } from '../../utils/helpers';

const ListItem = ({ data }) => {
  const toggleFavourites = (id) => {
    let oldData = JSON.parse(localStorage.getItem('weather-app')) || [];
    if (oldData.some((obj) => obj.id === id)) {
      const selected = oldData.find((obj) => obj.id === id).favourite;
      oldData.find((obj) => obj.id === id).favourite = !selected;
      localStorage.setItem('weather-app', JSON.stringify(oldData));
    }
  };

  return (
    <Wrapper iconID={getIconId(data.weather.icon)}>
      <h3 className="city">{data.city}</h3>
      <div className="temperature-div">
        <img className="weather-icon" alt={data.weather.main} />
        <h1>
          {Math.round(data?.weather.temp)}&nbsp;<span className="degree">&deg;</span>
          <span className="temp-unit">C</span>
        </h1>
        <h3>{data.weather.main}</h3>
      </div>
      <img
        className="fav-icon"
        src={data.favourite ? FavouriteActiveIcon : FavouriteIcon}
        alt="favourite"
        onClick={() => toggleFavourites(data.id)}
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

  .city {
    color: #ffffff;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 19px;
    margin: 0;
    max-width: 30%;
  }

  .temperature-div {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }

  .temperature-div h1 {
    color: #ffffff;
    font-size: 32px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 38px;
    margin: 0;
  }

  .temperature-div h3 {
    color: #ffffff;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 21px;
    font-weight: 300;
    margin: 0;
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
  }

  .fav-icon {
    width: 18px;
    height: 17px;
    cursor: pointer;
  }

  .weather-icon {
    content: ${(props) => `url(./assets/icons/icon_${props.iconID}.svg)`};
  }
`;

ListItem.propTypes = {
  data: PropTypes.object,
};

export default ListItem;
