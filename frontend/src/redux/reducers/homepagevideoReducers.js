import types from "../types";

export const homepageReducer = (state = {}, action) => {
  switch (action.type) {
    case types.HOME_PAGE_DATA_REQUEST:
      return { loading: true };

    case types.HOME_PAGE_DATA_SUCCESS:
      return { loading: false, channelInfo: action.payload };

    default:
      return state;
  }
};
