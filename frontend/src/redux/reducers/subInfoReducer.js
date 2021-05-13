import types from "../types";

export const subInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS2:
      return { loading: false, subInfo: action.payload };
    default:
      return state;
  }
};
