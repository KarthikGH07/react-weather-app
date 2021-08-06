import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Favourite from '../containers/Favourite';
import Home from '../containers/Home';
import RecentSearch from '../containers/RecentSearch';

const Routes = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favourite" component={Favourite} />
        <Route exact path="/recent" component={RecentSearch} />
      </Switch>
    </>
  );
};

export default Routes;
