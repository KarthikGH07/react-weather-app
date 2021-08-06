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
        {/* check title and make necessary conversion */}
        <p className="value">
          {data?.title === 'temperature'
            ? `${Math.round(data?.value?.min)}\u{00B0} - ${Math.round(data?.value?.max)}\u{00B0}`
            : data?.title === 'precipitation'
            ? `${(data?.value * 100).toFixed(0)} %`
            : data?.title === 'humidity'
            ? `${data?.value} %`
            : data?.title === 'visibility'
            ? `${(data?.value / 1000).toFixed(1)} km`
            : `${(data?.value * 3.6).toFixed(1)} km/h`}
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

  @media only screen and (max-width: 576px) {
    .title {
      font-size: 13px;
      line-height: 15px;
      white-space: nowrap;
    }
    .value {
      font-size: 18px;
      line-height: 21px;
      white-space: nowrap;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    .title {
      font-size: 16px;
      line-height: 17px;
      white-space: nowrap;
    }
    .value {
      font-size: 20px;
      line-height: 22px;
      white-space: nowrap;
    }
  }
`;

WeatherCard.propTypes = {
  data: PropTypes.object,
};

export default WeatherCard;
