import React from "react";

export default class ComponentOne extends React.Component {
  render() {
    return <div>Count: {this.props.data}</div>;
  }
}
