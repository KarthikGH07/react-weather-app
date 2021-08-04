import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import Navbar from '../../components/Navbar';
import NothingIcon from '../../assets/icons/icon_nothing.svg';

const Favourite = () => {
  const [favouriteCity, setFavouriteCity] = useState([]);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('weather-app'));
    if (favourites) {
      setFavouriteCity(favourites);
    }
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <Wrapper>
        {favouriteCity.length > 0 &&
        favouriteCity.filter((obj) => obj.favourite === true).length > 0 ? (
          <ul>
            {[...favouriteCity].reverse().map((city) => {
              if (city.favourite) {
                return <ListItem data={city} key={city.id} />;
              }
            })}
          </ul>
        ) : (
          <div className="center-div">
            <img src={NothingIcon} alt="nothing" />
            <span>No Favourites added</span>
          </div>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 150px);
  .center-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1.25rem;
  }
  span {
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 21px;
    text-align: center;
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
