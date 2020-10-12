import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducer from "./reducer.js";

export const store = createStore(reducer, applyMiddleware(ReduxThunk));
