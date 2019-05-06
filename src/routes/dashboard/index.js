import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./containers/Dashboard";

export default function() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
    </Switch>
  );
}