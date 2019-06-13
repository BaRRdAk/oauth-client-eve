import React from "react";
import { connect } from 'react-redux'
import { getSkills } from '../actions/getSkills'
import SkillsList from "../../../components/skill/skillsList";

class CharacterSkills extends React.Component {

    componentDidMount() {

        this.props.loadSkills();

    }

    render() {
      console.log(this.props.localState)
      return (
          <div className="container">
            <div>Total SP: {this.props.localState.skill.total_sp}</div>
            <div>Unallocated SP: {this.props.localState.skill.unallocated_sp}</div>
            <SkillsList data={this.props.localState.skill.skills} />
          </div>
      )

    }
}

export default connect(
    state => ({
      localState: state
    }),
    dispatch => ({
      loadSkills: () => {
        dispatch(getSkills());
      }
    })
  )(CharacterSkills);