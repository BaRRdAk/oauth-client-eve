import React from "react";
import { Route, Switch } from "react-router-dom";
import ThreeTestCont from "./containers/threeTestCont";
import ThreeDopCont from "./containers/threeDopCont";

export default function() {
  return (
    <Switch>
      <Route exact path="/three" component={ThreeTestCont} />
      <Route exact path="/three/dop" component={ThreeDopCont} />
    </Switch>
  );
}