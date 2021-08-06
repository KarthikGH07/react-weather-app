import { combineReducers } from 'redux';
import weather from './weather';
import favourites from './favourites';
import recents from './recentSearch';

export default combineReducers({ weather, favourites, recents });
