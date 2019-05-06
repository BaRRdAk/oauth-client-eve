import React from "react";
import { Route, Switch } from "react-router-dom";
import TwoTestCont from "./containers/twoTestCont";
import TwoDopCont from "./containers/twoDopCont";

export default function() {
  return (
    <Switch>
      <Route exact path="/two" component={TwoTestCont} />
      <Route exact path="/two/dop" component={TwoDopCont} />
    </Switch>
  );
}
