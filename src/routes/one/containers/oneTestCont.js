import React from "react";
import { connect } from "react-redux";

import { simpleAction } from "../actions/simpleAction";
import ComponentOne from "../../../components/componentOne";

class OneTestCont extends React.Component {
  render() {
    console.log(this.props);

    return (
      <div className="container">
        <ComponentOne data={this.props.localState.one.test} />
        <button onClick={this.props.simpleAction}>Next</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    localState: state
  }),
  dispatch => ({
    simpleAction: () => {
      dispatch(simpleAction());
    }
  })
)(OneTestCont);
