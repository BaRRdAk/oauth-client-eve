import React from "react";
import authClient from "../../../oauth/Auth";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="container">
      {
        !authClient.isAuthenticated() &&
        <div>default page</div>
      }
      {
        authClient.isAuthenticated() &&
        <div>{sessionStorage.getItem('CharacterName')}</div>
      }
      </div>
    )


  }
}
