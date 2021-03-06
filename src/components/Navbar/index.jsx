import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import moment from 'moment-timezone';
import OutsideAlerter from '../OutsiteClickAlerter';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const weather = useSelector((state) => state.weather).data;
  const [date, setDate] = useState(moment().format('ddd, DD MMM YYYY  hh:mm A'));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (Object.keys(weather).length) {
      setDate(moment.unix(weather?.dt).tz(weather?.timezone).format('ddd, DD MMM YYYY  hh:mm A'));
    }
  }, [weather]);

  return (
    <>
      <OutsideAlerter handlePress={() => setIsMenuOpen(false)}>
        <Wrapper className={isMenuOpen ? 'active' : ''}>
          <div
            className={isMenuOpen ? 'hamburger active' : 'hamburger'}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
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
          <div className="date-time">
            {date.split('  ').map((item, index) => {
              if (index === 1) {
                return (
                  <span key={item} className="time">
                    &nbsp;&nbsp;&nbsp;&nbsp;{item}
                  </span>
                );
              } else
                return (
                  <span key={item} className="date">
                    {item}
                  </span>
                );
            })}
          </div>
        </Wrapper>
      </OutsideAlerter>
      <span className="date-time-mobile">{date}</span>
    </>
  );
};

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  .navbar-links {
    padding-bottom: 5px;
  }

  a {
    color: #ffffff;
    font-size: 13px;
    letter-spacing: 0;
    line-height: 15px;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 2rem;
    padding: 0 1rem;
    padding-bottom: 5px;
  }

  a:hover {
    color: #ffd639;
  }

  .selected {
    color: #ffd639;
    font-weight: 500;
    border-bottom: 2px solid #ffd639;
    padding-bottom: 4px;
  }

  .date-time {
    margin-right: 1rem;
    padding-bottom: 5px;
  }

  .date-time span {
    color: #ffffff;
    font-size: 14px;
    letter-spacing: 0;
    line-height: 16px;
  }

  .hamburger {
    display: none;
    margin-left: 1rem;
  }

  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: #fff;
  }

  @media only screen and (max-width: 576px) {
    border: none;
    position: fixed;
    left: -150%;
    top: 0;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    height: 100%;
    text-align: left;
    transition: 0.6s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding-top: 5rem;

    &.active {
      left: -40%;
      .bar {
        background-color: #000000;
      }
    }

    .navbar-links {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 40%;
    }

    a {
      margin: 2.5rem 0;
      color: #707070;
      font-size: 14px;
      line-height: 36px;
      margin: 0;
      font-weight: 600;
    }

    a:hover {
      color: #000000;
    }

    .selected {
      color: #000000;
      font-weight: 600;
      border: none;
    }

    .hamburger {
      display: block;
      cursor: pointer;
      left: 0;
      top: 2rem;
      position: fixed;
      z-index: 2;
    }

    .date-time {
      display: none;
    }

    .hamburger.active .bar:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    a {
      margin-right: 0.625rem;
    }
  }
`;

export default Navbar;
