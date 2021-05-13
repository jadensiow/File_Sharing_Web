import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootreducer";

const initialState = {
  auth: {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    isAuthenticated: localStorage.getItem("isAuthenticated")
      ? JSON.parse(localStorage.getItem("isAuthenticated"))
      : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  userProfile: { loading: true, userProfile: {} },
  channelInfo: { loading: true, channelInfo: {} },
  homepageInfo: { loading: true, homepageInfo: {} },
  subInfo: { loading: true, subInfo: {} },
};

const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
