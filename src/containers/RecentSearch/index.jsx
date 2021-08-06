import React, { useEffect } from 'react';
import styled from 'styled-components';
import ListItem from '../../components/ListItem';
import Error from '../../components/Error';
import { useDispatch, useSelector } from 'react-redux';
import { getRecents, removeAllRecents } from '../../actions/recentSearch';
import { getFavourites } from '../../actions/favourites';

const RecentSearch = () => {
  const dispatch = useDispatch();
  const recents = useSelector((state) => state.recents);
  const favourites = useSelector((state) => state.favourites);

  useEffect(() => {
    dispatch(getRecents());
    dispatch(getFavourites());
  }, []);

  useEffect(() => {
    dispatch(getFavourites());
  }, [recents]);

  const handleClearButtonClick = () => {
    if (confirm('Are you sure want to clear all the history?')) {
      dispatch(removeAllRecents());
    } else {
      console.log('No');
    }
  };

  return (
    <>
      <Wrapper>
        {recents.length > 0 ? (
          <>
            <div className="controls">
              <p className="favourite-count">You recently searched for</p>
              <button className="btn-remove" onClick={handleClearButtonClick}>
                Clear All
              </button>
            </div>
            <ul>
              {[...recents].reverse().map((city) => {
                if (favourites.some((obj) => obj['id'] === city.id)) {
                  return <ListItem data={{ ...city, favourite: true }} key={city.id} />;
                } else {
                  return <ListItem data={city} key={city.id} />;
                }
              })}
            </ul>
          </>
        ) : (
          <Error />
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  height: calc(100vh - 150px);
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.625rem;
  }

  .favourite-count {
    color: #ffffff;
    font-size: 13px;
    letter-spacing: 0;
    line-height: 15px;
  }

  .btn-remove {
    color: #ffffff;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 15px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  ul {
    padding: 0;
    margin: 0;
    overflow-y: auto;
    max-height: 85%;
  }
  ul::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export default RecentSearch;
