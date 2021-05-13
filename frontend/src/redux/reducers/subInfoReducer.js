import types from "../types";

export const subInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS2:
      const newSubInfo = { ...state.subInfo, subInfo: action.payload };
      return { ...state, subInfo: newSubInfo };
    case types.GET_USER_SUCCESS:
      const subInfoChnlNew = {
        ...state.subInfo,
        subInfoChnl: action.payload,
      };

      return { ...state, subInfo: subInfoChnlNew };
    default:
      return state;
  }
};
