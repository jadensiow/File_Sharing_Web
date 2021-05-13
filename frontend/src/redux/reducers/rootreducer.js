import { combineReducers } from "redux";

import auth from "./auth";
import { reducer as toastrReducer } from "react-redux-toastr";
import { userProfileReducer } from "./profileReducers";
import { watchVideoReducer } from "./videoReducers";
import { channelReducer } from "./channelReducers";
import { homepageReducer } from "./homepagevideoReducers";
import { subInfoReducer } from "./subInfoReducer";

export default combineReducers({
  auth,
  userProfile: userProfileReducer,
  watchVideo: watchVideoReducer,
  channelInfo: channelReducer,
  homepageInfo: homepageReducer,
  subInfo: subInfoReducer,
  toastr: toastrReducer,
});
