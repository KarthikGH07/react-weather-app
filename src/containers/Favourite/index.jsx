import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListItem from '../../components/ListItem';
import Error from '../../components/Error';
import { useSelector, useDispatch } from 'react-redux';
import { getFavourites, removeAllFavourites } from '../../actions/favourites';
import Popup from '../../components/Popup';

const Favourite = () => {
  const favourites = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getFavourites());
  }, []);

  const onYesClick = () => {
    dispatch(removeAllFavourites());
    setIsOpen(false);
  };

  return (
    <>
      <Wrapper>
        {favourites.length > 0 ? (
          <>
            <div className="controls">
              <p className="favourite-count">{favourites.length} City added as favourite</p>
              <button className="btn-remove" onClick={() => setIsOpen(true)}>
                Remove All
              </button>
            </div>
            <ul>
              {[...favourites].reverse().map((city) => {
                return <ListItem data={city} key={city.id} />;
              })}
            </ul>
          </>
        ) : (
          <Error type="favourite" />
        )}
        {isOpen && (
          <Popup
            content="Are you sure want to remove all the favourites?"
            onCancel={() => setIsOpen(false)}
            onSubmit={onYesClick}
          />
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

export default Favourite;
