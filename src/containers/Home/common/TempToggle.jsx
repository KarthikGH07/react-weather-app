import React from 'react';
import styled from 'styled-components';
import { setUnit } from '../../../actions/weather';
import { useSelector, useDispatch } from 'react-redux';

const TempToggle = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.weather).unit;

  const toggleUnits = () => {
    if (unit === 'metric') {
      dispatch(setUnit('imperial'));
    } else {
      dispatch(setUnit('metric'));
    }
  };

  return (
    <Wrapper>
      <button className={unit === 'metric' ? 'celsius selected' : 'celsius '} onClick={toggleUnits}>
        &deg;C
      </button>
      <button
        className={unit === 'imperial' ? 'faranheit selected' : 'faranheit'}
        onClick={toggleUnits}
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
    cursor: pointer;
  }
  .celsius {
    border-right: none;
    border-radius: 2px 0 0 2px;
  }

  .faranheit {
    border-left: none;
    border-radius: 0 2px 2px 0;
  }

  .celsius.selected,
  .faranheit.selected {
    background-color: #ffffff;
    color: #e32843;
  }
`;

export default TempToggle;
