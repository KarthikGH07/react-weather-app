import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const Navbar = () => {
  const [date, setDate] = useState(moment().format('ddd, DD MMM YYYY   hh:mm A'));

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('1');
      setDate(moment().format('ddd, DD MMM YYYY   hh:mm A'));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <div className="navbar-links">
        <NavLink exact to="/" activeClassName="selected">
          Home
        </NavLink>
        <NavLink to="/favourite" activeClassName="selected">
          Favourite
        </NavLink>
        <NavLink to="/recent" activeClassName="selected">
          Recent Search
        </NavLink>
      </div>
      <span className="date-time">{date}</span>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  a {
    color: #ffffff;
    font-size: 13px;
    letter-spacing: 0;
    line-height: 15px;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 2rem;
    padding: 0 1rem;
  }

  a:hover {
    color: #ffd639;
  }

  .selected {
    color: #ffd639;
    font-weight: 500;
    border-bottom: 2px solid #ffd639;
  }

  .date-time {
    color: #ffffff;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 16px;
    padding-bottom: 5px;
  }
`;

export default Navbar;
