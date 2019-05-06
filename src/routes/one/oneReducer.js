const initialState = {
    test: 0
  };
  
  export default function oneReducer(state = initialState, action) {
    let _state;
  
    switch (action.type) {
      case "SIMPLE_ACTION":
        _state = { ...state };
        _state.test = _state.test + action.payload;
  
        return _state;
  
      default:
        return state;
    }
  }
  