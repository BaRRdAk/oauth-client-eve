import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer } from "react-router-redux";
import oneReducer from "../routes/one/oneReducer";

export const rootReducer = combineReducers({
  routing: routerReducer,
  one: oneReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
