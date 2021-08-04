import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import Navbar from '../../components/Navbar';
import Error from '../../components/Error';

const Favourite = () => {
  const [favouriteCity, setFavouriteCity] = useState([]);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('weather-app'));
    if (favourites) {
      setFavouriteCity(favourites);
    }
  }, []);

  const removeAllFavourites = () => {};

  return (
    <>
      <Header />
      <Navbar />
      <Wrapper>
        {favouriteCity.length > 0 &&
        favouriteCity.filter((obj) => obj.favourite === true).length > 0 ? (
          <>
            <div className="controls">
              <p className="favourite-count">
                {favouriteCity.filter((obj) => obj.favourite === true).length} City added as
                favourite
              </p>
              <button className="btn-remove" onClick={removeAllFavourites}>
                Remove All
              </button>
            </div>
            <ul>
              {[...favouriteCity].reverse().map((city) => {
                if (city.favourite) {
                  return <ListItem data={city} key={city.id} />;
                }
              })}
            </ul>
          </>
        ) : (
          <Error type="favourite" />
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 150px);
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.625rem;
  }

  .favourite-count {
    color: #ffffff;
    font-size: 13px;
    letter-spacing: 0;
    line-height: 15px;
  }

  .btn-remove {
    color: #ffffff;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 15px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }

  ul {
    padding: 0;
    margin: 0;
    overflow-y: auto;
  }
  ul::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export default Favourite;
