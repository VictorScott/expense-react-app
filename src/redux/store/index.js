import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import nameReducer from "../reducers/index";
import expenseReducer from "../reducers/expense";

const initialState = {};

const reducers = combineReducers({
  nameReducer: nameReducer,
  expenseReducer: expenseReducer,
});
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);
export default store;
