import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppLogo from '../../assets/icons/logo_web.png';
import SearchIcon from '../../assets/icons/icon_search_white.svg';

const Header = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const handleSearchTextChange = (e) => {
    let charCode = typeof e.which == 'number' ? e.which : e.keyCode;
    if (charCode === 13) {
      handleSearch(e.target.value);
      setSearchQuery('');
    }
  };
  return (
    <Wrapper>
      <img className="logo" src={AppLogo} alt="logo" />
      <div className="search-bar-container">
        <img
          className="search-icon"
          src={SearchIcon}
          alt="search-icon"
          onClick={() => {
            handleSearch(searchQuery);
            setSearchQuery('');
          }}
        />
        <input
          className="search-bar"
          type="text"
          placeholder="Search city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

Header.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  handleSearch: PropTypes.func,
};

export default Header;
