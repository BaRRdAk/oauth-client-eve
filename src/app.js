import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import Layout from "./components/common/Layout";
import Dashboard from "./routes/dashboard/containers/Dashboard";

import authClient from "./oauth/Auth";

import OneRoutes from "./routes/one";
import TwoRoutes from "./routes/two";
import Callback from "./oauth/Callback";

class App extends React.Component {

  render() {
    return (
      <Layout>

        {
          !authClient.isAuthenticated() &&
          <button className="btn btn-dark" onClick={authClient.signIn}>Sign In</button>
        }
        {
          authClient.isAuthenticated() &&
          <button className="btn btn-dark" onClick={authClient.signOut}>Sign Out</button>
        }

        <Switch>
          <Route exact path="/" component={Dashboard} />
        </Switch>
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