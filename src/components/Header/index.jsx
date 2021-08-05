import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppLogo from '../../assets/icons/logo_web.png';
import SearchIcon from '../../assets/icons/icon_search_white.svg';
import { useDispatch } from 'react-redux';
import { searchWeather } from '../../actions/weather';
import { filterFavourite } from '../../actions/favourites';
import { useLocation } from 'react-router-dom';
import { filterRecents } from '../../actions/recentSearch';

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    setSearchQuery('');
  }, [location]);

  const handleSearchTextChange = (e) => {
    let charCode = typeof e.which == 'number' ? e.which : e.keyCode;
    if (charCode === 13) {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (location.pathname === '/') {
      dispatch(searchWeather(searchQuery));
    } else if (location.pathname === '/favourite') {
      dispatch(filterFavourite(searchQuery));
    } else {
      dispatch(filterRecents(searchQuery));
    }
    setSearchQuery('');
  };

  const handleOnChange = (e) => {
    setSearchQuery(e.target.value);
    if (location.pathname === '/favourite') {
      dispatch(filterFavourite(e.target.value));
    } else if (location.pathname === '/recent') {
      dispatch(filterRecents(e.target.value));
    }
  };

  return (
    <Wrapper>
      <img className="logo" src={AppLogo} alt="logo" />
      <div className="search-bar-container">
        <img className="search-icon" src={SearchIcon} alt="search-icon" onClick={handleSearch} />
        <input
          className="search-bar"
          type="text"
          placeholder="Search city"
          value={searchQuery}
          onChange={handleOnChange}
          onKeyPress={handleSearchTextChange}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  margin: 2rem 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding-bottom: 3rem;
  .logo {
    height: 30px;
    width: 142px;
  }

  .search-bar-container {
    position: relative;
  }

  .search-bar {
    height: 45px;
    width: 458px;
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    letter-spacing: 0;
    line-height: 19px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.3);
    outline: none;
    padding-left: 1rem;
  }

  .search-bar::placeholder {
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    letter-spacing: 0;
    line-height: 19px;
  }

  .search-icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

export default Header;
