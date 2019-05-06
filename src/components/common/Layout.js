import React from "react";
import { Link } from "react-router-dom";

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <div>
            <ul>
              <li>
                <Link to="/one">One</Link>
              </li>
              <li>
                <Link to="/two">Two</Link>
              </li>
            </ul>
          </div>
        </nav>
        <main>#{this.props.children}#</main>
      </div>
    );
  }
}
