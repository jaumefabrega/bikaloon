import React from 'react'
import { Link, useRouteMatch, Switch, Route, useLocation } from "react-router-dom";
import BikesDashboard from '../BikesDashboard/BikesDashboard';
import ComplementsDashboard from '../ComplementsDashboard/ComplementsDashboard';

export default function Admin() {

  const match = useRouteMatch();
  const location = useLocation();

  console.log(location);
  return (
    <div>
      This is the <Link to={match.path} >ADMIN</Link> page
      <br/>
      <br/>
      <Link to={location.pathname.includes('complements') ? '/admin' : '/admin/complements'} >{location.pathname.includes('complements') ? 'BIKES' : 'COMPLEMENTS'}</Link>
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