import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NothingIcon from '../../assets/icons/icon_nothing.svg';

const Error = ({ type }) => {
  return (
    <Wrapper>
      <img src={NothingIcon} alt="nothing" />
      <span>{type === 'favourite' ? 'No Favourites added' : 'No Recent Search'}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  span {
    color: #ffffff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 21px;
    text-align: center;
    margin-top: 1.25rem;
  }
`;

Error.propTypes = {
  type: PropTypes.string,
};

Error.defaultProps = {
  type: 'recent',
};

export default Error;
