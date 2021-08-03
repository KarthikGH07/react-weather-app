import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WeatherCard = ({ data }) => {
  return (
    <Wrapper title={data?.title}>
      <div className="icon">
        <img src={''} alt="temperature" />
      </div>
      <div>
        <p className="title">{data.title === 'temperature' ? 'min - max' : data.title}</p>
        <p className="value">
          {data?.title === 'temperature'
            ? `${Math.round(data?.value?.min)}\u{00B0} - ${Math.round(data?.value?.max)}\u{00B0}`
            : data?.title === 'precipitation' || data?.title === 'humidity'
            ? `${data?.value}%`
            : `${data?.value}mph`}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;

  .icon img {
    content: ${(props) => `url(./assets/icons/icon_${props.title}_info.svg)`};
  }

  .title {
    color: #ffffff;
    font-size: 15px;
    letter-spacing: 0;
    line-height: 18px;
    margin: 0;
    text-transform: capitalize;
  }

  .value {
    color: #ffffff;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 25px;
    margin: 0;
  }
`;

WeatherCard.propTypes = {
  data: PropTypes.object,
};

export default WeatherCard;
