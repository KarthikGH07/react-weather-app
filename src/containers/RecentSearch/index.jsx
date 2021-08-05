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

  // const handleButtonClick = (id = 0, data = {}) => {
  //   if (location.pathname === '/favourite') {
  //     dispatch(removeFavourite(id));
  //   } else {
  //     if (!data.favourite) dispatch(addToFavourites(data));
  //   }
  // };

  return (
    <>
      <Wrapper>
        {recents.length > 0 ? (
          <>
            <div className="controls">
              <p className="favourite-count">You recently searched for</p>
              <button className="btn-remove" onClick={() => dispatch(removeAllRecents())}>
                Clear All
              </button>
            </div>
            <ul>
              {recents.map((city) => {
                console.log(favourites.map((obj) => obj['id'] === city.id)[0]);
                if (favourites.map((obj) => obj['id'] === city.id)[0]) {
                  return (
                    <ListItem
                      data={{ ...city, favourite: true }}
                      key={city.id}
                      // //eslint-disable-next-line
                      // handleButtonClick={(id, obj) => handleButtonClick(id)}
                    />
                  );
                } else {
                  return (
                    <ListItem
                      data={city}
                      key={city.id}
                      // handleButtonClick={(id, obj) => handleButtonClick(obj)}
                    />
                  );
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
  }
  ul::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

export default RecentSearch;
