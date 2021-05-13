import types from "../types";

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case types.PROFILE_DATA_REQUEST:
      return { loading: true };

    case types.GET_USER_SUCCESS:
    case types.PROFILE_DATA_SUCCESS:
      return { loading: false, userProfile: action.payload };

    case types.UNFAVOURITE_SUCCESS:
    case types.FAVOURITE_SUCCESS:
      return { userProfile: action.payload };
    default:
      return state;
  }
};
