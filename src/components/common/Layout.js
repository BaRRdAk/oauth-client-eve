import React from "react";
import { Link } from "react-router-dom";
import authClient from "../../oauth/Auth";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
          <h5 className="my-0 mr-md-auto font-weight-normal">Company name</h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <Link className="p-2 text-dark" to="/one">One</Link>
            <Link className="p-2 text-dark" to="/two">Two</Link>
          </nav>
          {
            !authClient.isAuthenticated() &&
            <button className="btn btn-outline-primary" onClick={authClient.signIn}>Sign In</button>
          }
          {
            authClient.isAuthenticated() &&
            <button className="btn btn-outline-primary" onClick={authClient.signOut}>Sign Out</button>
          }
        </div>
        <main>{this.props.children}</main>
      </div>
    );
  }
}
