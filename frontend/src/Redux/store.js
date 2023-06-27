import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

// const composeEnhancers = composeWithDevTools({ trace: true });
const composeEnhancers = compose();

const store = createStore(
  rootReducer,
  composeEnhancers()
);

export default store;
