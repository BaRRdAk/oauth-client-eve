import React from "react";
import { Route, Switch } from "react-router-dom";
import CharacterSkills from "./containers/characterSkills";

export default function() {
  return (
    <Switch>
      <Route exact path="/skills" component={CharacterSkills} />
    </Switch>
  );
}
