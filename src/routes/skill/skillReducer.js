const initialState = {
    skills: [],
    total_sp: 0,
    unallocated_sp: 0
  };
  
  export default function skillReducer(state = initialState, action) {
    let _state;
  
    switch (action.type) {
      case "SKILL_IMPORT":
        _state = { ...state };
        _state.total_sp = action.payload.total_sp;
        _state.unallocated_sp = action.payload.unallocated_sp;
        _state.skills = action.payload.skills;

  
        return _state;

      default:
        return state;
    }
  }