import React from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './components/pages/list/List';
import AddDeployment from './components/pages/add-deployment/AddDeployment';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={List} />
      <Route exact path='/add-deployment' component={AddDeployment} />
    </Switch>
);
export default Routes;