import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TempToggle = ({ tempUnit, toggleTemperature }) => {
  return (
    <Wrapper>
      <button
        className={tempUnit === 'c' ? 'celsius selected' : 'celsius '}
        onClick={toggleTemperature}
      >
        &deg;C
      </button>
      <button
        className={tempUnit === 'f' ? 'faranheit selected' : 'faranheit'}
        onClick={toggleTemperature}
      >
        &deg;F
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 16px;
  button {
    width: 28px;
    height: 30px;
    border: 1px solid #ffffff;
    color: #ffffff;
    font-size: 16px;
    letter-spacing: 0;
    line-height: 19px;
    background-color: transparent;
    padding: 2px;
  }
  .celsius {
    border-right: none;
  }

  .faranheit {
    border-left: none;
  }

  .celsius.selected,
  .faranheit.selected {
    background-color: #ffffff;
    color: #e32843;
  }
`;

TempToggle.propTypes = {
  tempUnit: PropTypes.string,
  toggleTemperature: PropTypes.func,
};

export default TempToggle;
