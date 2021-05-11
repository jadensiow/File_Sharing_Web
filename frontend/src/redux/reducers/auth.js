import types from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  // For redux isAuthenticated pattern
  // https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/

  switch (type) {
    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };

    case types.REGISTER_COMPLETE:
      return state;

    case types.LOGIN_COMPLETE:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };

    case types.LOGOUT_COMPLETE:
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}
