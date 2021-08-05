import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppLogo from '../../assets/icons/logo_web.png';
import SearchIcon from '../../assets/icons/icon_search_white.svg';
import SearchIconBlack from '../../assets/icons/icon_search_black.svg';
import { useDispatch } from 'react-redux';
import { searchWeather } from '../../actions/weather';
import { filterFavourite } from '../../actions/favourites';
import { useLocation } from 'react-router-dom';
import { filterRecents } from '../../actions/recentSearch';
import OutsideAlerter from '../OutsiteClickAlerter';

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  useEffect(() => {
    setSearchQuery('');
    setIsSearchBarVisible(false);
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
    setIsSearchBarVisible(false);
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
      {!isSearchBarVisible && (
        <img
          className="search-toggle"
          src={SearchIcon}
          alt="search-icon"
          onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
        />
      )}
      <OutsideAlerter handlePress={() => setIsSearchBarVisible(false)}>
        <div
          className={isSearchBarVisible ? 'search-bar-container active' : 'search-bar-container'}
        >
          <img
            className="search-icon"
            src={isSearchBarVisible ? SearchIconBlack : SearchIcon}
            alt="search-icon"
            onClick={handleSearch}
          />
          <input
            className="search-bar"
            type="text"
            placeholder="Search city"
            value={searchQuery}
            onChange={handleOnChange}
            onKeyPress={handleSearchTextChange}
          />
        </div>
      </OutsideAlerter>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  margin: 2rem 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 3rem;
  align-items: center;
  .logo {
    height: 30px;
    width: 142px;
  }

  .search-toggle {
    display: none;
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

  @media only screen and (max-width: 500px) {
    .logo {
      height: 24px;
      width: 113px;
      margin-left: 4.5rem;
    }
    .search-bar-container {
      display: none;
    }
    .search-bar {
      background-color: #ffffff;
      color: #000000;
      width: 250px;
    }

    .search-bar::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }

    .search-bar-container.active {
      display: block;
      position: fixed;
      right: 2rem;
      top: 2rem;
    }
    .search-toggle {
      display: block;
      cursor: pointer;
      position: fixed;
      right: 1rem;
    }
  }
`;

export default Header;
