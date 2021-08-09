import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Popup = ({ content, onCancel, onSubmit }) => {
  return (
    <PopupBox>
      <div className="box">
        <h3>{content}</h3>
        <div className="controls">
          {onCancel && (
            <button className="cancel-btn" onClick={onCancel}>
              No
            </button>
          )}
          <button className="submit-btn" onClick={onSubmit}>
            {onCancel ? 'Yes' : 'Okay'}
          </button>
        </div>
      </div>
    </PopupBox>
  );
};

const PopupBox = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    position: relative;
    margin: 0 auto;
    height: auto;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #999;
    overflow: auto;
    height: 210px;
    width: 458px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h3 {
    color: #000000;
    font-size: 15px;
    letter-spacing: 0;
    line-height: 18px;
    text-align: center;
    margin-bottom: 4rem;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cancel-btn {
    color: #000000;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 18px;
    outline: none;
    background: transparent;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    margin-right: 1.5rem;
  }

  .submit-btn {
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 18px;
    border-radius: 2px;
    background-color: #f76b1c;
    outline: none;
    border: none;
    padding: 0.5rem 2.5rem;
    text-transform: uppercase;
    cursor: pointer;
  }

  @media only screen and (max-width: 576px) {
    .box {
      width: 300px;
      height: 180px;
    }
    h3 {
      font-size: 12px;
      line-height: 15px;
      margin-bottom: 2rem;
    }
  }
`;

Popup.propTypes = {
  content: PropTypes.node,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Popup;
