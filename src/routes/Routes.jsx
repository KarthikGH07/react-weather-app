import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Favourite from '../containers/Favourite';
import Home from '../containers/Home';
import RecentSearch from '../containers/RecentSearch';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favourite" component={Favourite} />
        <Route exact path="/recent" component={RecentSearch} />
      </Switch>
    </>
  );
};

export default Routes;
