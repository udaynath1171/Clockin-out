import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from '../components';
import { Main as MainLayout, Minimal as MinimalLayout } from '../layouts';

import {
  Home as HomeView,
  SignIn as SignInView,
} from '../views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/login"
      />
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MainLayout}
        path="/home"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
    </Switch>
  );
};

export default Routes;
