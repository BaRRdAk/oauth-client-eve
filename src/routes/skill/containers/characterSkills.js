import React from "react";
import { connect } from 'react-redux'
import { getSkills } from '../actions/getSkills'
import SkillsList from "../../../components/skill/skillsList";

class CharacterSkills extends React.Component {

    componentDidMount() {


    }


    render() {
        return (
            <div className="container">
                <SkillsList data="1" />
            </div>
        )

    }
}

export default connect(
    state => ({
      localState: state
    }),
    dispatch => (

        getSkills()

    )
  )(CharacterSkills);