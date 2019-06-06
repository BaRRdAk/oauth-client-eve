import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Layout from "./components/common/Layout";
import Dashboard from "./routes/dashboard/containers/Dashboard";

import Skill from "./routes/skill";

import OneRoutes from "./routes/one";
import TwoRoutes from "./routes/two";
import Callback from "./oauth/Callback";

class App extends React.Component {

  render() {
    return (
      <Layout>

        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
        <Skill />
        <OneRoutes />
        <TwoRoutes />
        <Switch>
          <Route exact path="/callback" component={Callback} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);