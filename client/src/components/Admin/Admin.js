import React from 'react'
import { Link, useRouteMatch, Switch, Route } from "react-router-dom";
import BikesDashboard from '../BikesDashboard/BikesDashboard';
import ComplementsDashboard from '../ComplementsDashboard/ComplementsDashboard';

export default function Admin() {

  const match = useRouteMatch();

  return (
    <div>
      This is the <Link to={match.path} >ADMIN</Link> page
      <br/>

      <Switch>
        <Route path={`${match.path}/bike/:bikeId`}>
          <h1>Hello</h1>
        </Route>
        <Route path={`${match.path}/complements`}>
          <ComplementsDashboard />
        </Route>
        <Route path={match.path}>
          <BikesDashboard />
        </Route>
      </Switch>

    </div>
  )
}