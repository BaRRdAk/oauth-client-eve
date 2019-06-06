const initialState = {
    skills: {}
  };
  
  export default function skillReducer(state = initialState, action) {
    let _state;
  
    switch (action.type) {
      case "SKILL_IMPORT":
        _state = { ...state };
        _state.test = _state.test + action.payload;
  
        return _state;
  
      default:
        return state;
    }
  }