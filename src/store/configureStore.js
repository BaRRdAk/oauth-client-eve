import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer } from "react-router-redux";
import oneReducer from "../routes/one/oneReducer";
import skillReducer from "../routes/skill/skillReducer";

export const rootReducer = combineReducers({
  routing: routerReducer,
  one: oneReducer,
  skill: skillReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
