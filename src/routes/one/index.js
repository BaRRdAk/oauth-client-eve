import React from "react";
import { Route, Switch } from "react-router-dom";
import OneTestCont from "./containers/oneTestCont";
import OneDopCont from "./containers/oneDopCont";

export default function() {
  return (
    <Switch>
      <Route exact path="/one" component={OneTestCont} />
      <Route exact path="/one/dop" component={OneDopCont} />
    </Switch>
  );
}
