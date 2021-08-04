import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import NothingIcon from '../../assets/icons/icon_nothing.svg';
import ListItem from '../../components/ListItem';

const RecentSearch = () => {
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
        {favouriteCity.length > 0 ? (
          <ul>
            {[...favouriteCity].reverse().map((city) => (
              <ListItem data={city} key={city.id} />
            ))}
          </ul>
        ) : (
          <div className="center-div">
            <img src={NothingIcon} alt="nothing" />
            <span>No Recent Search</span>
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
    height: 100%;
  }
  ul::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export default RecentSearch;
