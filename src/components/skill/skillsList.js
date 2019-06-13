import React from "react";
import sk from '../../assets/typeIDs_1.json';

export default class SkillsList extends React.Component {

  render() {
    
    return (
      <div>Skills List: 
        {
          this.props.data.map((e, i) => 
            <div key={i}>
              {sk[e.skill_id].name} - Level {e.trained_skill_level} - Level {e.active_skill_level}
            </div>
          )
        }
      </div>
    )

  }

}